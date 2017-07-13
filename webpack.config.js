var webpack = require('webpack');

var nodeConfig = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    }
};

var browserConfig = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'bundle.node.js'
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    }
};

module.exports = (env = {}) => [nodeConfig, browserConfig];
