// 自定义vue插件
// 方法一，使用函数方式
/* function MyPlugin(vue) {
	// 当调用插件时，会调用插件函数，传入vue作为参数
	// 扩展vue的功能

	// 扩展全局功能

	Vue.globalMethod = function () {
		console.log("globalMethod");
	};

	// 扩展实例对象功能
	Vue.prototype.$instanceMethod = function () {
		console.log("$instanceMethod");
	};

	// 扩展全局过滤器
	Vue.filter("formatDate", (value, str) => {
		return dayjs(value).format(str);
	});

	// 扩展全局指令
	Vue.directive("upper-text", (el, binding) => {
		el.textContent = binding.value.toUpperCase();
	});
}
 */

//  方法二，使用对象的方法
const MyPlugin = {};
MyPlugin.install = function () {
	// 扩展全局功能

	Vue.globalMethod = function () {
		console.log("globalMethod");
	};

	// 扩展实例对象功能
	Vue.prototype.$instanceMethod = function () {
		console.log("$instanceMethod");
	};

	// 扩展全局过滤器
	Vue.filter("formatDate", (value, str) => {
		return dayjs(value).format(str);
	});

	// 扩展全局指令
	Vue.directive("upper-text", (el, binding) => {
		el.textContent = binding.value.toUpperCase();
	});
};
// 把封装好的插件方法MyPlugin赋值到函数的自定义方法MyPlugin上
window.MyPlugin = MyPlugin;
