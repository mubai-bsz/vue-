<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <ComponentAdd  />
      <ComponentList  />
    </div>
  </div>
</template>

<script>
import ComponentAdd from "./views/ComponentAdd";
import ComponentList from "./views/ComponentList";

export default {
  name: "App",
  components: {
    ComponentAdd,
    ComponentList,
  },
};
</script>

<style>
</style>
