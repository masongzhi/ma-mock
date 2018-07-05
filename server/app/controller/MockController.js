const { Joi, Global } = require('../lib/index');
const MockService = require('../service/MockService');

class MockController {
  static async getMockDataSync(ctx) {
    const result = await MockService.getMockDataSync();

    ctx.body = result;
  }
  static setMockData(ctx) {
    const schema = {
      url: Joi.string().required(),
      data: Joi.any().required(),
      method: Joi.string(),
      mark: Joi.string().required(),
      oldURL: Joi.string().allow([null]),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = MockService.setMockData(value);

    ctx.body = result;
  }
  static delMockData(ctx) {
    const schema = {
      url: Joi.string().required(),
      method: Joi.string(),
    };
    const value = Joi.validate(ctx.param, schema);
    const result = MockService.delMockData(value);

    ctx.body = result;
  }
  static getMockDirs(ctx) {
    const result = MockService.getMockDirs();

    ctx.body = result;
  }

  static changeEnableMockUrl(ctx) {
    const schema = {
      url: Joi.string().required(),
      enable: Joi.boolean().required(),
    };
    const value = Joi.validate({...ctx.param, ...ctx.params}, schema);

    const result = MockService.changeEnableMockUrl(value);

    ctx.body = result;
  }

  static changeEnableMock(ctx) {
    const schema = {
      enable: Joi.boolean().required(),
    };
    const value = Joi.validate(ctx.param, schema);

    const result = MockService.changeEnableMock(value);

    ctx.body = result;
  }

  static getEnableMock(ctx) {
    ctx.body = {enableMock: Global.enableMock};
  }
}

module.exports = MockController;
