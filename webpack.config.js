var webpack = require('webpack');
var path = require('path');

module.exports = (env = {}) => {
    console.warn(env);
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'rebilly-js-sdk.js',
            library: 'rebilly-js-sdk',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [{test: /\.js$/, use: 'babel-loader'}]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    except: ['Collection', 'Member'],
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false,
                sourceMap: true
            })
        ],
        devtool: 'source-map',
    };
};
