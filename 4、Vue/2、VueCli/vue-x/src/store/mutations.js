import {
	ADD_TODO,
	UPDATE_TODO,
	DEL_TODO,
	CHECK_ALL_TODO,
	BRANCH_DEL_TODO,
} from "./mutations-types";
const mutations = {
	[ADD_TODO](state, task) {
		state.todos.unshift({ id: Date.now(), task, isCompleted: false });
	},
	// 更新数据，拿到相对应的id值，那id，用遍历，然后根据id来判断是否被选中，如果被选中了，那么就把其对应的状态更改一下
	// 遍历有很多方法，这里需要的是返回的数组值不变，但是数组的长度改变了，使用map方法
	[UPDATE_TODO](state, id) {
		state.todos = state.todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					isCompleted: !todo.isCompleted,
				};
			}
			return todo;
		});
	},
	// 删除数据
	[DEL_TODO](state, id) {
		state.todos = state.todos.filter((todo) => todo.id !== id);
	},

	[CHECK_ALL_TODO](state, isCompleted) {
		// 遍历所有的对象 ...todo，把isCompleted的值给改了，改成传入的那个值，其他的值保持不变
		state.todos = state.todos.map((todo) => {
			return {
				...todo,
				isCompleted,
			};
		});
	},
	[BRANCH_DEL_TODO](state) {
		state.todos = state.todos.filter((todo) => !todo.isCompleted);
	},
};
export default mutations;
