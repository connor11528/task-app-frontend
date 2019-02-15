import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'
import { constants } from '../config/constants'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem(constants.LOCALSTORAGE_TOKEN_KEY) || null,
    user: {},
    tasks: [],
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
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.unshift(task);
    },
    REMOVE_TASK(state, index) {
      state.tasks.splice(index, 1);
    }
  },
  actions: {
    async register(context, payload) {
      try {
        const registerResponse = await axios.post('/api/register', payload);

        return Promise.resolve(_.get(registerResponse, 'data.message'));

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
    },
    async getTaskList({ commit }) {
      axios.get('/api/tasks')
        .then((response) => {
          commit('SET_TASKS', response.data);
        });
    },
    async addTask({ commit }, newTask) {
      axios.post('/api/tasks', newTask)
        .then((response) => {
          commit('ADD_TASK', _.get(response.data,'task'));
        });
    },
    async removeTask({ commit }, { taskId, index }) {
      axios.delete(`/api/tasks/${taskId}`)
        .then(() =>  {
          commit('REMOVE_TASK', index);
        });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
});
