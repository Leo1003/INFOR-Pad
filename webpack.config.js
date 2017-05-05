const webpack = require('webpack')

module.exports = {
    entry: [
    	'babel-polyfill',
        './src/client/index.jsx',
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','stage-0','react'],
                },
            }
        ],
    },
    devServer: {
        inline: true,
        port: 8080,
    },
    // plugins: [
    //         new webpack.optimize.UglifyJsPlugin({
    //                 compress: {
    //                         warnings: false
    //                 }
    //         })
    // ]
};
