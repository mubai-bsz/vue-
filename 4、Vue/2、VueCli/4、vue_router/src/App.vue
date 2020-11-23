<template>
  <div class="container">
    <h1>Router Page</h1>
    <div class="row">
      <div class="col-md-4">
        <ul class="nav nav-pills nav-stacked">
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/home">Home</router-link></li>
        </ul>
      </div>
      <div class="col-md-8">
        <keep-alive>
          <!-- 显示对应组件 -->
          <router-view title="atguigu"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 
  当点击router-link时，会自动给文件添加两个类名，router-link-active与 router-link-exact-active
*/
.router-link-active {
  color: red;
}
</style>
