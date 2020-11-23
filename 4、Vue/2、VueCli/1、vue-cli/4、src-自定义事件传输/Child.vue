<template>
  <div>
    <button @click="add">按钮+1</button>

  </div>
</template>

<script>
export default {
  name: "Chlid",
  // props: ["add"],
  methods: {
    add() {
      // this.$listeners.add();

      this.$emit("add");
    },
  },
};
</script>

<style>
</style>
