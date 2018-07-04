import Vue from 'vue';
import Vuex from 'vuex';
import helloWorld from '@/page/HelloWorld/store';
import { getProxyConfig } from '@/api';

Vue.use(Vuex);

const state = {
  proxyConfig: [],
  currentProxyUrl: null,
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
  },
  SET_CURRENT_PROXY_URL(state, val) {
    state.currentProxyUrl = val;
  },
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    helloWorld,
  },
});

export default store;
