/**
 * 编译模板的构造函数
 * @param {String | Element} el 元素选择器和元素
 * @param {Object} vm MVVM的实例对象
 */

// el: 指element元素
// vm：指的是MVVM是实例对象vm
function Compile(el, vm) {
	// 把vm添加到this.$vm 上 ， 可以方便给其他的函数使用
	this.$vm = vm;
	// 判断el是否存在，不存在的话就获取el元素节点
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	//  存在el元素，进入条件语句

	// 这个是解析模板的三个大步骤
	if (this.$el) {
		// 1、把el中的所有子节点添加到文档碎片节点中
		this.$fragment = this.node2Fragment(this.$el);
		// 2、编译模板、解析模板
		this.init();
		// 3、将文档碎片节点中的内容添加到el元素中
		this.$el.appendChild(this.$fragment);
	}
}

Compile.prototype = {
	node2Fragment: function (el) {
		// 创建文档碎片节点
		var fragment = document.createDocumentFragment(),
			child;

		// 将原生节点拷贝到fragment
		// 注意：是通过循环遍历的方法，当DOM树中的节点被添加到文档碎片节点中时，那么该节点就会从DOM树中删除，这样，其中的节点才会被一一的添加进去
		while ((child = el.firstChild)) {
			fragment.appendChild(child);
		}
		// 添加完毕之后直接返回文档碎片节点
		return fragment;
	},

	init: function () {
		// 这里调用了编译元素的方法，具体方法在下面
		this.compileElement(this.$fragment);
	},

	// 方法要接收一个el元素
	compileElement: function (el) {
		// 把el中所有的子节点全部放入childNodes中
		var childNodes = el.childNodes,
			me = this;

		// 把位数组转化为真数组，并遍历，拿到里面的值，即节点
		[].slice.call(childNodes).forEach(function (node) {
			// 取出节点
			var text = node.textContent;
			// 正则方法判断验证是否为插值语法
			var reg = /\{\{(.*)\}\}/;

			// 判断是否是元素节点
			if (me.isElementNode(node)) {
				// 是元素节点，调用compile方法
				me.compile(node);

				// 判断是否是文本节点，如果是，判断是否包含插值语法
			} else if (me.isTextNode(node) && reg.test(text)) {
				me.compileText(node, RegExp.$1);
			}

			// 是否为子节点，是的话，在判断是否有长度
			if (node.childNodes && node.childNodes.length) {
				me.compileElement(node);
			}
		});
	},

	compile: function (node) {
		// 取出所有属性节点
		var nodeAttrs = node.attributes,
			me = this;
		// 转成数据遍历，
		[].slice.call(nodeAttrs).forEach(function (attr) {
			// 拿到属性名 v-on:click
			var attrName = attr.name;
			// 判断是否包含v-，包含进入条件语句
			if (me.isDirective(attrName)) {
				// 得到属性值，是一个表达式
				var exp = attr.value;
				// 取出前两个字符，得到指令：on-click
				var dir = attrName.substring(2);
				// 事件指令，判断是否有on
				if (me.isEventDirective(dir)) {
					// 事件指令，v-on
					// 绑定事件函数，并且改变this指向，同时，也会阻止冒泡事件
					compileUtil.eventHandler(node, me.$vm, exp, dir);
				} else {
					// 普通指令
					compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
				}

				node.removeAttribute(attrName);
			}
		});
	},

	compileText: function (node, exp) {
		compileUtil.text(node, this.$vm, exp);
	},

	isDirective: function (attr) {
		return attr.indexOf("v-") == 0;
	},

	isEventDirective: function (dir) {
		return dir.indexOf("on") === 0;
	},

	isElementNode: function (node) {
		return node.nodeType == 1;
	},

	isTextNode: function (node) {
		return node.nodeType == 3;
	},
};

// 指令处理集合
var compileUtil = {
	text: function (node, vm, exp) {
		this.bind(node, vm, exp, "text");
	},

	html: function (node, vm, exp) {
		this.bind(node, vm, exp, "html");
	},

	model: function (node, vm, exp) {
		this.bind(node, vm, exp, "model");

		var me = this,
			val = this._getVMVal(vm, exp);
		node.addEventListener("input", function (e) {
			var newValue = e.target.value;
			if (val === newValue) {
				return;
			}

			me._setVMVal(vm, exp, newValue);
			val = newValue;
		});
	},

	class: function (node, vm, exp) {
		this.bind(node, vm, exp, "class");
	},

	/**
	 *
	 * @param {*} node 当前遍历的元素
	 * @param {*} vm MVVM实例
	 * @param {*} exp 表达式
	 * @param {*} dir 指令
	 */
	bind: function (node, vm, exp, dir) {
		// 指令 + 更新DOM元素的方法
		var updaterFn = updater[dir + "Updater"];

		updaterFn && updaterFn(node, this._getVMVal(vm, exp));

		new Watcher(vm, exp, function (value, oldValue) {
			updaterFn && updaterFn(node, value, oldValue);
		});
	},

	// 事件处理
	// node：节点，当前遍历的元素
	// vm：MVVM实例
	// exp：表达式
	// dir：directive ----》指令，这里指的是click
	eventHandler: function (node, vm, exp, dir) {
		// 切割：得到on:click, ---click
		var eventType = dir.split(":")[1],
			// 如果符合这两个条件，赋值给fn
			fn = vm.$options.methods && vm.$options.methods[exp];

		/* 
    EventTarget.addEventListener() 方法将指定的监听器注册到EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。
    
    fn.bind(vm)表示绑定的事件函数，并且把this指向改为bind
    false为阻止冒泡事件 
    */
		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},

	_getVMVal: function (vm, exp) {
		// 拿到data中的数据
		/*
        exp person.name

        第一次：
            val：所有data数据
            exp：['person', 'name']
            内部遍历：
                k: 'person'
                val[k] --> data['person'] --> { name: 'jack' }
                val = { name: 'jack' }

                k: 'name'
                val[k] --> { name: 'jack' }['name'] --> 'jack'
                val = 'jack'
            将 val 返回出去
    */
		var val = vm._data;
		exp = exp.split(".");
		exp.forEach(function (k) {
			val = val[k];
		});
		return val;
	},

	_setVMVal: function (vm, exp, value) {
		var val = vm._data;
		exp = exp.split(".");
		exp.forEach(function (k, i) {
			// 非最后一个key，更新val的值
			if (i < exp.length - 1) {
				val = val[k];
			} else {
				val[k] = value;
			}
		});
	},
};
// 指令更新DOM元素的方法
var updater = {
	textUpdater: function (node, value) {
		node.textContent = typeof value == "undefined" ? "" : value;
	},

	htmlUpdater: function (node, value) {
		node.innerHTML = typeof value == "undefined" ? "" : value;
	},

	classUpdater: function (node, value, oldValue) {
		var className = node.className;
		className = className.replace(oldValue, "").replace(/\s$/, "");

		var space = className && String(value) ? " " : "";

		node.className = className + space + value;
	},

	modelUpdater: function (node, value, oldValue) {
		node.value = typeof value == "undefined" ? "" : value;
	},
};
