<template>
  <div>
    <h3>AChild...</h3>
    <!-- 通过name属性决定使用哪一个插槽 -->
    <slot name="header"> </slot>
    <p>---------</p>
    <slot name="main"> </slot>
    <p>---------</p>
    <slot name="footer"> </slot>
  </div>
</template>

<script>
export default {
  name: "BChild",
};
</script>

<style>
</style>
