import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import TaskListPage from './pages/TaskList'
import RegisterPage from './pages/Register'
import ConfirmationPage from './pages/Confirmation'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import constants from './config/constants'

axios.defaults.baseURL                         = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = localStorage.getItem(constants.LOCALSTORAGE_TOKEN_KEY)|| null;

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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(!to.matched.some(record => record.meta.requiresAuth)){
    next();
  }

  if(store.getters.isLoggedIn){
    next();
    return;
  }
  
  next('/login');

});















new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
