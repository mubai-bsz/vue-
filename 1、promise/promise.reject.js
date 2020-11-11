// 返回一个失败的promise
MyPromise.reject = function (value) {
	return new Promise((resolve, reject) => {
		reject(value);
	});
};
