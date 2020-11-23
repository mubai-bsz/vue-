<template>
  <div>
    <p>
      clicked: {{ $store.state.count }} times, count is
      {{ $store.getters.evenOrOdd }}
    </p>
    <select v-model="num">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>

<script>
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
  methods: {
    increment() {
      // 更新vuex数据 --> 页面调用dispatch方法，触发actions函数，第一个是要更新触发的函数名，第二个是告诉这个函数要加几
     
      // 对数据进行优化整合，因为increment与decrement功能相似，都是最好调用commit方法，所以直接进行提取
      // this.$store.dispatch("increment", this.num);
      this.$store.commit("INCREMENT", this.num);
      console.log(this.$store);
    },
    decrement() {
      // this.$store.dispatch("decrement", this.num);
      this.$store.commit("DECREMENT", this.num);
    },
    incrementIfOdd() {
      this.$store.dispatch("incrementIfOdd", this.num);
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync", this.num);
    },
  },
};
</script>

<style>
</style>
