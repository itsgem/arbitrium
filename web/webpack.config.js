'use strict';

let path = require('path');

module.exports = {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
        path: path.resolve(__dirname + '/dist/js'),
        filename: 'main.js',
        devtoolLineToLine: true
    },
    module: {
        loaders: [
            {
                test: /src\/.+.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
              test: /(\.css|\.scss)$/,
              loader: 'style!css!sass'
            }
        ]
    }
}