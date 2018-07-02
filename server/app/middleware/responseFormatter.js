const _ = require('lodash');
const AppError = require('../lib/AppError');
const logger = require('../lib/Logger');

module.exports = pattern => {
  return async (ctx, next) => {
    const reg = new RegExp(pattern);
    // 符合相应规则才格式化返回 例如: ^/api
    if (!reg.test(ctx.originalUrl)) return await next();

    try {
      await next();
      return responseFormatter(ctx);
    } catch (error) {
      if (error instanceof AppError) {
        logger.info('业务逻辑错误 ', error);
        ctx.status = 200;
        ctx.body = {
          code: error.code,
          message: error.message,
        };
        return;
      } else if (error.isJoi) {
        logger.info('参数校验错误 ', error);
        const msg = error.details.map(item => item.message).join(',');
        ctx.status = 200;
        ctx.body = {
          code: -1,
          message: msg,
        };
        return;
      } else {
        logger.error('系统内部错误 ', error);
        ctx.status = 200;
        ctx.body = {
          code: 1,
          message: error.message,
        };
        return;
      }
    }

    function responseFormatter(ctx) {
      // excel
      if (ctx.type === 'text/csv') {
        return;
      }
      const body = ctx.body;
      ctx.status = 200;
      if (_.isString(body)) {
        ctx.body = {
          code: 0,
          message: body,
        };
      } else if (body && !_.isNil(body.code)) {
        ctx.body = body;
      } else {
        ctx.body = {
          code: 0,
          message: 'success',
          data: body,
        };
      }
    }
  };
};
