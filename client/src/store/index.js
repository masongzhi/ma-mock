import Vue from 'vue';
import Vuex from 'vuex';
import HelloWorld from '@/page/HelloWorld/store';
import Mock from '@/page/Mock/store';
import { getProxyConfig } from '@/api';

Vue.use(Vuex);

const state = {
  proxyConfig: [],
  currentProxyUrl: null,
  enableMock: false,
};

const actions = {
  async getProxyConfig({ commit }) {
    const data = await getProxyConfig();
    commit('SET_PROXY_CONFIG', data);
  },
};

const mutations = {
  SET_PROXY_CONFIG(state, data) {
    state.proxyConfig = data.data.config;
    state.currentProxyUrl = data.data.currentProxyUrl;
    state.enableProxy = data.data.enableProxy;
  },
  SET_CURRENT_PROXY_URL(state, val) {
    state.currentProxyUrl = val;
  },
  SET_ENABLE_MOCK(state, val) {
    state.enableMock = val;
  },
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    HelloWorld,
    Mock,
  },
});

export default store;
