import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  el: '#app',
  render: h => h(App)
});
