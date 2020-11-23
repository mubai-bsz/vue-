<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="task"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
export default {
  name: "TodoHeader",
  props: {
    addList: Function,
  },
  data() {
    return {
      task: "",
    };
  },
  methods: {
    add() {
      // 刚才的错误总结，我写的是msg，但是this上没有msg，从组件传来的只有task
      const { task } = this;
      if (!task) {
        alert("请输入代办事项");
        return;
      }
      this.addList(task);
      this.task = "";
    },
  },
};
</script>

<style>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>