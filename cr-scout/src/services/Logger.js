class Logger {
  static trace(...message) {
    console.trace(...message);
  }

  static debug(...message) {
    console.debug(...message);
  }

  static info(...message) {
    console.info(...message);
  }

  static error(...message) {
    console.error(...message);
  }
}

module.exports.Logger = Logger;
