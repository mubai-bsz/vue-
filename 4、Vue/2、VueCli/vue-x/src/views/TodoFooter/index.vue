<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ completedCount }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="branch_del">清除已完成任务</button>
  </div>
</template>

<script>
// 分析一：当上面的所有都被选中时，那么，下面的这个也要被选中，同样的，当下面的框被选中时，那么，上面的也是要被选中的，可以通过id值来判断是否被选中
// 分析二：已完成与全部是可变化的值，但是值的变化也是要随着页面的变化而变化的，所以，使用计算属性，计算选中的值是几个，然后在进行设置，在store中，使用getters方法是比较适合的
import { mapGetters, mapMutations } from "vuex";
import { CHECK_ALL_TODO, BRANCH_DEL_TODO } from "../../store/mutations-types";
export default {
  name: "TodoFooter",
  methods: {
    // 把CHECK_ALL_TODO这个方法映射到mapMutations中，这个函数的返回值是一个对象，对象展开后，methods会得到传递进来的两个方法,这样就可以使用了
    ...mapMutations([CHECK_ALL_TODO, BRANCH_DEL_TODO]),
    branch_del() {
      this[BRANCH_DEL_TODO]();
    },
  },
  // 函数放到methods中，如果是状态数据放到computed中
  computed: {
    ...mapGetters(["completedCount", "total"]),
    isCheckAll: {
      get() {
        return this.total && this.completedCount === this.total;
      },
      set(newVal) {
        this[CHECK_ALL_TODO](newVal);
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