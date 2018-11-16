<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <router-link to='/' class="navbar-brand">Task List</router-link>
      <div class='form-inline ml-auto'>
        <router-link class="mr-3" to="register">Register</router-link>
        <router-link to="login">Login</router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>