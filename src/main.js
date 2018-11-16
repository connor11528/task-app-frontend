import Vue from 'vue'
import App from './App.vue'
import TaskListPage from './pages/TaskList'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import axios from 'axios'
import VueRouter from 'vue-router'

axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TaskListPage
    },
    {
    	path: '/register',
    	name: 'register',
    	component: RegisterPage
    },
    {
    	path: '/login',
    	name: 'login',
    	component: LoginPage
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
