<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="!comments.length">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <ComponentDel
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :delComment="delComment"
      />
    </ul>
  </div>
</template>
<script>
import ComponentDel from "../ComponentDel";

export default {
  name: "ComponentList",
  // 通过props接收
  props: {
    comments: Array,
    delComment: Function,
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
</style>
