const webpack = require('webpack')

module.exports = {
    entry: [
    	'@babel/polyfill',
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
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            }
        ],
    },
    devServer: {
        inline: true,
        port: 8080,
    },
    devtool: 'source-map',
    // plugins: [
    //         new webpack.optimize.UglifyJsPlugin({
    //                 compress: {
    //                         warnings: false
    //                 }
    //         })
    // ]
};
