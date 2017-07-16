var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');;

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader', 'postcss-loader', 'sass-loader']
});

const demoPaths = {
	firstDemo: './demos/first'
};
const devPath = demoPaths.firstDemo;

module.exports = {
	context: __dirname,
	entry: {
		firstDemo: `${demoPaths.firstDemo}/index.js`
	},
	output: {
		path: path.resolve(__dirname, `${demoPaths.firstDemo}/assets`),
		filename: '[name].js',
		publicPath: isProd ? './assets/' : '',
		pathinfo: true
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'demos')
				],
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'demos')
				],
				use: isProd ? cssProd : cssDev
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, devPath),
		compress: true,
		port: 9000,
		hot: true,
		open: true,
		inline: true
	},
	plugins: [
		new HtmlWebpackPlugin({
            title: 'Line Graph Demo',
            hash: true,
            filename: `${isProd ? '../' : ''}index.html`,
            template: './src/index.html'
        }),
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: !isProd,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}