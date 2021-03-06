const
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	merge = require('webpack-merge'),
	path = require('path'),

	ExtractTextPlugin = require('extract-text-webpack-plugin')
;


module.exports = function(env, argv) {
	const
		COMMON = {
			mode: argv.mode || 'development',
			watch: !argv.mode,
			stats: {
				modules: false,
				children: false
			}
		},
		JAVASCRIPT = {
			entry: {'cruditor': './static/js/cruditor.js'},
			output: {
				filename: '[name].js',
				path: path.join(__dirname, 'cruditor', 'static', 'cruditor', 'js'),
				library: 'cruditor',
				libraryTarget: 'umd'
			},
			module: {
				rules: [{
					test: /\.svg$/,
					loader: 'html-loader',
					options: {minimize: false}
				}]
			}
		},
		STYLESHEET = {
			entry: {'cruditor': './static/scss/cruditor.scss'},
			output: {
				filename: '[name].css',
				path: path.join(__dirname, 'cruditor', 'static', 'cruditor', 'css'),
			},
			module: {
				rules: [{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({use: [
						{loader: 'css-loader'},
						{loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [autoprefixer, cssnano]
							}
						},
						{loader: 'sass-loader'}
					]})
				}]
			},
			plugins: [
				new ExtractTextPlugin({
					filename: '[name].css',
					allChunks: true
				})
			],
			resolve: {
				alias: {
					bootstrap: path.join(__dirname, 'node_modules/bootstrap/scss')
				}
			}
		}
	;

	return [
		merge(COMMON, JAVASCRIPT),
		merge(COMMON, STYLESHEET)
	];
};
