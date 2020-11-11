"use strict";

var utils = require("./utils");
var bind = require("./helpers/bind");
var Axios = require("./core/Axios");
var mergeConfig = require("./core/mergeConfig");
var defaults = require("./defaults");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
// 创建实例
function createInstance(defaultConfig) {
	// context是Axios的实例对象，可以使用get、post等各种方法
	var context = new Axios(defaultConfig);

	// instance是一个函数有Axios的请求方法，但是this指向context，就是最后使用的axios
	// bind的执行看helpers中的bind方法
	var instance = bind(Axios.prototype.request, context);

	// Copy axios.prototype to instance
	// 继承Axios的原型上的方法复制到instance上，所以axios可以使用get、post等方法
	utils.extend(instance, Axios.prototype, context);

	// Copy context to instance
	// 把context上的值复制到instance上，主要是拦截器、默认配置等方法
	utils.extend(instance, context);

	return instance;
}

/*
  1. 为什么axios既能当做函数调用，也能当做对象使用？
    axios({}) --> instance({}) --> request({})
      因为改变了this指向，所以this指向context（就是Axios的实例对象）
    axios.get(url)
      将Axios.prototype的方法复制到instance（axios）上
      utils.extend(instance, Axios.prototype, context);
      
  2. Axios 和 axios 之间的联系
    axios是不是Axios的实例对象？不是，context才是
    但是axios有Axios上的方法（与Axios实例功能很相似，但不完全一样）

  3. axios的功能
    本身是一个request函数
    有 get、post...等方法
    有 defaults、interceptors等属性
    有 create 、all、Cancel 等方法

  4. axios和axios.create()返回的axios有什么区别？
    本身是一个request函数
    有 get、post...等方法
    有 defaults、interceptors等属性

    没有 create 、all、Cancel 等方法
*/

// Create the default instance to be exported
// 传递的值是默认的一些配置对象
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance继承
axios.Axios = Axios;

// Factory for creating new instances
// 产生新的axios，以用于连续调用
axios.create = function create(instanceConfig) {
	return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require("./cancel/Cancel");
axios.CancelToken = require("./cancel/CancelToken");
axios.isCancel = require("./cancel/isCancel");

// Expose all/spread
// all方法
axios.all = function all(promises) {
	return Promise.all(promises);
};
axios.spread = require("./helpers/spread");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
