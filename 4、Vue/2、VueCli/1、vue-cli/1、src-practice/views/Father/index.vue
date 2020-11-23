<template>
  <div>
    <h2>Father组件...</h2>
    <Child />
  </div>
</template>

<script>
export default {
  name: "Father", // 组件名称，为大驼峰命名法，字符串格式

  // 接收props传递的数据时，要先声明接收数据的类型，否则数据不能直接通过this直接访问
  // props: ["num"],   // 数组的方式
  // 对象的方式，直接写明接收数据的名称，与类型
  /*  props: {
    num: Number,
  }, */
  // 写法三：接收一个对象，key是要接收数据的名字，value是对象，里面是接收数据的类型，是否必须要接收等信息
  props: {
    num123: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.num);
  },
};
</script>

<style>
</style>
