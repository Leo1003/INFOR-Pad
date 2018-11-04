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
                loader: 'babel-loader'
            }
        ],
    },
    devServer: {
        color: true,
        inline: true,
        port: 8080,
    },
    devtool: 'source-map'
};
