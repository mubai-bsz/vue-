/* 
    getter:对数据设置读取操作
*/

const getters = {
	evenOrOdd(state) {
		return Math.abs(state.count) % 2 === 1 ? "奇数" : "偶数";
	},
};
export default getters;
