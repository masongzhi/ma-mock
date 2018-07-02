const util = require('util');

class AppError extends Error {
  constructor() {
    super();
    const args = Array.prototype.slice.call(arguments);
    let message = args[0];
    const params = args.slice(1);
    message = message || '未知错误';
    if (params && params.length) {
      message = util.format(message, params);
    }
    this.code = 1;
    this.message = message;
  }
}

module.exports = AppError;
