import Vue from 'vue'
import App from './App.vue'
import TaskListPage from './pages/TaskList'
import RegisterPage from './pages/Register'
import ConfirmationPage from './pages/Confirmation'
import LoginPage from './pages/Login'
import axios from 'axios'
import VueRouter from 'vue-router'

axios.defaults.baseURL = 'http://localhost:8000';

window.EventBus = new Vue();

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
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationPage
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
