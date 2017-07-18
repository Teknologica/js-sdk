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


// module.exports = [
//     "cheap-eval-source-map",
//     "cheap-module-eval-source-map",
//     "cheap-module-source-map",
//     "cheap-source-map",
//     "eval",
//     "eval-source-map",
//     "hidden-source-map",
//     "inline-source-map",
//     "nosources-source-map",
//     "source-map",
// ].map(devtool => ({
//     entry: './src/index.js',
//     module: {
//         rules: [{test: /\.js$/, use: 'babel-loader'}]
//     },
//     output: {
//         path: path.join(__dirname, "js"),
//         filename: `./[name]-${devtool}.js`,
//     },
//     devtool,
//     plugins: [
//         new webpack.optimize.CommonsChunkPlugin(["manifest"]),
//     ],
// }));
