const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(common,
	{
		mode: "production",
		devtool: "source-map",
		plugins:[
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("production")
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: 'server',
				//  将在“服务器”模式下使用的主机启动HTTP服务器。
				analyzerHost: '127.0.0.1',
				//  将在“服务器”模式下使用的端口启动HTTP服务器。
				analyzerPort: 8888,
				//  路径捆绑，将在`static`模式下生成的报告文件。
				//  相对于捆绑输出目录。
				reportFilename: 'report.html',
				//  模块大小默认显示在报告中。
				//  应该是`stat`，`parsed`或者`gzip`中的一个。
				//  有关更多信息，请参见“定义”一节。
				defaultSizes: 'parsed',
				//  在默认浏览器中自动打开报告
				openAnalyzer: true,
				//  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
				generateStatsFile: false,
				//  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
				//  相对于捆绑输出目录。
				statsFilename: 'stats.json',
				//  stats.toJson（）方法的选项。
				//  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
				//  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
				statsOptions: null,
				logLevel: 'info'
			})
		]
	}
);