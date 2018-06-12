const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common,
	{
		mode: "development",
		devtool: "inline-source-map",
		devServer: {
			contentBase: "./dist",//本地服务器所加载的页面所在的目录
			historyApiFallback: true,//不跳转
			inline: true,
			hot: true,
		},
		plugins:[
			//下面两个是模块热替换
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("development")
			})
		]
	}
);