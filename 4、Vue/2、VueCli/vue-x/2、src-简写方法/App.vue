<template>
  <div>
    <p>
      clicked: {{ count }} times, count is
      {{ evenOrOdd }}
    </p>
    <select v-model="num">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="DECREMENT(num)">-</button>
    <button @click="incrementIfOdd(num)">incrementIfOdd</button>
    <button @click="incrementAsync(num)">incrementAsync</button>
  </div>
</template>

<script>
// 从vuex中引入几个以map开头的值，可以省略$store.state等，已达到简写的目的
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
/* 
  mapState  映射vuex数据到组件data数据中
  mapMutations  映射vuex mutations函数到组件methods中
  mapGetters  映射vuex getters数据到组件computed数据中
  mapActions  映射vuex actions函数到组件methods中
  把以上方法映射到组件中，在组件内部可以进行数据代理
  这几个方法都是要传递数组的，方法需要什么值，在数组中就传什么值，其返回值是一个对象，可以使用...运算符来展开

  上面使用时传递参数
*/
/* 
组件操作vuex
1、读
2、写
*/
export default {
  name: "App",
  data() {
    return {
      num: 1,
    };
  },
  computed: {
    // 涉及到计算值的放到计算属性中
    /* 
      ...mapState(["count"])返回值是一个对象
      内部的样式
      {
        count(){
          return this.$store.state.count
        }
      }

    */
    ...mapState(["count"]),
    ...mapGetters(["evenOrOdd"]),
  },
  methods: {
    ...mapActions(["incrementAsync", "incrementIfOdd"]),
    ...mapMutations(["INCREMENT", "DECREMENT"]),

    // 这是未使用上面的简写方法的，也可以说是上面方法 的内部使用方法
    increment() {
      // 内部调用了mutation函数
      this.INCREMENT(this.num);
    },
  },
};
</script>

<style>
</style>
