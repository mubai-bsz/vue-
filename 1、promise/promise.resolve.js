// promise.resolve()
// 静态方法，返回一个成功状态的promise对象

MyPromise.resolve = function (data) {
	return (new Promise() = function (resolve, reject) {
    resolve(data);
	});
};
