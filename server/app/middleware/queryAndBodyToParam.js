const _ = require('lodash');

module.exports = async (ctx, next) => {
  ctx.param = _.extend({}, ctx.query, ctx.request.body);
  await next();
};
