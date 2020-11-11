MyPromise.all = function (iterable) {
	let arr = [];
	return new MyPromise((resolve, reject) => {
		/* 
       1.最终返回一个promise
       2.遍历数组中的值
          如果不是promise，则保存到数组中
          如果是promise，判断该promise的状态
          如果有失败状态的promise，则直接reject
          如果所有promise都是成功状态的，则最终的promise为成功状态
    */

		iterable.forEach((item) => {
			console.log(item); //如果不是promise对象
			if (!(item instanceof MyPromise)) {
				arr.push(item);
				return;
			} //如果是promise对象
			else {
				item
					.then((res) => {
						arr.push(res);
					})
					.catch((reason) => {
						reject(reason);
					});
			}
		});
		resolve(arr);
	});
};
