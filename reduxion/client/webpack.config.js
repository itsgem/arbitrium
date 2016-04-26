var _ = require( 'lodash' );
var path = require( 'path' );
var webpack = require( 'webpack' );
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('./package.json');

var pathAppTo;

function pathTo() {
    return path.join( __dirname, 'src', path.join.apply( path, arguments ) );
}

pathAppTo = _.partial( pathTo, 'app' );

module.exports = function ( options ) {
    var config = _.merge( {}, {
        devServer: {
            contentBase: path.join( __dirname, 'src' ),
            publicPath: '/',
            hot: true,
            inline: true,
            historyApiFallback: true,
            stats: {
                colors: true
            },
            stats: 'errors-only',
            progress: true,
            host: '0.0.0.0',
            port: 9992
        },
        entry: {
            vendor: _.reject(_.keys(pkg.dependencies), function(v) {
                return _.includes([
                    'material-ui',
                    'bootstrap',
                    'intl'
                ], v)
            }).concat([
                'ladda/dist/ladda.min.css'
            ])
        },

        output: {
            path: path.join( __dirname, 'build' ),
            filename: '[name].js'
        },
        plugins: [
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new HtmlWebpackPlugin({
              template: 'src/index.ejs',
              inject: false
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),

            new CopyWebpackPlugin([
                { from: './src/favicon.ico' },
                { from: './assets/img/*.png' },
                { from: './assets/img/*.jpg' },
                { from: './assets/img/*.svg' },
                { from: './locales/**/*.json' }
            ]),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(fr|it)$/),
            new webpack.optimize.CommonsChunkPlugin({names: ['vendor']})
        ],
        resolve: {
            root: path.join( __dirname, 'src', 'app'),
            extensions: [ '', '.js', '.jsx', 'css', '.scss' ],
            alias: {
                //application aliases
                actions: pathAppTo( 'actions' ),
                components: pathAppTo( 'components' ),
                lib: pathAppTo( 'lib' ),
                mixins: pathAppTo( 'mixins' ),
                modals: pathAppTo( 'modals' ),
                models: pathAppTo( 'models' ),
                resources: pathAppTo( 'resources' ),
                services: pathAppTo( 'services' ),
                stores: pathAppTo( 'stores' ),
                views: pathAppTo( 'views' ),
                utils: pathAppTo( 'utils' ),
                parts: pathAppTo( 'parts' ),
                assets: pathTo( 'assets' ),
                config: pathAppTo( 'config.js' )
            }
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                    loader: 'url-loader?limit=100000' },
                {
                    test: /\.jpg|\.png|\.mp3/,
                    loader: 'file-loader'
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("css-loader!sass-loader")
                }
            ]
        },
        resolveLoader: {
            root: path.join( __dirname, 'node_modules' )
        }
    }, options.overrides );

    config.module.loaders = _.union( config.module.loaders, options.loaders );
    config.plugins = _.union( config.plugins, options.plugins );
    return config;
};
