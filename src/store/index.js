import Vue from "vue";
import Vuex from "vuex";

import { getToken } from 'network/cookies';

Vue.use(Vuex);

const state = {
  token: getToken()
}

export default new Vuex.Store({
  state,
  mutations: {
    setToken(state, token) {
      state.token = token
    }

  },
  actions: {},
  modules: {}
});
