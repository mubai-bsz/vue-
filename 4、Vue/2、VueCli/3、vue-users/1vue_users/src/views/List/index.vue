<template>
  <div>
    <h1 v-if="isFirstView">输入用户名搜索</h1>
    <h1 v-else-if="isLoadding">Loading</h1>
    <div v-else class="row">
      <!-- 遍历user中的数据，动态的展示出来 -->
      <div class="card" v-for="user in users" :key="user.id">
        <a :href="user.url" target="_blank">
          <img :src="user.img" style="width: 100px" />
        </a>
        <p class="card-text">{{ user.login }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      isFirstView: true,
      isLoadding: false,
      users: [],
    };
  },
  mounted() {
    // isFirstView、isLoadding不能写在外面的原因是页面已经给加载就会立即执行这一阶段，所以写在外面的话，isFirstView的状态永远是false，而写在内部，就会是当触发事件时，才会修改状态
    this.$bus.$on("search", (searchName) => {
      this.isFirstView = false;
      this.isLoadding = true;
      // 发送axios请求，请求数据
      axios
        .get(`/api/search/users?q=${searchName}`)
        // .get(`https://api.github.com/search/users?q=${searchName}`)
        .then((res) => {
          console.log("res", res);
          // 在发送请求时，把loading改为false
          this.isLoadding = false;
          // 请求的数据有很多条，但是所需要的只有几条，数据长度不变，内容改变，使用map方法
          //返回的值是一个对象，用括号包起来，是因为返回值只是一个对象，可以省略return 与{}，但是对象又有{}，为了不让js引擎误解，所以把对象用括号包起来，这样避免了引擎的误解析，避免了报错
          // this.users = res.data.items.map((user) => ({
          //   //
          //   login: user.login,
          //   id: user.id,
          //   url: user.html_url,
          //   img: user.avatar_url,
          // }));
          this.users = res.data.items.map((user) => {
            return {
              // 把user中的值加一个key，这样可以直接使用这个key，避免写的值太多，节省时间精力
              login: user.login,
              id: user.id,
              url: user.html_url,
              img: user.avatar_url,
            };
          });
        })
        .catch((err) => {
          this.isLoadding = false;
          console.log("err", err);
          alert("网络故障---");
        });
    });
  },
};
</script>

<style>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>