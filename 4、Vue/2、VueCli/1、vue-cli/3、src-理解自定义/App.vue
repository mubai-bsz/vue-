<template>
  <div>
    <!-- <A @add="add" /> -->
    <h3>{{ num }}</h3>
    <!-- 使用ref的方法来绑定事件 -->
    <A ref="a" />
    <button @click="off">off</button>
  </div>
</template>

<script>
import A from "./A";

export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
    this.$refs.a.$on("add", this.add);
  },
  methods: {
    add() {
      this.num += 1;
      console.log(this);
    },
    // 解绑事件
    off() {
      this.$refs.a.$off("add", this.add);
    },
  },
  components: {
    A,
  },
};
</script>

<style>
</style>
