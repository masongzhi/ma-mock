const { Logger, fsHandler, Global } = require('../lib/index');
const path = require('path');

class MockService {
  async getMockDataSync() {
    const data = await fsHandler.getAllMockDataSync();
    return data;
  }

  async setMockDataSync({ url, data, method }) {
    const fileDirPath = path.join(Global.rootPath, url + '.json');
    fsHandler.createOrUpdateFileByPath(fileDirPath, { ...data, method });
  }

  async delMockDataSync({ url, method }) {
    const fileDirPath = path.join(Global.rootPath, url + '.json');
    fsHandler.deleteFileByPath(fileDirPath);
  }

  async getMockDirsSync() {
    const rootPath = Global.rootPath;
    return fsHandler.findDirs(rootPath);
  }
}

module.exports = new MockService();
