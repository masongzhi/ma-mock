import fetch from '@/utils/fetch';

export function getAllMockData(options) {
  return fetch('/mock/allData', options);
}

export function enableMockUrl(options, url) {
  options.method = 'put';
  return fetch(`/mock/${url}/enable`, options);
}

export function setMockData(options) {
  options.method = 'post';
  return fetch('/mock/data', options);
}

export function delMockData(options) {
  options.method = 'delete';
  return fetch('/mock/data', options);
}

export function getProxyConfig(options) {
  return fetch('/proxy/config', options);
}

export function changeProxy(options) {
  options.method = 'post';
  return fetch('/proxy/change', options);
}

export function changeEnableMock(options) {
  options.method = 'put';
  return fetch('/mock/enable', options);
}

export function getEnableMock(options) {
  return fetch('/mock/enable', options);
}
