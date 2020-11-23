<template>
  <div>
    <h1 v-if="isLoading">Looading.....</h1>
    <h1 v-else>
      Most Star Repo is <a :href="Repo.url">{{ Repo.name }}</a>
    </h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      Repo: {
        name: "",
        url: "",
      },
    };
  },
  mounted() {
    // 正在请求中
    this.isLoading = true;
    axios
      .get(`https://api.github.com/search/repositories?q=v&sort=stars`)
      .then((res) => {
        console.log("res", res);
        // 请求完成,改变请求的状态，及从数据中拿到name与URL的值
        this.isLoading = false;
        // html_url 解构数组，同时进行重新命名
        const { name, html_url: url } = res.data.items[0];
        this.Repo.name = name;
        this.Repo.url = url;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};
</script>

<style>
</style>