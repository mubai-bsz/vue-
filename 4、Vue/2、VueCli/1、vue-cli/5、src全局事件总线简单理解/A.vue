<template>
  <div>
    <h1>AAAAAAAA</h1>
    <p>{{ num }}</p>
  </div>
</template>

<script>
export default {
  name: "A",
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
    this.$bus.$on("add", (a, b, c) => {
      this.num += 1;
      console.log(a, b, c);
    });
  },
};
</script>

<style>
</style>
