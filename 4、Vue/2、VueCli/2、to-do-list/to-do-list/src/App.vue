<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addList="addList" />
      <TodoList :todos="todos" :delList="delList" />
      <TodoFooter
        :completeCount="completeCount"
        :total="total"
        :checkAllTodos="checkAllTodos"
        :batchDelTodos="batchDelTodos"
      />
    </div>
  </div>
</template>

<script>
// 引入组件
import TodoHeader from "./views/TodoHeader";
import TodoList from "./views/TodoList";
import TodoFooter from "./views/TodoFooter";

export default {
  name: "App",
  data() {
    // 把放在localStroage中的数据取出
    const todos = JSON.parse(window.localStorage.getItem("todos")) || [];
    return {
      todos/* : [
        { id: 1, task: "tea", isCompleted: true },
        { id: 2, task: "coffee", isCompleted: false },
        { id: 3, task: "cokocole", isCompleted: false },
      ] */,
    };
  },
  methods: {
    addList(task) {
      this.todos.unshift({ id: Date.now(), task, isCompleted: false });
    },
    delList(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    // 查看所有的状态，当全部的都选中时，把下方的全选选中
    checkAllTodos(isCompleted) {
      this.todos.forEach((todos) => {
        todos.isCompleted = isCompleted;
      });
    },
    // 清除已完成的任务，如果已经被选中了，说明是已经完成了，这时点击就会删除,怎么办?使用filter方法，把不符合条件的 过滤掉即可
    batchDelTodos() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
    },

    // 从缓存存储的数据可以添加到页面中
     
  },
  computed: {
    completeCount() {
      return this.todos.reduce((p, c) => {
        return p + (c.isCompleted ? 1 : 0);
      }, 0);
    },
    total() {
      return this.todos.length;
    },
  },
  // 新的需求，当页面刷新时候，页面中的内容依然可以保持不变，
  // 可以把内容存到local Storage中，但是现在有一个问题，就是在什么时候保存数据，及使用哪一种方式？监视、计算或者是方法？？？
  // 注册组件
  watch: {
    todos: {
      handler(val) {
        window.localStorage.setItem("todos", JSON.stringify(val));
      },
      deep: true,
    },
  },
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
};
</script>>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
