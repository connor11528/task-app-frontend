import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'
import { constants } from '../config/constants'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem(constants.LOCALSTORAGE_TOKEN_KEY) || null,
    user: {}
  },
  mutations: {
    authenticate(state, token, user){
      state.token = token;
      state.user  = user;

      localStorage.set(constants.LOCALSTORAGE_TOKEN_KEY, token);
    },
    logout(state){
      state.token = null;
      state.user  = {};

      localStorage.set(constants.LOCALSTORAGE_TOKEN_KEY, '');
    }
  },
  actions: {
    async register(context, payload) {
      try {
        const registerResponse = await axios.post('/api/register', payload);
        const { token, user } = registerResponse.data;

        context.commit('authenticate', token, user);

        return Promise.resolve();
        
      } catch (error) {
        // 400 responses are passed to axios catch in error.response
        return Promise.reject(_.get(error.response, 'data.message'));
      }
    },
    async login(context, payload) {
      try {
        const loginResponse   = await axios.post('/api/login', payload);
        const { token, user } = loginResponse.data;

        context.commit('authenticate', token, user);

        return Promise.resolve();

      } catch (error) {
        return Promise.reject(_.get(error.response, 'data.message'));
      }
    }

  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});