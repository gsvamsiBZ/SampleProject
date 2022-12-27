const jwt = require('jsonwebtoken');
var config = require('../config');
const logger = require("../utils/logger").getLogForLib();

// MIDDLEWARE FUNCTION TO CHECK THE TOKEN

module.exports.verifyAdmin = function (req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(401).send("Access Denied")
  try {
    const verified = jwt.verify(token, config.jwt_secret);
    req.user = verified;
    if (req.user.role != 'admin')
      return res.status(401).send("Access Denied")
    next();
  } catch (error) {
    logger.error(error);
    return res.status(400).send('Invalid Token');
  }
}

module.exports.verifyUser = function (req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(401).send("Access Denied")
  try {
    const verified = jwt.verify(token, config.jwt_secret);
    req.user = verified;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(400).send('Invalid Token');
  }
}

//TODO:  apiKey validation here
module.exports.verifyApiKey = function (req, res, next) {
  next();
}

