import fetch from '@/utils/fetch';

export function getAllMockData(options) {
  return fetch('/mock/allData', options);
}

export function getProxyConfig(options) {
  return fetch('/proxy/config', options);
}

export function changeProxy(options) {
  options.method = 'post';
  return fetch('/proxy/change', options);
}
