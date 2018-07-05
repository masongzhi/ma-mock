const { Logger, fsHandler, Global } = require("../lib/index");
const path = require("path");

class MockService {
  async getMockDataSync() {
    const data = await fsHandler.getAllMockDataSync();

    return data;
  }

  async setMockDataSync({ url, data, method, mark }) {
    const fileDirPath = path.join(Global.rootPath, url + ".json");

    fsHandler.createOrUpdateFileByPath(fileDirPath, { ...data, method, mark });
    this.refreshMockList();

    return "success";
  }

  async delMockDataSync({ url, method }) {
    const fileDirPath = path.join(Global.rootPath, url + ".json");
    fsHandler.deleteFileByPath(fileDirPath);
    this.refreshMockList();

    return "success";
  }

  async getMockDirsSync() {
    const rootPath = Global.rootPath;
    return fsHandler.findDirs(rootPath);
  }

  enableMockUrl(param) {
    let find = Global.mockList.find(it => it.url === param.url);
    find.enable = param.enable;
    return "success";
  }

  refreshMockList() {
    const enableList = Global.mockList.filter(it => it.enable);

    const dirs = fsHandler.findDirs(Global.rootPath);
    Global.mockList = dirs.map(it => {
      const enable = !!enableList.find(item => item.url === it);
      return { url: it, enable };
    });
  }
}

module.exports = new MockService();
