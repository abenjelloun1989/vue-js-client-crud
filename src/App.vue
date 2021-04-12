<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link to="/" class="navbar-brand">DiaSmart</router-link>
      </b-navbar-brand>
    </b-navbar>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>