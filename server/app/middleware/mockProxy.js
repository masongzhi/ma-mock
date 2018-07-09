'use strict';

const { Logger, fsHandler, Global } = require('../lib/index');
const axios = require('axios');
/**
 *
 * @param  {object} options 配置项
 *         {object} options.prefix mock数据的url前缀
 * @return {function}
 *
 */
module.exports = options => {
  let prefix = options.prefix;

  if (prefix.lastIndexOf('/') + 1 !== prefix.length) {
    prefix = prefix + '/';
  }

  return async function(ctx, next) {
    let curPath = ctx.path;
    if (curPath.indexOf(prefix) !== 0) return await next();

    let pathArr = curPath.split(prefix);

    // 如果prefix之后不再有path则请求不合法
    // 例如：prefix为 __DEV__/pay/但请求路径为http://*/__DEV__/pay/
    if (pathArr.length < 2) {
      ctx.body = '请求路径不合法';
    }

    // 判断是否使用MOCK数据
    const find = Global.mockList.find(it => it.url === `/${pathArr[1]}`);

    if (find && find.enable) {
      ctx.body = handlerMock(pathArr[1]);
    } else if (Global.enableProxy) {
      ctx.body = await handlerProxySync(`/${pathArr[1]}`, ctx);
    } else {
      ctx.body = '未开启proxy';
    }
  };

  // 用mock数据
  function handlerMock(filePath) {
    let result = '';

    try {
      result = fsHandler.getMockFile(filePath);
    } catch (e) {
      result = e;
    }
    Logger.debug(result);

    return { ...result, type: 'MOCK' };
  }

  // 后端代理
  async function handlerProxySync(api, ctx) {
    const options = {
      ...ctx.request,
      url: `${Global.currentProxyUrl}/${api}`,
      params: ctx.query,
    };

    try {
      const res = await axios(options);
      return { ...res, type: 'PROXY' };
    } catch (e) {
      return {
        message: e.message,
        type: 'PROXY',
      };
    }
  }
};
