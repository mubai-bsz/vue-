const { EROFS } = require("constants");
const express = require("express");
const app = express();
app.get("/comments", (req, res) => {
	// 解决跨域问题 jsonp cors
	res.set("Access-Control-Allow-Origin", "*");
	setTimeout(() => {
		res.json({
			code: 10000,
			data: [
				{
					id: 1,
					title: "hello-world",
				},
			],
		});
	}, 3000);
});
app.listen(
	3000,
	"localhost",
	(err) => {
		console.log("err", err);
		return;
	},
	console.log("服务器启动成功---")
);
