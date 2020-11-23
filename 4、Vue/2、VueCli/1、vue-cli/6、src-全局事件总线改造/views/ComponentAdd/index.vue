<template>
  <div class="col-md-4">
    <form class="form-horizontal" @submit.prevent="add">
      <div class="form-group">
        <!-- <label>{{ name }}</label> -->
        <input
          type="text"
          class="form-control"
          placeholder="用户名"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <!-- <label>{{ content }}</label> -->
        <textarea
          class="form-control"
          rows="6"
          placeholder="评论内容"
          v-model="content"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default pull-right" @abort="add">
            提交
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ComponentAdd",
  data() {
    return {
      name: "",
      content: "",
    };
  },
  methods: {
    add() {
      const { name, content } = this;
      if (!name || !content) {
        alert("请输入名称与评论");
        return;
      }
      this.$bus.$emit("addcomment", name, content);
      // 提交完后，把值改了
      this.name = "";
      this.content = "";
    },
  },
};
</script>

<style>
</style>
