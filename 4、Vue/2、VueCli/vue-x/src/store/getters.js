const getters = {
	// 定义完成的数量与全部的数量
	// 完成的数量是要一个一个累加起来的，可以使用数组的reduce方法
	completedCount(state) {
		return state.todos.reduce((p, c) => p + (c.isCompleted ? 1 : 0), 0);
	},
	total(state) {
		return state.todos.length;
	},
};

export default getters;
