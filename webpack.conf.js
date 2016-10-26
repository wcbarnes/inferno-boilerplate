const webpack = require('webpack');
const glob = require('glob');

module.exports = {
	entry: './src/Ticker.js',
	output: {
		path: '.',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	//devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules\/dist/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: true,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					return '/public/index.html';
				}
			},
   		'/stock': { target: 'http://localhost:3000', secure: false }
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
