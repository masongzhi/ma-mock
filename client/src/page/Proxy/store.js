const state = {
  dialogForm: {
    url: null,
    name: null,
  },
};

const actions = {};

const mutations = {
  SET_DIALOG_FORM(state, val) {
    state.dialogForm = val;
  },
  INIT_DIALOG(state) {
    state.dialogForm = {
      url: null,
      name: null,
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
