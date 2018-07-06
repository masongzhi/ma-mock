const { Logger, fsHandler, Global } = require("../lib/index");

class ProxyService {
  async getProxyConfig() {
    const config = await fsHandler.getProxyConfig();
    return {
      config,
      currentProxyUrl: Global.currentProxyUrl,
    };
  }

  async setProxyConfig({data}) {
    const result = await fsHandler.setProxyConfig(data);
    return result;
  }

  async changeProxy({ url }) {
    Global.currentProxyUrl = url;
  }
}

module.exports = new ProxyService();
