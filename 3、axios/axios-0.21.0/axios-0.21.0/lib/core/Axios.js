"use strict";

var utils = require("./../utils");
var buildURL = require("../helpers/buildURL");
var InterceptorManager = require("./InterceptorManager");
var dispatchRequest = require("./dispatchRequest");
var mergeConfig = require("./mergeConfig");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
	this.defaults = instanceConfig;
	this.interceptors = {
		request: new InterceptorManager(),
		response: new InterceptorManager(),
	};
}

/**
 * Dispatch a request
 *发送请求
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
// 调用原型上的请求的方法
Axios.prototype.request = function request(config) {
	/*eslint no-param-reassign:0*/
	// Allow for axios('example/url'[, config]) a la fetch API

	if (typeof config === "string") {
		config = arguments[1] || {};
		config.url = arguments[0];
	} else {
		config = config || {};
	}
	// 合并配置，如果有冲突，后面的将会覆盖前面的，具体怎么合并的不必深究源代码，看多了会吐的  -_-！！！
	config = mergeConfig(this.defaults, config);

	// Set config.method
	// 设置配置方法 无论是传进来的还是使用默认的，都会转换成小写的，如果没有传递请求方式，那么就使用get方法
	if (config.method) {
		config.method = config.method.toLowerCase();
	} else if (this.defaults.method) {
		config.method = this.defaults.method.toLowerCase();
	} else {
		config.method = "get";
	}

	// Hook up interceptors middleware
	// 连接拦截器中间件
	// dispatchRequest  发送请求的方法
	// 拦截器的执行流程
	var chain = [dispatchRequest, undefined];
	// 生成一个成功的promise对象
	var promise = Promise.resolve(config);

	//调用这个方法 遍历请求拦截器的函数，然后插入到chain中
	this.interceptors.request.forEach(function unshiftRequestInterceptors(
		interceptor
	) {
		// 在数组的前面插入数据，成功的拦截器与失败的拦截器
		chain.unshift(interceptor.fulfilled, interceptor.rejected);
	});
	// 遍历所有拦截器，向数组的后面添加数据
	this.interceptors.response.forEach(function pushResponseInterceptors(
		interceptor
	) {
		chain.push(interceptor.fulfilled, interceptor.rejected);
	});

	/*
      上面的具体执行过程
     [
        请求拦截器成功回调, 请求拦截器失败回调, 
        dispatchRequest, undefined, 
        响应拦截器成功回调, 响应拦截器失败回调
      ]
  */
	while (chain.length) {
		// 每一次遍历都会从数组中移除前面两个，这样循环就会有结束的条件了，不会是一个死循环了
		promise = promise.then(chain.shift(), chain.shift());
	}

	return promise;
};

Axios.prototype.getUri = function getUri(config) {
	config = mergeConfig(this.defaults, config);
	return buildURL(config.url, config.params, config.paramsSerializer).replace(
		/^\?/,
		""
	);
};

// Provide aliases for supported request methods
// 给Axios原型上添加 'delete', 'get', 'head', 'options' 这四个请求方式
// 本质上这四个请求方式就是调用 request 方法
utils.forEach(
	["delete", "get", "head", "options"],
	function forEachMethodNoData(method) {
		/*eslint func-names:0*/
		Axios.prototype[method] = function (url, config) {
			return this.request(
				// 合并配置，后面的会覆盖前面的
				mergeConfig(config || {}, {
					method: method,
					url: url,
					data: (config || {}).data,
				})
			);
		};
	}
);

// 给Axios原型上添加 "post", "put", "patch" 这三个请求方式
// 本质上这四个请求方式就是调用 request 方法
utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
	/*eslint func-names:0*/
	Axios.prototype[method] = function (url, data, config) {
		return this.request(
			mergeConfig(config || {}, {
				method: method,
				url: url,
				data: data,
			})
		);
	};
});

module.exports = Axios;
