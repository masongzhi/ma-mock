import axios from 'axios';
import URI from 'urijs';
import Vue from 'vue';

export default function fetch(url, options) {
  const config = handleConfig(url, options);

  return axios(config).then(handleResponse);
}

function ensureAbsoluteUrl(input) {
  if (typeof input !== 'string') return input;
  if (URI(input).is('absolute')) return input;
  return URI('/api/v1' + input)
    .normalize()
    .toString();
}

function handleConfig(url, options) {
  const defaultOptions = {
    method: 'get',
    url: ensureAbsoluteUrl(url),
    timeout: 30 * 1000, // 30秒超时
    withCredentials: true, // 是否允许带cookie
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  if (!options) return defaultOptions;

  let finalOptions = {
    ...defaultOptions,
    ...options,
  };

  finalOptions.method = String.prototype.toLowerCase.call(finalOptions.method);

  if (options && options.query) {
    finalOptions.params = options.query;
  } else if (options && options.body) {
    finalOptions.data = options.body;
  }

  return finalOptions;
}

export function handleResponse(response) {
  if (response.status === 200 && response.statusText === 'OK') {
    if (response.data && response.data.code !== 0) {
      Vue.$message.error(response.data.message);
    } else {
      return response.data;
    }
  } else {
    Vue.$message.error('请求失败，请查看浏览器log');
    console.log('response error===>>>>', response);
  }
}
