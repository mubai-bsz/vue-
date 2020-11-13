###axios 的执行顺序

- 创建 xhr 对象
  const xhr = new XMLHttpRequest()
- 绑定 onreadystatechange 事件,这个过程中会依据状态码来判断请求是否完成

```js
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
      // 响应返回了（但是成功、失败不知道）
      if (xhr.status >= 200 && xhr.status < 300) {
      // 响应成功
        const response = {
          request: xhr,
          status: xhr.status,
          data: JSON.parse(xhr.responseText),
        };
        resolve(response);
      } else {
          // 响应失败
        console.log("error", xhr);
          reject("error");
      }
}
```

> xhr.readystate:状态码

> 0 :初始化状态

> 1 :代表 open 调用，但 send 方法还未调用（没有发送请求）

> 2 :代表 send 方法调用，并且接受到了部分响应信息（响应首行和响应头：状态码就在其中）

> 3 :代表接受了部分响应体数据，（如果响应体数据较小就全部接受。但是数据如果比较大，就只接受一部分）

> 4 :代表全部接受完成

- open 方法 具体就是设置请求信息（请求地址、请求方法等）

```JS
// 这是封装之后的写法
xhr.open('get','http://localhost:3000')
```

```js
未封装的写法;
/*
  通常情况下：
  GET DELETE请求，之后有查询字符串（queryString）
  POST PUT PATCH 请求，既可以有字符串参数，又可以有请求体参数
  params：{name：'tom',age:18} ---> url?name=tom&age=18
  这是最终转换成这种方式跟在端口号的后面
  所以；；现在要想办法，把params中对象格式的内容，转换成后面那种格式的
*/
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
const qs = "";
if (params) {
	// 提取params中所有的属性名成为一个数组
	// [name,age]
	qs = Object.key(params)
		.reduce((p, c) => {
			const value = params[key];
			return p + `${key}=${value}&`;
		}, "?")
		.slice(0, -1);
}
xhr.open(method, url + qs);
let body = "";
if ((method === "POST" || method === "PUT" || method === "PATCH") && data) {
	// 设置请求头
	xhr.setRequestHeader("content-type", "application/json");
	// 这三种请求方式发送请求的数据在data中
	body = json.stringify(data);
}
```

- 发送请求

```js
//body指的是要发送请求的各种信息
xhr.send(body);
```

###拦截器的执行过程

- axios 中关于拦截器的源码

```js
Axios.prototype.request = function request(config) {
	/*eslint no-param-reassign:0*/
	// Allow for axios('example/url'[, config]) a la fetch API
	if (typeof config === "string") {
		config = arguments[1] || {};
		config.url = arguments[0];
	} else {
		config = config || {};
	}

	// 合并配置
	config = mergeConfig(this.defaults, config);
	// 添加method配置, 默认为get
	config.method = config.method ? config.method.toLowerCase() : "get";

	/*
  创建用于保存请求/响应拦截函数的数组
  数组的中间放发送请求的函数
  数组的左边放请求拦截器函数(成功/失败)
  数组的右边放响应拦截器函数

  具体使用数组表示的流程
  [
    请求拦截器成功回调，请求拦截器失败回调
    dispatchRequest，undefined
    响应拦截器成功回调，响应拦截器失败回调
  ]
  */
	var chain = [dispatchRequest, undefined];
	var promise = Promise.resolve(config);

	// 后添加的请求拦截器保存在数组的前面
	this.interceptors.request.forEach(function unshiftRequestInterceptors(
		interceptor
	) {
		chain.unshift(interceptor.fulfilled, interceptor.rejected);
	});
	// 后添加的响应拦截器保存在数组的后面
	this.interceptors.response.forEach(function pushResponseInterceptors(
		interceptor
	) {
		chain.push(interceptor.fulfilled, interceptor.rejected);
	});

  // 通过promise的then()串连起所有的请求拦截器/请求方法/响应拦截器
  // 每一次遍历都会从数组中移除两个，这样循环有结束的条件
	while (chain.length) {
		promise = promise.then(chain.shift(), chain.shift());
	}

	// 返回用来指定我们的onResolved和onRejected的promise
	return promise;
};
```
  - 流程：

1. 代码开始构建了一个config配置对象，用于第一次执行Promise返回一个成功的promise
2. 最核心的数组chain，这个数据中保存了请求拦截器函数，响应拦截器函数和默认就有的发送请求的函数，第一步返回的成功的promise对象，将遍历这个数组逐一执行里面的函数，并返回新的Promise对象
3. 往数组中添加请求拦截器函数，依照axios请求的执行顺序，请求拦截器应该在发送请求之前执行，故应该添加在发送请求函数的前面，所以使用的是数组的unshift方法，这个方法意思是头部添加，即后面添加的元素总是在头部
4. 往数组中添加请求拦截器函数，依照axios请求的执行顺序，响应拦截器应该在发送请求之后执行，故应该添加在发送请求函数的后面，所以使用的是数组的push方法，这个方法意思是尾部添加，即后面添加的元素总是在尾部
5. promise遍历执行，使用的while循序，使用数组的shift方法每次从中取出两个函数执行(成功回调，失败回调)
6. 返回Promise对象，用于执行我们指定的响应数据的回调

