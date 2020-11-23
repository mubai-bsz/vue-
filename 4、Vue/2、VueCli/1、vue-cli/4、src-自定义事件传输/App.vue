<template>
  <div>
    <h1>app</h1>
    <p>{{ num }}</p>
    <!-- // 使用props方法 -->
    <!-- <Child :add="add" /> -->
    <!-- 自定义事件的方法一 -->
    <!-- <Child @add="add" /> -->

    <!-- 自定义事件的方法二，使用ref的方法， -->
    <Child ref="child" />
    <button @click="off">解绑事件</button>
    <button @click="$emit('test')">App组件按钮</button>
  </div>
</template>

<script>
import Child from "./Child.vue";

export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
    // 在挂载时使用
    // console.log(this);
    this.$refs.child.$on("add", this.add);
    this.$refs.child.$on("test", this.test);
  },
  methods: {
    add() {
      this.num += 1;
    },
    off() {
      // 解绑事件使用$.off
      this.$refs.child.$off("add", this.add);
    },
    test() {
      console.log(123);
    },
  },
  components: {
    Child,
  },
};
</script>

<style>
</style>
