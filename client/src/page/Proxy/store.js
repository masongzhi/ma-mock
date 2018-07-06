const state = {
  mockItem: {
    mark: null,
    url: null,
    data: null,
  },
  oldURL: null,
};

const actions = {};

const mutations = {
  SET_MOCK_ITEM(state, val) {
    state.mockItem = val;
  },
  SET_OLD_URL(state, val) {
    state.oldURL = val;
  },
  INIT_MOCK_DIALOG(state) {
    state.mockItem = {
      mark: null,
      url: null,
      data: null,
    };
    state.oldURL = null;
  },
};

const module = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default module;
