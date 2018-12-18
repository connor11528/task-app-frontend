import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import { router } from './config/router'
import { store } from './store'
import { constants } from './config/constants'

axios.defaults.baseURL                         = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = localStorage.getItem(constants.LOCALSTORAGE_TOKEN_KEY)|| null;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
