const koaStatic = require('koa-static');

module.exports = ({matchReg, staticReg = /^\/static/, root, opts}) => {
  return async (ctx, next) => {
    if (matchReg.test(ctx.path)) {
      ctx.path = staticReg.test(ctx.path) ? ctx.path : '/';
      return koaStatic(root, opts)(ctx, next);
    }
  }
};
