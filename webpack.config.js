const webpack = require('webpack')

module.exports = {
    entry: [
        './src//client/index.jsx',
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                },
            }
        ],
    },
    devServer: {
        inline: true,
        port: 8080,
    },
};
