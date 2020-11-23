<template>
  <li @mouseenter="isShow = true" @mouseleave="isShow = false">
    <label>
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.task }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>

<script>
/* 
  前面的小框选中 表明已经完成了选项，需要更新数据，修改数据的状态，这就要定义一个函数，但是不请求后台，又是直接修改数据的，所以定义在mutations中，在这一步完成之后，才能依据状态的值，来删除数据
  删除功能：获取到这个值，然后使用数组的filter方法，把不符合条件的给过滤掉
*/
import { mapMutations } from "vuex";
import { UPDATE_TODO, DEL_TODO } from "../../store/mutations-types";
export default {
  name: "TodoItem",
  props: ["todo"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapMutations([UPDATE_TODO, DEL_TODO]),
    del() {
      if (window.confirm(`您确定要删除事件吗？`)) {
        this[DEL_TODO](this.todo.id);
      }
    },
  },
  // 使用计算属性来查看页面数据的变化，可以随时改变数据，所以刚刚只是在store中定义了修改数据的方法，但是页面一有变化，就可以使用计算属性来查看，同时，这里又要设置页面
  // 这里计算的是todos中数据的状态，即isCompleted
  computed: {
    isCompleted: {
      get() {
        return this.todo.isCompleted;
      },
      set() {
        // 在这里更新todos中的数据，主要是改变状态值
        this[UPDATE_TODO](this.todo.id);
      },
    },
  },
};
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>