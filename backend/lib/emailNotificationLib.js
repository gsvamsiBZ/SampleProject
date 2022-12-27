const config = require("../config");
const logger = require('../utils/logger').getLogForLib;
var nodemailer = require("nodemailer");

//Function to send email notifications
module.exports.sendEmail = async (userMail, subject, message) => {
  let fromEmail = config.fromEmail
  let password = config.password
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromEmail,
      pass: password
    }
  });
  var mailOptions = {
    from: fromEmail,
    to: userMail,
    subject: subject,
    text: message
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      logger.error(err);
    } else {
      logger.debug("Email sent: " + info.response);
    }
  });

}