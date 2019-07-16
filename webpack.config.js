const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// Defining entry points tells webpack where to start building it's bundles
	// In this case it will bundle content from bable-polyfill as well as our index.js file
	entry: ['babel-polyfill', './src/js/index.js'],
	// Define output path (dist folder) and filename for bundled js file
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	// Define where the local dev server should run
	devServer: {
		contentBase: './dist'
	},
	// Define the source file and bundled file for the HTML webpack plugin
	// Similar to how basic webpack works with JavaScript
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],
	// Define rules for how specific 'loaders' should be applied, and to what files
	module: {
		rules: [{
			// Apply babel-loader to all .js files, as long as they aren't in node_modules directory
			// Babel is made to convert modern ES6+ code into widely supported ES5
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		}]
	}
};