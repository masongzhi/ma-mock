const responseFormatter = require('./middleware/responseFormatter');
const queryAndBodyToParam = require('./middleware/queryAndBodyToParam');
const MockController = require('./controller/MockController');
const ProxyController = require('./controller/ProxyController');

const router = require('koa-router')({
  prefix: '/api/v1',
});
router.use('/', responseFormatter('^/api'), queryAndBodyToParam);

router.get('/mock/allData', MockController.getMockDataSync);
router.post('/mock/data', MockController.setMockData);
router.delete('/mock/data', MockController.delMockData);
router.get('/mock/dirs', MockController.getMockDirs);
router.put('/mock/:url/enable', MockController.changeEnableMockUrl);
router.put('/mock/enable', MockController.changeEnableMock);
router.get('/mock/enable', MockController.getEnableMock);

router.get('/proxy/config', ProxyController.getProxyConfig);
router.post('/proxy/config', ProxyController.setProxyConfig);
router.post('/proxy/change', ProxyController.changeProxy);

module.exports = router;
