const { Logger, fsHandler } = require('../lib/index');

class ProxyService {
  async getProxyConfig() {
    const data = await fsHandler.getProxyConfig();
    return data;
  }

  async setProxyConfig(param) {
    const data = await fsHandler.setProxyConfig(param);
    return data;
  }
}

module.exports = new ProxyService();
