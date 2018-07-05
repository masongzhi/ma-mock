const { Joi } = require('../lib/index');
const MockService = require('../service/MockService');

class MockController {
  static async getMockDataSync(ctx) {
    const result = await MockService.getMockDataSync();

    ctx.body = result;
  }
  static async setMockDataSync(ctx) {
    const schema = {
      url: Joi.string().required(),
      data: Joi.any().required(),
      method: Joi.string(),
      mark: Joi.string(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await MockService.setMockDataSync(value);

    ctx.body = result;
  }
  static async delMockDataSync(ctx) {
    const schema = {
      url: Joi.string().required(),
      method: Joi.string(),
    };
    const value = Joi.validate(ctx.param, schema);
    const result = await MockService.delMockDataSync(value);

    ctx.body = result;
  }
  static async getMockDirsSync(ctx) {
    const result = await MockService.getMockDirsSync();

    ctx.body = result;
  }

  static enableMockUrl(ctx) {
    const schema = {
      url: Joi.string().required(),
      enable: Joi.boolean().required(),
    };
    const value = Joi.validate({...ctx.param, ...ctx.params}, schema);

    const result = MockService.enableMockUrl(value);

    ctx.body = result;
  }
}

module.exports = MockController;
