import Vue from "vue";
import App from "./App";

import Child from "./views/Chlid";

// 使用组件
// Vue.component("Child", Child);
// 第二种写法,组件名的地方使用组件.name的写法
console.log(Child);
Vue.component(Child.name, Child);
new Vue({
  render: h => h(App)
  // h:createElement 的缩写
}).$mount("#app");
