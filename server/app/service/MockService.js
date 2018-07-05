const { Logger, fsHandler, Global } = require("../lib/index");
const path = require("path");

class MockService {
  async getMockDataSync() {
    const data = await fsHandler.getAllMockDataSync();

    return data;
  }

  setMockData({ url, data, method, mark, oldURL }) {
    const fileDirPath = path.join(Global.rootPath, url + ".json");

    fsHandler.createOrUpdateFileByPath(fileDirPath, { ...data, method, mark });
    if (oldURL && oldURL !== url){
      this.delMockData({ url: oldURL, method });
    }
    this.refreshMockList();
  }

  delMockData({ url, method }) {
    const fileDirPath = path.join(Global.rootPath, url + ".json");
    fsHandler.deleteFileByPath(fileDirPath);
    this.refreshMockList();
  }

  getMockDirs() {
    const rootPath = Global.rootPath;
    return fsHandler.findDirs(rootPath);
  }

  changeEnableMockUrl(param) {
    let find = Global.mockList.find(it => it.url === param.url);
    find.enable = param.enable;
  }

  refreshMockList() {
    const enableList = Global.mockList.filter(it => it.enable);

    const dirs = fsHandler.findDirs(Global.rootPath);
    Global.mockList = dirs.map(it => {
      const enable = !!enableList.find(item => item.url === it);
      return { url: it, enable };
    });
  }

  changeEnableMock({ enable }) {
    Global.enableMock = enable;
  }
}

module.exports = new MockService();
