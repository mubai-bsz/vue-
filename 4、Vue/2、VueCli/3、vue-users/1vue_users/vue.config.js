module.exports = {
	devServer: {
		// proxy: "http://localhost:3000",
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				// 重写请求地址
				pathRewrite: { "^/api": "" },
			},
			"/foo": {
				target: "<other_url>",
			},
		},
	},
};
