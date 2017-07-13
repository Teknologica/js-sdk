var webpack = require('webpack');
var path = require('path');

const rules = [
    {test: /\.js$/, use: 'babel-loader'}
];

var nodeConfig = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: process.env.NODE_ENV === 'production'
        })
    ]
};

var browserConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.node.js'
    },
    module: {
        rules
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: process.env.NODE_ENV === 'production'
        })
    ]
};

module.exports = (env = {}) => [nodeConfig, browserConfig];
