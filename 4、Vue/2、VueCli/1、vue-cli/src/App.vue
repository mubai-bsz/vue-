<template>
  <div>
    <h1>slot插槽传值</h1>
    <AChild>
      <!-- 默认插槽
        组件写成双标签，里面放入标签数据，那么这个标签数据就会以插槽的方式传递给子组件
      -->
      <p>hello-world123</p>
      <p>hello-world123</p>
      <p>hello-world123</p>
    </AChild>
    <!-- 具名插槽，给每一个插槽起名字 -->
    <BChild>
      <!-- 就语法：slot=‘name’ -->
      <template slot="header">
        <header>header...{{ title }}</header>
      </template>
      <!-- 新语法：v-slot；name -->
      <template v-slot:main>
        <main>main...</main>
      </template>
      <!-- 新语法简写 #name -->
      <template #footer>
        <footer>footer...</footer>
      </template>
    </BChild>

    <!-- 作用域插槽 具体是在内部使用具名插槽
          可以实现子数据传递给父级
    -->
    <!-- 父组件插槽可以接受子组件通过slot传递的props数据 -->
    <CChild>
      <!-- { person: { name, age } }使用了解构语法，先把person解构出来，然后在把person中的之值给解构出来 -->
      <!-- 旧的方式，不过下面使用的时候，也要写成person.name\age -->
      <!-- <template v-slot:list="{ person }"> -->
      <!-- 最新的书写方式 -->
      <template #list="{ person: { name, age } }">

        <ul>
          <li>姓名：{{ name }}</li>
          <li>年龄：{{ age }}</li>
        </ul>
      </template>
    </CChild>
  </div>
</template>

<script>
import AChild from "./AChild";
import BChild from "./BChild";
import CChild from "./CChild";

export default {
  name: "App",
  data() {
    return {
      title: "helloWorld",
    };
  },
  components: {
    AChild,
    BChild,
    CChild,
  },
};
</script>

<style>
</style>
