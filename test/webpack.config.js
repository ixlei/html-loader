const path = require('path');

module.exports = {
    entry: {
        index: './example/index.html',
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
            }
        ]
    },
    plugins: [

    ]
}