// 引入html-webpack-plugin插件
const htmlWebpackPlugin = require('html-webpack-plugin');
// 引入path模块
const path = require('path');

module.exports = {
    // 入口
    entry: {
        index: './src/index.js'
    },
    // 出口
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js' 
    },
    // 插件
    plugins: [
        new htmlWebpackPlugin(
        //     {
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true,
        // }
        )
    ]
}