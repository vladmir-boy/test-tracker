"use strict";

const path = require('path');
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function getArg(key, defaultVal) {
    var index = process.argv.indexOf(key),
        next = process.argv[index + 1];

    defaultVal = defaultVal || null;

    return (index < 0) ? defaultVal : (!next || next[0] === "-") ? true : next;
}

function prepareEnvironmentVariables() {
	const env = getArg("--mode") == "development" ? dotenv.config({ path: './.env.local' }).parsed : {};

	// reduce it to a nice object, the same as before
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});
	return envKeys;
}

module.exports =  {
		entry: './src/index.tsx',
		target: 'web',
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist')
		},

		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			fallback: {
				assert: require.resolve('assert'),
				//buffer: require.resolve('buffer/'),
				//console: require.resolve('console-browserify'),
				constants: require.resolve('constants-browserify'),
				//crypto: require.resolve('crypto-browserify'),
				//domain: require.resolve('domain-browser'),
				events: require.resolve('events'),
				//http: require.resolve('stream-http'),
				//https: require.resolve('https-browserify'),
				os: require.resolve('os-browserify/browser'),
				path: require.resolve('path-browserify'),
				punycode: require.resolve('punycode'),
				process: require.resolve('process/browser'),
				//querystring: require.resolve('querystring-es3'),
				stream: require.resolve('stream-browserify'),
				string_decoder: require.resolve('string_decoder'),
				sys: require.resolve('util'),
				//timers: require.resolve('timers-browserify'),
				//tty: require.resolve('tty-browserify'),
				url: require.resolve('url'),
				util: require.resolve('util'),
				//vm: require.resolve('vm-browserify'),
				zlib: require.resolve('browserify-zlib'),
				fs: false
			}
		},
		module: {
			rules: [
				{
					test: /.(jpg|jpeg|png|svg)$/,
					use: ['file-loader'],
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html'
			}),
			new webpack.ProvidePlugin({
				stream: "stream-browserify",
				process: 'process/browser',
				Buffer: 'buffer'
			}),
			new webpack.DefinePlugin(prepareEnvironmentVariables())
		],
		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		}
	
};