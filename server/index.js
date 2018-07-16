'use strict';

const path = require('path');
const Koa = require('koa');
const mockProxy = require('./app/middleware/mockProxy');
const { Logger, Global, fsHandler } = require('./app/lib/index');
const bodyParser = require('koa-bodyparser');
const _ = require('lodash');
const spaStatic = require('koa-spa-static');
const rcfile = require("rc-config-loader");
const defaultrc = require('./.mamockrc.default');

const time = Date.now();
const PORT = 3001;

const app = new Koa();

app.use(bodyParser());

function _init() {
  // 读取.mamockrc配置文件
  const mamockrc = {
    ...defaultrc,
    ...rcfile('mamockrc'),
  };

  // init global data
  Global.rootPath = path.resolve(__dirname, mamockrc.rootPath);
  Global.proxyPath = path.resolve(__dirname, mamockrc.proxyPath, mamockrc.proxyFilename);
  Global.currentProxyUrl = _.get(fsHandler.getProxyConfig(Global.proxyPath), '[0].url');
  const dirs = fsHandler.findDirs(Global.rootPath);
  Global.mockList = dirs.map(it => {
    return { url: it, enable: false };
  });

  // 配置mock
  app.use(
    mockProxy({
      prefix: mamockrc.prefix,
    })
  );
}

// routers
const router = require('./app/router');
app.use(router.routes(), router.allowedMethods());

// 挂在静态资源
app.use(
  spaStatic({
    matchReg: /[^/api]|\//,
    root: path.join(__dirname, './dist'),
    staticReg: /^\/static/,
  })
);

_init();

Logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${PORT}`);

app.listen(PORT);
