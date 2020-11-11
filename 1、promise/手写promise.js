(function (w) {
	// promise是为了解决回调地狱而出现的
	function MyPromise(exactor) {
		// promise有三种状态，默认是pending状态，其他分别是reject失败状态与resolve成功状态，并且promise的状态只能改变一次
		// this指的是promise
		const that = this;

		// 在promise的原型上添加一个属性
		that._callback = {};
		// 默认是pending状态
		that._status = "pending";
		// promise状态上有值
		that._result = value;

		// 判断promise的状态是否为pending状态,若不是，表明状态已经更改过了，就不能在修改其状态了
		//将promise的状态修改为成功状态resolved
		function resolve() {
			if (that._status !== "pending") return;
			that._status = "resolved";

			// 触发调用onResolved函数，拿到值
			setTimeout(function () {
				that._callback.onResolved?.(value);
			}, 0);
		}
		//将promise的状态修改为失败状态rejected
		function reject() {
			if (that._status !== "pending") return;
			that._status = "rejected";

			//触发调用onRejected函数，拿值
			setTimeout(function () {
				that._callback.onRejected?.(value);
			}, 0);
		}
		// promise的参数为一个函数，函数有两个参数
		exactor(resolve, reject);
	}

	// promise有then、catch两个方法
	MyPromise.prototype.then = function (onResolved, onRejected) {
		// promise 可以实现链式调用，所以要判断then的值是什么
		const that = this;

		// 为了then方法不传第二个参数
		onRejected =
			typeof onRejected === "function"
				? onRejected
				: (reason) => {
						throw reason;
				  };

		//为了catch方法不传第一个函数,
		onResolved =
			typeof onResolved === "function"
				? onResolved
				: (reason) => {
						throw reason;
				  };

		// 返回新的promise对象，为了实现链式调用
		return new MyPromise(function (resolve, reject) {
			// 得到onResolved的返回值
			that._callback.onResolved = function (value) {
				try {
					const result = onResolved(value);
					if (result instanceof MyPromise) {
						result.then(resolve, reject);
					} else {
						// 如果返回的不是promise对象，返回成功的promise状态
						resolve(result);
					}
				} catch {
					(e) => {
						reject(e);
					};
				}
			};

			that._callback.onRejected = function (reason) {
				try {
					const result = onRejected(reason);
					if (result instanceof MyPromise) {
						result.then(resolve, reject);
					} else {
						// 返回的不是promise对象，那么也返回成功状态的promise
						resolve(result);
					}
				} catch {
					(e) => {
						reject(resolve);
					};
				}
			};
		});
	};

	// catch方法
	MyPromise.prototype.catch = function (onRejected) {
		return this.then(undefined, onRejected);
	};

	// promise.resolve
	// 1、返回一个成功的promise对象
	// 2、如果值不是promise对象，则会返回一个返回一个promise对象

	MyPromise.resolve = function (value) {
		if (value instanceof MyPromise) {
			resolve(value);
		} else {
			return new MyPromise((resolve) => resolve(value));
		}
	};

	// promise.reject
	// 返回一个失败的promise对象
	MyPromise.reject = function (reason) {
		return new MyPromise((resolve, reject) => {
			reject(reason);
		});
	};

	// promise.all
	// 传入的可以看做是一个数组，数组里面的值可以是promise，也可以是其他的值，比如基本值，对象等。如果传入的不是promise对象，只是一个普通值，也会返回成功的promise对象
	// 检测所有的promise对象
	// 如果一个是失败的promise对象,就返回失败的promise对象
	// 全部都是成功的promise对象，才会返回成功的promise对象

	MyPromise.all = function (promise) {
		return new MyPromise((resolve, reject) => {
			// 成功结果值的数组
			const result = [];
			// 接收数组的长度
			const total = promise.length;
			// 已完成数量
			let completeNum = 0;

			promise.forEach((item, index) => {
				// 这里要进行一个判断，判断item是否属于promise对象
				// 如果是 判断promise的状态，使用then方法来判断
				// 如果不是 就当做是成功的promise使用
				if (item instanceof MyPromise) {
					/* 	item.then(
						(value) => {},
						(reason) => {
							reject(reason);
						}
          ); */

					item.then((value) => {
						/* 		result[index] = value;
						completeNum++;
						if (total === completeNum) {
							resolve(result);
						}  */
						resolveAll(index, value);
						// reject是简写模式
					}, reject);
				} else {
					resolveAll(index, item);
				}
			});

			// 把其中公用的给封装起来
			function resolveAll(index, value) {
				result[index] = value;
				completeNum++;
				if (total === completeNum) {
					resolve(result);
				}
			}
		});
	};

	//allSettled：全部的promise对象执行完成时，无论执行的结果是成功还是失败，都会返回成功的promise对象
	//返回值也是一个数组，里面存的是promise对象的值，传入的值可是对象，基本值或者是promise对象
	MyPromise.allSettled = function (promise) {
		return new MyPromise((resolve) => {
			//  已经执行成功的值 方到一个数组中，默认是0个
			const result = [];
			// 接收数组的长度
			const total = promise.length;
			// 已经完成的数量
			let allFinished = 0;

			// 因为要等所有的执行完，这里可以进行遍历，查看值是否是promise对象，如果是promise对象，那么要判断一下值的状态，这里可以使用then方法来判断状态，看他是成功的状态、还是失败的状态，如果不是promise对象，直接返回成功的promise状态，值为传入的值
			Promise.forEach((item, index) => {
				if (promise instanceof MyPromise) {
					item.then(
						(value) => {
							result[index] = {
								status: "resolved",
								value,
              };
              // 每次遍历，执行完成的数量都会增加
              allFinished++;
              // 如果已经完成的数量与总量相等，输出值，结束这里的执行
							if (allFinished === total) {
								resolve(result);
							}
						},
						(reason) => {
              result[index]={
                status ='rejected',
                reason
              }
                  // 每次遍历，执行完成的数量都会增加
              allFinished++;
              // 如果已经完成的数量与总量相等，输出值，结束这里的执行
							if (allFinished === total) {	
                resolve(result);
							}
            }
					);
				} else {
          // 不是promise对象，返回成功的状态
          result[index] = {
            status: "resolved",
            value,
          };
          allFinished++;
          if(allFinished === total){
            resolve(result)
          }
				}
			});
		});
	};
	// 在window上添加一个promise方法
	w.MyPromise = MyPromise;
})(window);
