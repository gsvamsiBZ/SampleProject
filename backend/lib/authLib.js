const config = require('../config');
const logger = require('../utils/logger').getLogForLib();
const userModel = require('../db/models/userModel')
const asyncDbLib = require('../lib/asyncDbLib')
const jwt = require('jsonwebtoken')
const emailNotificationLib = require("./emailNotificationLib")
var CryptoJS = require("crypto-js");

const encrypt = (message) => {
  try {
    let encryptedMessage = CryptoJS.AES.encrypt(message, config.encyption_key).toString();
    return encryptedMessage
  }
  catch (err) {
    logger.error(err)
    return null
  }
}
const decrypt = (encryptedMessage) => {
  try {
    let decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, config.encyption_key).toString(CryptoJS.enc.Utf8);
    return decryptedMessage
  }
  catch (err) {
    logger.error(err)
    return null
  }
}
const getOtp = () => {
  return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
}

// function to login 
module.exports.login = async (req, res) => {
  try {
    let user = req.query.user
    let password = req.query.password
    let filter = {
      $or: [
        { username: user },
        { email: user },
      ]
    };

    //Findiing a matching user with username or email
    let currentUser = await asyncDbLib.getOneDocumentByFilter(userModel, filter)
    logger.debug("currentUser", currentUser)
    if (currentUser) {
      //If passwords match creating a web token and sending it in response
      if (decrypt(currentUser.password) == password) {
        const payload = {
          _id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          verified: currentUser.verified,
          otp: currentUser.otp
        }
        logger.debug("payload: ", payload)
        let token = jwt.sign(payload, config.jwt_secret, { expiresIn: '24h' });
        return res.json(token)
      }
      else {
        return res.status(401).json("Invalid Password")
      }
    } else {
      res.status(401).json("Invalid email or username")
    }
  }
  catch (err) {
    logger.error(err)
    res.status(500).json('error: ' + err)
  }
}

//funtion to signup
module.exports.signUp = async (req, res) => {
  try {
    let newUser = req.body
    logger.debug("newUser", newUser);

    // checking if there is already an account with this email
    let currentUser = await asyncDbLib.getOneDocumentByFilter(userModel, { email: newUser.email })
    if (currentUser) {
      return res.status(409).json("email")
    }

    //checking if there is already an account with this username
    currentUser = await asyncDbLib.getOneDocumentByFilter(userModel, { username: newUser.username })
    if (currentUser) {
      return res.status(409).json("username")
    }
    let otp = getOtp()
    let userObj = {
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      password: encrypt(newUser.password),
      otp: otp
    }
    logger.debug("userObj", userObj);
    createdUser = await asyncDbLib.createDocument(userModel, userObj)
    let subject = "OTP for Account Conformation"
    let message = "Your OTP for verifying your account at FakeCaller is " + otp
    emailNotificationLib.sendEmail(newUser.email, subject, message)
    const payload = {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      verified: createdUser.verified,
      otp: createdUser.otp
    }
    logger.debug("payload: ", payload)
    let token = jwt.sign(payload, config.jwt_secret, { expiresIn: '24h' });
    return res.json(token)
  }
  catch (err) {
    logger.error(err)
    res.status(500).json('error: ' + err)
  }
}

module.exports.checkSignupOtp = async (req, res) => {
  try {
    logger.debug(req.query);
    let email = req.query.email;
    let otp = req.query.otp

    //finding a user with email and otp
    let currentUser = await asyncDbLib.getOneDocumentByFilter(userModel, { email: email, otp: otp })
    if (currentUser) {
      //If found marking him as valid and clearing the otp
      let updatedUser = await asyncDbLib.findOneDocumentByFilterAndUpdate(userModel, { email: email }, { verified: true, otp: "" })
      logger.debug("updatedUser", updatedUser)
      const payload = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        verified: updatedUser.verified,
        otp: updatedUser.otp
      }
      logger.debug("payload: ", payload)
      let token = jwt.sign(payload, config.jwt_secret, { expiresIn: '24h' });
      return res.json(token)
    }
    else {
      res.json("Invalid Otp")
    }
  }
  catch (err) {
    logger.error(err)
    res.json('error: ' + err)
  }
}

// will use these Later




// module.exports.forgotPassword = async (req, res) => {
// 	try {
// 		logger.info(req.query);
// 		let email = req.query.email;
// 		let currentUser = await asyncDbLib.getOneDocumentByFilter(userModel, { email: email })
// 		if (currentUser) {
// 			if (currentUser.verified) {
// 				let otp = getOtp()
// 				await asyncDbLib.findOneDocumentByFilterAndUpdate(userModel, { email: email }, { otp: otp })
// 				let subject = "OTP for changing password"
// 				let message = otp
// 				emailNotificationLib.sendEmail(email, subject, message)
// 				res.json("sent otp")
// 			}
// 			else {
// 				return res.json("Verify your mail first")
// 			}
// 		}
// 		else {
// 			res.json("Email Not Found")
// 		}
// 	}
// 	catch (err) {
// 		logger.error(err)
// 		res.json('error: ' + err)
// 	}
// }

// module.exports.checkForgotPasswordOtp = async (req, res) => {
// 	try {
// 		logger.info(req.query);
// 		let email = req.query.email;
// 		let otp = req.query.otp
// 		let currentUser = await asyncDbLib.getOneDocumentByFilter(userModel, { email: email, otp: otp })
// 		if (currentUser) {
// 			await asyncDbLib.findOneDocumentByFilterAndUpdate(userModel, { email: email }, { otp: "" })
// 			logger.debug(createdUser)
// 			res.json("otp veriified")
// 		}
// 		else {
// 			res.json("Invalid Otp")
// 		}
// 	}
// 	catch (err) {
// 		logger.error(err)
// 		res.json('error: ' + err)
// 	}
// }