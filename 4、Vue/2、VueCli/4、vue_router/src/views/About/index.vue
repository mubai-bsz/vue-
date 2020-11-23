<template>
  <h2>About</h2>
</template>

<script>
export default {
  name: "about",
  props: ["title"],

  mounted() {
    console.log("about mounted");
  },
  beforeDestroy() {
    console.log("about beforeDestroy");
  },
  activated() {
    console.log("about activated");
  },
  deactivated() {
    console.log("about deactivated");
  },
};
</script>

<style>
</style>