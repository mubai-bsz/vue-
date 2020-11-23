<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="!comments.length">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <ComponentDel
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @abort="comment"
      />
    </ul>
  </div>
</template>
<script>
import ComponentDel from "../ComponentDel";

export default {
  name: "ComponentList",
  data() {
    return {
      comments: [
        { id: 1, name: "lucy", content: "helloWorld" },
        { id: 2, name: "aiersha", content: "hello tomorrow" },
      ],
    };
  },
  mounted() {
    // 添加
    this.$bus.$on("addcomment", (name, content) => {
      this.comments.unshift({ id: Date.now(), name, content });
    });
    // 删除
    this.$bus.$on("delComment", (id) => {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    });
  },
  components: {
    ComponentDel,
  },
};
</script>
<style>
.reply {
  margin-top: 0px;
}
.list-group-item .centence {
  padding: 0px 50px;
}
</style>
