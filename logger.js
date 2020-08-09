const { createLogger, format: {combine, timestamp, printf, colorize}, transports } = require('winston');

const replaceErrors = (key, value) => {
  if (value instanceof Error) {
    let error = {};

    Object.getOwnPropertyNames(value).forEach((newKey) => {
      error[newKey] = value[newKey];
    });

    return error;
  }

  return value;
};

const formatter = printf((info) => {
  let object = {
      message : info.message
    };
  return `${info.timestamp} ${info.level} ${JSON.stringify(object, replaceErrors)}`;
  });

const generalLogger = createLogger({
  format : combine(
    colorize(),
    timestamp(),
    formatter
  ),
  transports : [
    new transports.Console({
      json : true,
      colorize : process.stdout.isTTY,
      timestamp: function () {
        return (new Date()).toLocaleTimeString();
      },
      prettyPrint : true
    })
  ]
});

generalLogger.stream = {
  write : (info) => {
    generalLogger.info(info);
  }
};

const log = (message) => {
  generalLogger.log({
    level : 'verbose',
    message : message
  });
};

const debug = (message) => {
  generalLogger.log({
    level : 'debug',
    message : message
  });
};

const info = (message) => {
  generalLogger.log({
    level : 'info',
    message : message
  });
};

const warn = (message) => {
  generalLogger.log({
    level : 'warn',
    message : message
  });
};

const error = (message) => {
  generalLogger.log({
    level : 'error',
    message : message
  });
};

module.exports = {
  log,
  debug,
  info,
  warn,
  error
};
