var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
console.log('ddd')
compiler.run(function(d) {
    console.log(d)
})