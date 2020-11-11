"use strict";

var utils = require("./../utils");
// InterceptorManager  拦截器管理
function InterceptorManager() {
	this.handlers = [];
}
// handlers里面放的是拦截器中成功或者是失败的状态，在下面可以看到
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
// 
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	this.handlers.push({
		fulfilled: fulfilled,
		rejected: rejected,
	});
	return this.handlers.length - 1; //返回的是插入的值的下标
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
// 从数组中删除
InterceptorManager.prototype.eject = function eject(id) {
	if (this.handlers[id]) {
		this.handlers[id] = null;
	}
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
	utils.forEach(this.handlers, function forEachHandler(h) {
		if (h !== null) {
			fn(h);
		}
	});
};

module.exports = InterceptorManager;
