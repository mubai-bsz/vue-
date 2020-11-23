<template>
  <!-- 模板页面，写页面的 -->
  <div class="app">
    <h1>hello -vue-cli</h1>
    <p class="app-text">{{ num }}</p>
    <button @click="add">add</button>
    <!-- 通过标签的形式（props），给子组件传递信息 -->
    <!-- 渲染组件 -->
    <Father :num123="num" />
  </div>
</template>

<script>
import Father from "./views/Father";
// 写组件配置
export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    add() {
      this.num++;
    },
  },
  // 注册组件
  components: {
    Father,
  },
};
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
.app {
  height: 100%;
  background-color: rgb(38, 215, 221);
  .app-text {
    color: rgb(22, 102, 177);
  }
}
</style>
