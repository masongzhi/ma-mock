#!/usr/bin/env node

'use strict';

const keys = ['port', 'prefix', 'rootPath', 'proxyPath', 'proxyFilename'];
const argvs = process.argv.slice(2);
function getArgv(key) {
  const index = argvs.findIndex(it => it === `--${key}`);
  return index >= 0 && argvs[index + 1];
}
keys.forEach(key => {
  const value = getArgv(key);
  if (value) process.env[key] = value;
});
require('../server/index.js');
