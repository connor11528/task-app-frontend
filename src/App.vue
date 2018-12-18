<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light justify-content-between">

      <router-link to='/' class="navbar-brand">Task List</router-link>

      <div class='form-inline ml-auto' v-if='!isLoggedIn'>
        <router-link class="mr-3" to="register">Register</router-link>
        <router-link to="login">Login</router-link>
      </div>

      <div class='form-inline ml-auto' v-if='isLoggedIn'>
        <p>{{ user.email }}</p>
        <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      </div>

    </nav>

    <router-view></router-view>

  </div>
</template>
<script>

export default {
  computed: {
    isLoggedIn(){ 
      return this.$store.getters.isLoggedIn;
    }
  },
  data(){
    return {}
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/');
        });
    }
  }
}

</script>