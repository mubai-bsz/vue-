import Vue from "vue";
import App from "./App";

import store from "./store";
// 引入公共样式
import "./assets/css/common.css"
// 关闭生产环境提示
Vue.config.productionTip = false;
new Vue({
	render: (h) => h(App),
	store,
}).$mount("#app");
