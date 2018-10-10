import Vue from 'vue'
import App from './App.vue'

import TaskList from './components/TaskList.vue';
window.axios = require('axios');

Vue.component('TaskList', TaskList);

new Vue({
  el: '#app',
  components: {
    TaskList
  },
  render: h => h(App)
})
