import Vue from "vue";
import Vuex from "vuex";

// 安装插件
Vue.use(Vuex);
// 集中管理数据
const state = {
	// 数据的初始化
	count: 0,
};
/* 
  间接更新数据
  包含n个方法，间接更新数据
  异步操作，将操作完成后的数据交给mutations函数更新 

  actions函数两个参数
    参数一：要结构赋值的,store --> 内部有dispatch/commit/state等方法
    参数二：别人传进来的参数，外面调用dispatch传递过来的数据
*/
const actions = {
	// store 自己取得名字
	// commit方法会触发mutations函数，触发的是哪个，要把对应的函名称传进来，要告诉这个函数加几，这就有了第二个参数
	increment(store, num) {
		store.commit("INCREMENT", num);
	},
	decrement({ commit }, num) {
		commit("DECREMENT", num);
	},
	// 获取数据，state中有state方法，这里面有数据count
	incrementIfOdd({ commit, state: { count } }, num) {
		if (count % 2 === 1) {
			commit("INCREMENT", num);
		}
	},
	incrementAsync({ commit }, num) {
		setTimeout(() => {
			commit("INCREMENT", num);
		}, 1000);
	},
};

// 直接更新数据
// 数据操作后会更新state，从而组件会从新渲染
// 函数的数量：看要对数据进行更新操作有几种方法，一般方法名是大写的，大写快捷方法
// 要传参：
//     第一个：默认的数据
//     第二个：加几，要传进来，又上一步actions负责传递
const mutations = {
	INCREMENT(state, num) {
		// state.count数据才能更新
		// count是内部定义的方法
		state.count += num;
	},
	DECREMENT(state, num) {
		state.count -= num;
	},
};

// store对象中包含读取数据与更新数据的方法
const store = new Vuex.Store({
	state,
	actions,
	mutations,
});
export default store;
