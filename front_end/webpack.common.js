const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const config = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].[hash].js',
		path: Path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use:[{
					loader: 'babel-loader',
				}],
				exclude: /node_modules/
			}, {
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader',
						options:{
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options:{
							sourceMap: true,
							localIdentName:'[name]__[local]-[hash:base64:5]'
						}
					},
					{
						loader: 'sass-loader',
						options:{
							// modules: true,
							sourceMap: true,
							localIdentName:'[name]__[local]-[hash:base64:5]'
						}
					}]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: Path.resolve(__dirname, 'src/index.tmpl.html')
		}),
		//代码分离
		new webpack.optimize.SplitChunksPlugin({
			chunks: "all",
			minSize: 20000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendor: {
					chunks: "initial",
					test: /node_modules\//,
					name: 'vendor',
					priority: 10
				},
				commons: {
					chunks: "initial",
					test: /common\/|components\//,
					name: 'commons',
					priority: 10,
					enforce: true
				}
			}
		}),
	]

};

module.exports = config;
