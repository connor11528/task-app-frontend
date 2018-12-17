import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import constants from '../config/constants'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem(constants.LOCALSTORAGE_TOKEN_KEY) || null,
    user: {}
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});