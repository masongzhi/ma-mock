const state = {
  mockItem: {
    mark: null,
    url: null,
    data: null,
  },
};

const actions = {};

const mutations = {
  SET_MOCK_ITEM(state, val) {
    state.mockItem = val;
  },
  INIT_MOCK_ITEM(state) {
    state.mockItem = {
      mark: null,
      url: null,
      data: null,
    };
  },
};

const module = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default module;
