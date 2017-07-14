var webpack = require('webpack');
var path = require('path');

const rules = [
    {test: /\.js$/, use: 'babel-loader'}
];

module.exports = (env = {}) => {
    console.log('env', env);
    return [{
        entry: './src/index.js',
        target: 'node',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.node.js',
            libraryTarget: 'commonjs2',
            library: 'rebillyjs'
        },
        module: {
            rules
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    }, {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js',
            libraryTarget: 'umd',
            library: 'rebillyjs'
        },
        module: {
            rules
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    }]
};
