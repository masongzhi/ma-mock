const path = require('path');

// 默认配置
module.exports = {
  prefix: '/__DEV__',
  rootPath: path.resolve(__dirname, './mamock/mock'),
  proxyPath: path.resolve(__dirname, './mamock/proxy'),
  proxyFilename: 'config.json',
};
