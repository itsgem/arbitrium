require('dotenv').config();
var path = require( 'path' );
var webpack = require( 'webpack' );
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var webpackDevConfig = {
    overrides: {
        devtool: 'eval',
        debug: true,
        entry: {
            app: [
                'webpack-dev-server/client?http://localhost:9991',
                'webpack/hot/only-dev-server',
                './src/app/app.js'
            ]
        }
    },

    plugins: [
        new webpack.DefinePlugin( {
            'process.env': {
                NODE_ENV: JSON.stringify( 'development' ),
                API_URL: JSON.stringify( process.env.API_URL )
            }
        } ),
        new OpenBrowserPlugin({ url: 'http://localhost:9991' })
    ],

    loaders: [
        {
            test: /\.jsx?$/,
            loaders: [ 'react-hot', 'babel' ],
            include: path.join( __dirname, 'src', 'app' ),
            exclude: path.join( __dirname, 'node_modules' )
        }
    ]
};

module.exports = require( './webpack.config' )( webpackDevConfig );
