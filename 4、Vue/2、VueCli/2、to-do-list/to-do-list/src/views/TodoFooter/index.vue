<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ completeCount }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="del">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "TodoFooter",
  props: {
    completeCount: Number,
    total: Number,
    checkAllTodos: Function,
    batchDelTodos: Function,
  },
  methods: {
    del() {
      this.batchDelTodos();
    },
  },
  computed: {
    isCheckAll: {
      get() {
        return this.completeCount === this.total && this.total !== 0;
      },
      set(val) {
        this.checkAllTodos(val);
      },
    },
  },
};
</script>

<style>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>