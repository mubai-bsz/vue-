<template>
  <div>
    <!-- 一标签属性名的方式传递数据person数据给父组件 -->
    <slot name="list" :person="person"></slot>
  </div>
</template>

<script>
export default {
  name: "CChild",
  data() {
    return {
      person: {
        name: "tom",
        age: 19,
      },
    };
  },
};
</script>

<style>
</style>
