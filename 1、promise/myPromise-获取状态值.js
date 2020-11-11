(function (w) {
	// executor为传入的函数
	function MyPromise(executor) {
		// 初始化状态为pending

		// promise对象是this  ---》new关键字
		const that = this;
		// _开头的属性是私有属性，不允许外部操作
		that._status = "pending";

		// 要修改promise的状态，然后在获取到Promise 在resolve状态的值，要获取到这个值，就要先调这个函数，之后就是定义函数的事情了
		// 默认在pending状态下，promise的值为undefined
		that._result = undefined;
		// 用来装成功、失败状态函数的容器
		that._callback = {};

		// 将promise的状态改为resolved状态
		function resolve(value) {
			//因为promise的状态只能修改一次，所以加一个判断条件
			if (that._status !== "pending") return;
			that._status = "resolved";

			// 这个值是promise中resolve传递进来的值
			that._result = "value";
			// that._callback.onResolved && that._callback.onResolved(value);
			setTimeout(function () {
				// 可选链  新的运算符
				that._callback.onResolved?.(value);
			}, 0);
		}
		// 将promise的状态改为rejected状态
		function reject(reason) {
			//因为promise的状态只能修改一次，所以加一个判断条件
			if (that._status !== "pending") return;
			that._status = "rejected";

			// 这个值是promise中reject传递进来的值
			that._result = "reason";
			setTimeout(function () {
				// 新的语法，?. 可选链   前面为true是返回后面的值，否则不返回
				that._callback.onRejected?.(reason);
			}, 0);
		}
		// 同步调用
		executor(resolve, reject);
	}

	// 修改then或者catch的方法的状态
	MyPromise.prototype.then = function (onResolved, onRejected) {
		// 这里的this指向的是promise
		const that = this;

		// 为了then不传第二个参数（回调函数）
		onRejected =
			typeof onRejected === "function"
				? onRejected
				: (reason) => {
						throw reason;
				  };

		// 为catch不传递第一个参数服务
		onResolved =
			typeof onResolved === "function"
				? onResolved
				: (value) => {
						throw value;
				  };
 
		// 返回新的promise对象  为了实现链式调用
		return new MyPromise(function (resolve, reject) {
			// 状态的改变，在什么时候需要resolve，在什么时候需要reject

			// 需求：得到onRejected与 onResolved的返回值
			that._callback.onResolved = function (value) {
				try {
					const result = onResolved(value);
					// 如果res在MyPromise的原型链上，说明是成功状态的promise，可以执行then方法
					if (result instanceof MyPromise) {
						// result.then(()=>{resolve()},()=>{reject()})
						result.then(resolve, reject);
					} else {
						// 返回不是promise对象  返回一个成功的状态
						reject(result);
					}
				} catch {
					(e) => {
						// err 出错的原因
						// 当onResolved方法报错了执行
						reject(e);
					};
				}
			};

			this._callback.onRejected = function (reason) {
				try {
					const result = onRejected(reason);
					if (result instanceof MyPromise) {
						res.then(resolve, reject);
					} else {
						// 当返回值不是promise的时候，也会返回成功状态的promise对象
						resolve(result);
					}
				} catch {
					(e) => {
						// onRejected方法报错执行
						reject(e);
					};
				}
			};
		});
	};

	//catch方法
	MyPromise.prototype.catch = function (onRejected) {
		return this.then(undefined, onRejected);
	};

	// 给window对象添加一个自己写的promise方法
	window.MyPromise = MyPromise;
})(window);

// 理解this的指向
// function Person(name) {
//   // this就是实例对象
//   this.name = name;
// }

// const p = new Person('jack');
