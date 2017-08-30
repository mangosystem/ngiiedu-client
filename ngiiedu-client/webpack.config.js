var webpack = require("webpack");

module.exports = {

		entry: './src/index.js',

		output: {
			path: __dirname + '/webapps',
			filename: 'bundle.js'
		},

		devServer: {
			// inline: true,
			port: 7777,
			contentBase: __dirname + '/webapps',
			historyApiFallback : true //직접주소를 쳐도 들어갈 수 있도록
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					loaders: 'babel-loader',
					exclude: /node_modules/,
					query: {
						cacheDirectory: true,
						presets: ['es2015', 'react']
					}
				},
				{
					test: /\.css$/,
					use: [
						"style-loader",
						"css-loader"
					]
				}
			]
		}
};
