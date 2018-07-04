const { Joi } = require('../lib/index');
const ProxyService = require('../service/ProxyService');

class ProxyController {
  static async getProxyConfig(ctx) {
    const result = await ProxyService.getProxyConfig();

    ctx.body = result;
  }
  static async setProxyConfig(ctx) {
    const schema = {
      data: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            url: Joi.string().required(),
          })
        )
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ProxyService.setProxyConfig(value);

    ctx.body = result;
  }

  static async changeProxy(ctx) {
    const schema = {
      url: Joi.string().allow(['']).required(),
    };
    const value = Joi.validate(ctx.param, schema);
    const result = await ProxyService.changeProxy(value);

    ctx.body = result;
  }
}

module.exports = ProxyController;
