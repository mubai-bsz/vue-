import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from "../views/Home";
import About from "../views/About";

import Message from "../views/Home/Message";
import Detail from "../views/Home/Message/Detail";

import News from "../views/Home/News";
Vue.use(VueRouter);

// 使用
const router = new VueRouter({
	// 定义路由配置
	routes: [
		{
			// 一般路由
			path: "/about",
			component: About,
		},
		{
			// 一般路由
			path: "/home",
			component: Home,
			children: [
				{
					path: "/home/message",
					component: Message,
					children: [
						{
							name: "Detail", //加上name属性，被称为命名路由，具体是怎么样接收，等会看一下视频
							path: "detail/:id", //动态路由配置
							component: Detail,
							// props传递参数，把原来的params参数与query参数以props的方式传递给组件
							// props是一个函数，接收route作为参数，可以把其中的query与params解构出来，返回值是一个对象
							// 当然，子组件在进行接收的时候，通过props接收
							props(route) {
								return {
									// 展开params中的东西，是动态的
									...route.params,
									...route.query,
								};
							},
						},
					],
				},
				{ path: "news", component: News },
			],
		},
		// 配置重定向
		{
			path: "/",
			component: Home,
		},
	],
});

export default router;
