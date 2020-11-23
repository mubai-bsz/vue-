<template>
  <div>
    <div id="app">
      <div class="container">
        <Search />
        <List />
      </div>
    </div>
  </div>
</template>

<script>
import List from "./views/List";
import Search from "./views/Search";

export default {
  name: "App",
  // 静态资源书写完毕，接下来要定义初始状态，是否显示搜索界面，使用全局事件总线的方法list需要数据展示，可以来定义事件，而search用来触发事件

  components: {
    List,
    Search,
  },
};
</script>

<style>
</style>