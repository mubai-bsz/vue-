<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click="del">删除</a>
    </div>
    <p class="user">
      <span>{{ comment.name }}</span
      ><span>说:</span>
    </p>
    <p class="centence">{{ comment.content }}</p>
  </li>
</template>
<script>
export default {
  name: "ComponentDel",
  props: ["comment"],
  methods: {
    del() {
      if (window.confirm(`你确定要删除${this.comment.name}的评论吗？`)) {
        // 确定要删除时，直接调用函数
        const { id } = this.comment;
        // this.delComment(id);
        this.$bus.$emit("delComment", id);
      }
    },
  },
};
</script>
<style>
li {
  transition: 0.5s;
  overflow: hidden;
}

.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}
.user {
  font-size: 22px;
}
</style>
