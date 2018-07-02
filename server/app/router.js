const responseFormatter = require('./middleware/responseFormatter');
const MockController = require('./controller/MockController');
const ProxyController = require('./controller/ProxyController');

const router = require('koa-router')({
  prefix: '/api/v1',
});
router.use('/', responseFormatter('^/api'));

router.get('/mock/allData', MockController.getMockDataSync);
router.post('/mock/data', MockController.setMockDataSync);
router.delete('/mock/data', MockController.delMockDataSync);
router.get('/mock/dirs', MockController.getMockDirsSync);

router.get('/proxy/config', ProxyController.getProxyConfig);
router.post('/proxy/config', ProxyController.setProxyConfig);

module.exports = router;
