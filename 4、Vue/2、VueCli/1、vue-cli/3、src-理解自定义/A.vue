<template>
  <div>
    <h1>AAAAAA</h1>
    <button @click="handleClick">add</button>
  </div>
</template>

<script>
export default {
  name: "A",
  methods: {
    handleClick() {
      this.$emit("add");
      // this.$listeners.add();
    },
  },
};
</script>

<style>
</style>
