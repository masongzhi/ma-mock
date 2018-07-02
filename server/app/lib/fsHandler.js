const fs = require('fs');
const path = require('path');
const Logger = require('./Logger');
const AppError = require('./AppError');
const Global = require('./Global');
const stripJsonComments = require('strip-json-comments');
const Promise = require('bluebird');

// 获取单个mock数据
function getMockFile(curPath) {
  // 根据path查找moc文件
  let pathDirArr = curPath.split('/');
  let dir = '',
    lastArr;
  for (let i = 0; i < pathDirArr.length; i++) {
    if (i + 1 === pathDirArr.length) {
      dir += pathDirArr[i] + '.json';
      break;
    }

    let folderPath = path.resolve(Global.rootPath, dir, pathDirArr[i]);

    if (fs.existsSync(folderPath)) {
      dir += pathDirArr[i] + '/';
    } else {
      dir += pathDirArr[i] + '.json';
      lastArr = pathDirArr.slice(i + 1);
      break;
    }
  }

  dir = path.resolve(Global.rootPath, dir);
  Logger.debug('mock data at : ' + dir);

  // 如果mock文件不存在则返回错误
  if (!fs.existsSync(dir)) {
    throw new AppError('找不到mock文件：' + dir);
  }

  // 解析mock文件
  let mockFileData = fs.readFileSync(dir, 'utf8'),
    mockData;
  try {
    // stripJsonComments 允许JSON文件添加注释
    mockData = JSON.parse(stripJsonComments(mockFileData));
  } catch (err) {
    throw new AppError('mock文件格式不合法：' + dir);
  }

  // 如果请求路径是/__DEV__/pay/test/test/
  // 则lastArr的最后一个字段是""，则排除
  if (lastArr && lastArr.lastIndexOf('') > -1) {
    lastArr.splice(-1);
  }

  if (!lastArr || lastArr.length === 0) {
    return mockData;
  }

  // 如果数据接口直接不是整个mock文件，而是mock对象的其中一个字段
  // 则查找mock对象
  let data = mockData;
  for (let i = 0; i < lastArr.length; i++) {
    let index = lastArr[i];

    if (!data[index]) {
      throw new AppError('找不到对应mock文件下的对应接口的数据：' + dir);
    }
    data = data[index];
  }

  return data;
}

// 获取全部mock数据
async function getAllMockDataSync() {
  let result = [];

  const dirs = this.findDirs(Global.rootPath);

  Logger.info('dirs===>>>', dirs);

  await Promise.map(
    dirs,
    dir => {
      result.push({ [dir]: this.getMockFile(dir.slice(1, dir.length)) });
    },
    { concurrency: 3 }
  );

  return result;
}

function findDirs(_p) {
  let dirs = [];
  finder(_p);
  return dirs;

  function finder(_p) {
    const files = fs.readdirSync(_p);
    files.forEach((val, index) => {
      const fPath = path.join(_p, val);
      const stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      else if (stats.isFile()) {
        const nPath = fPath.split(Global.rootPath)[1];
        const dirname = path.dirname(nPath);
        const basename = path.basename(nPath, '.json');
        dirs.push(dirname + '/' + basename);
      }
    });
  }
}

function createOrUpdateFileByPath(dirPath, data) {
  if (fs.existsSync(dirPath)) {
    return fs.writeFileSync(dirPath, JSON.stringify(data), 'utf8');
  }

  const pathParse = path.parse(dirPath);
  mkdirsSync(pathParse.dir);
  fs.writeFileSync(dirPath, JSON.stringify(data), 'utf8');

  function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }
}

function deleteFileByPath(dirPath) {
  const pathParse = path.parse(dirPath);

  if (fs.existsSync(pathParse.dir)) {
    const files = fs.readdirSync(pathParse.dir);
    files.forEach(function(file, index) {
      const curPath = pathParse.dir + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFileByPath(curPath);
      } else {
        // delete file
        pathParse.base === file && fs.unlinkSync(curPath);
      }
    });

    if (fs.readdirSync(pathParse.dir).length === 0) {
      fs.rmdirSync(pathParse.dir);
    }
  }
}

function getProxyConfig() {
  let fileData = fs.readFileSync(Global.proxyPath, 'utf8');
  fileData = JSON.parse(stripJsonComments(fileData));
  return fileData;
}

function setProxyConfig(data) {
  fs.writeFileSync(Global.proxyPath, data, 'utf8');
}

module.exports = {
  getMockFile,
  getAllMockDataSync,
  findDirs,
  createOrUpdateFileByPath,
  deleteFileByPath,
  getProxyConfig,
  setProxyConfig,
};
