var log4js = require('log4js');
const logLevel = process.env.LOG_LEVEL || 'info';

module.exports.getLoggerByName = function (name) {
  log4js.configure({
    appenders: {
      everything: { type: "stdout", layout: { type: 'pattern', pattern: '[%d] [%p] - %c - %f{1}:%l:%o -  %m%n' } },
    },
    categories: {
      default: { appenders: ["everything"], level: logLevel, enableCallStack: true },
    },
  });
  const logger = log4js.getLogger(name);
  return logger;
}

module.exports.getLogForDB = function () {
  return module.exports.getLoggerByName('DataBase Calls');
}

module.exports.getLogForLib = function () {
  return module.exports.getLoggerByName('Library Calls');
}