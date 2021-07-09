const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
	target: 'web',
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 9000,
		watchContentBase: true
	  },
});