<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <!-- 使用组件，组件渲染 -->
      <ComponentAdd :addComment="addComment" />
      <ComponentList :comments="comments" :delComment="delComment" />
    </div>
  </div>
</template>
<script>
// 1、导入组件
import ComponentAdd from "./views/ComponentAdd";
import ComponentList from "./views/ComponentList";

export default {
  name: "App",
  data() {
    return {
      comments: [
        { id: 1, name: "lisha", content: "hai" },
        { id: 2, name: "lucky", content: "he" },
      ],
    };
  },
  methods: {
    addComment(name, content) {
      // 函数的传参，传多少及传什么，要看函数内部有多少个不能够确定的量
      this.comments.unshift({ id: Date.now(), name, content });
    },
    delComment(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    },
  },
  // 注册组件
  components: {
    ComponentAdd,
    ComponentList,
  },
};
</script>
<style>
</style>
