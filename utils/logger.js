const { createLogger, transports, format } = require("winston");

const loggerInstance = createLogger({
  level: "debug",
  format: format.combine(format.timestamp(), format.simple()),
  transports: [new transports.Console()],
});

class Logger {
  constructor(context) {
    this.context = context; // Context can be function name/module name
  }

  log(level, message) {
    const prefix = this.context ? `<Faster> [${this.context}]` : "<Faster>";
    const logMessage = `${prefix} ${message}`;
    loggerInstance.log({ level, message: logMessage });
  }

  debug(message) {
    this.log("debug", message);
  }

  info(message) {
    this.log("info", message);
  }

  error(message) {
    this.log("error", message);
  }
}

module.exports = Logger;
