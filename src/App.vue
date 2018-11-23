<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <router-link to='/' class="navbar-brand">Task List</router-link>
      <div class='form-inline ml-auto' v-if='!user'>
        <router-link class="mr-3" to="register">Register</router-link>
        <router-link to="login">Login</router-link>
      </div>
      <div class='form-inline ml-auto' v-if='user'>
        <p>{{ user.email }}</p>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import Store from './store';

export default {
  mounted(){
    EventBus.$on('login', (user) => {
      Vue.set(Store, 'user', user);

      this.user = user;

      this.$router.push('dashboard')
    });
  },
  data(){
    return {
      user: Store.user
    }
  }
}

</script>