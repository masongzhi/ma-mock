const { Logger, fsHandler, Global } = require("../lib/index");

class ProxyService {
  async getProxyConfig() {
    const config = await fsHandler.getProxyConfig();
    return {
      config,
      currentProxyUrl: Global.currentProxyUrl,
    };
  }

  async setProxyConfig(param) {
    const data = await fsHandler.setProxyConfig(param);
    return data;
  }

  async changeProxy({ url }) {
    Global.currentProxyUrl = url;
    return "success";
  }
}

module.exports = new ProxyService();
