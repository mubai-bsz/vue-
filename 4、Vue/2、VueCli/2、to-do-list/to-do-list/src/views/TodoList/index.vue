<template>
  <ul class="todo-main">
    <TodoItem
      v-for="todo in todos"
      :Key="todo.id"
      :todo="todo"
      :delList="delList"
    />
  </ul>
</template>

<script>
import TodoItem from "../TodoItem";
export default {
  name: "TodoList",
  props: {
    todos: Array,
    delList: Function,
  },
  components: {
    TodoItem,
  },
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>