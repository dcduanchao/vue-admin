import Vue from "vue";
import Vuex from "vuex";

import { getToken } from 'network/cookies';

Vue.use(Vuex);

const state = {
  token: ''
}

export default new Vuex.Store({
  state,
  mutations: {
    setToken(state) {
      state.token = getToken()
    }

  },
  actions: {},
  modules: {}
});
