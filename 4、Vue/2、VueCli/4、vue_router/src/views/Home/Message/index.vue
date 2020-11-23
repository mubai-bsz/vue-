<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!-- <router-link :to="`/home/message/detail/${message.id}`">{{
          message.content
        }}</router-link> -->

        <!-- query参数 
          在原来的路径之后进行设置

          子组件在进行获取的时候，通过this.$route.query
        -->
        <!-- <router-link
          :to="`/home/message/detail/${message.id}?name=jack&age=18`"
          >{{ message.content }}</router-link
        > -->
        <router-link
          :to="{
            name: 'Detail',
            params: {
              id: message.id,
            },
            query: {
              name: 'jack',
              age: 18,
            },
          }"
          >{{ message.content }}</router-link
        >
        <button @click="push(message.id)">push</button>
        <button @click="replace(message.id)">replace</button>
      </li>
    </ul>
    <button @click="$router.back()">goBack</button
    ><button @click="$router.forward()">goFoward</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    push(id) {
      this.$router.push(`/home/message/detail/${id}?name=jack&age=18`);
    },
    replace(id) {
      this.$router.replace(`/home/message/detail/${id}?name=jack&age=18`);
    },
  },
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, content: "message1111" },
        { id: 2, content: "message2222" },
        { id: 3, content: "message3333" },
      ];
    }, 1000);
  },
};
</script>

<style>
</style>