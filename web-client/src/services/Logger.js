/* eslint-disable no-console */
const isProduction = window.ENVIRONMENT === 'production';

export default class Logger {
  static info(message, options) {
    if (!isProduction) {
      console.log(message);
    }
  }

  static warn(message, options) {
    if (!isProduction) {
      console.warn(message);
    }
  }

  static error(message, options) {
    if (!isProduction) {
      console.error(message);
    }
  }
}
