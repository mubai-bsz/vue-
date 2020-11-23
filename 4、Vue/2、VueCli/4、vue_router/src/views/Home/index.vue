<template>
  <div>
    <h2>Home</h2>
    <ul class="nav nav-tabs">
      <li><router-link to="/home/message">message</router-link></li>
      <li><router-link to="/home/news">News</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    console.log("about mounted");
  },
  beforeDestroy() {
    console.log("about beforeDestroy");
  },
    activated() {
    console.log("home activated");
  },
  deactivated() {
    console.log("home deactivated");
  },
};
</script>

<style>
</style>