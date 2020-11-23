<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="searchName"
      />
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchName: "",
    };
  },
  // 这里写触发事件的函数
  methods: {
    search() {
      // 做一个判断如果没有输入名字时，直接return
      if (!this.searchName) {
        return;
      }

      this.$bus.$emit("search", this.searchName);
    },
  },
};
</script>

<style>
</style>