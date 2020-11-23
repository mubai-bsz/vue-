import { INCREMENT, DECREMENT } from "./mutations-type";
// 直接更新数据
// 数据操作后会更新state，从而组件会从新渲染
// 函数的数量：看要对数据进行更新操作有几种方法，一般方法名是大写的，大写快捷方法
// 要传参：
//     第一个：默认的数据
//     第二个：加几，要传进来，又上一步actions负责传递
const mutations = {
	// 对象的简写形式，前面的是key值，后面是函数方法，常量使用[]括起来，可以直接进行解析，至于为什么要把变量设置为常量，一是方便其他地方使用，二是不容易写错，三是如果使用变量，在其他地方使用时需要引来引去，其中的过程太过于繁琐
	[INCREMENT](state, num) {
		// state.count数据才能更新
		// count是内部定义的方法
		state.count += num;
	},
	[DECREMENT](state, num) {
		state.count -= num;
	},
};

export default mutations;
