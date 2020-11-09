(function (w) {
	// executor为传入的函数
	function MyPromise(executor) {
    // 初始化状态为pending
    
    // promise对象是this  ---》new关键字
		const that = this;
		// _开头的属性是私有属性，不允许外部操作
		that._status = "pending";

		// 将promise的状态改为resolved状态
		function resolve() {
			//因为promise的状态只能修改一次，所以加一个判断条件
			if (that._status !== "pending") return;
			that._status = "resolved";
		}
		// 将promise的状态改为rejected状态
		function reject() {
			//因为promise的状态只能修改一次，所以加一个判断条件
			if (that._status !== "pending") return;
			that._status = "rejected";
		}
		// 同步调用
		executor(resolve, reject);
	}
	// 给window对象添加一个自己写的promise方法
	window.MyPromise = MyPromise;
})(window);




// 理解this的指向
// function Person(name) {
//   // this就是实例对象
//   this.name = name;
// }

// const p = new Person('jack');
