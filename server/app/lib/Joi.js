const Joi = require('Joi');
const validate = Joi.validate;

Joi.validate = (
  param,
  schema,
  options = {
    convert: true,
    noDefaults: false,
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: false,
  }
) => {
  const { value, error } = validate(param, schema, options);
  if (error) {
    throw error;
  }

  // 返回处理过的参数
  return value;
};

module.exports = Joi;
