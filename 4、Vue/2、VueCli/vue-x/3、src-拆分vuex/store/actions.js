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
	// increment(store, num) {
	// 	store.commit("INCREMENT", num);
	// },
	// decrement({ commit }, num) {
	// 	commit("DECREMENT", num);
	// },
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

export default actions;
