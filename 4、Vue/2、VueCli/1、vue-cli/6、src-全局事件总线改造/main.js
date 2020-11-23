import Vue from "vue";
import App from "./App";

// 关闭生产环境的提示
Vue.config.productionTip = false;
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App)
}).$mount("#app");
