<template>
  <div>
    <p>BBBBBB</p>
    <button @click="add">Add</button>
  </div>
</template>
<script>
export default {
  name: "B",
  methods: {
    add() {
      // this.$bus.$emit("add");
      this.$bus.$emit("add", 1, 2, 3);
    },
  },
};
</script>

<style>
</style>
