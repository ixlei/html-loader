const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        index: './index.js',
        //inde: './index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: "./dist/"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                        loader: path.resolve(__dirname, '../index.js')
                    }]
                    // use: [{
                    //     loader: 'html-loader',
                    //     options: {
                    //         minimize: true,
                    //         root: path.resolve(__dirname, './')
                    //     }
                    // }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html'
        })
    ]
}