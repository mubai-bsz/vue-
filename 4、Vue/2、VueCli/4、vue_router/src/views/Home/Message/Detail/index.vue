<template>
  <ul>
    <li>id:{{ message.id }}</li>
    <li>name:{{ message.name }}</li>
    <li>content:{{ message.content }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  props: ["id", "name", "age"],

  data() {
    return {
      messages: [
        { id: 1, name: "name1111", content: "1111111" },
        { id: 2, name: "name2222", content: "2222222" },
        { id: 3, name: "name3333", content: "3333333" },
      ],
      message: {},
    };
  },
  mounted() {
    // 可以获取到传递过来的值  ，在this。data上
    console.log(this);
    // 可以获取到值query的值
    // console.log(this.$route.query);
  },
  // 依据id来显示不同的值
  watch: {
    $route: {
      handler(newVal) {
        const id = +newVal.params.id; //string ---->  number
        this.message = this.messages.find((message) => message.id === id);
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>