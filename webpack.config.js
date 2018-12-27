// 引入html-webpack-plugin插件
const htmlWebpackPlugin = require('html-webpack-plugin');
// css分离
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        new htmlWebpackPlugin({   
                title: '我要改title，听到没',
                // 生成的目标文件文件名 
                filename: 'home.html', 
                // 需要套用的（插入的模板文件），如果没有那么插件给自动生成一个html
                template: path.join(__dirname, 'src/index.html'),  
                
                // 上述结果会使得 html文件从src下的index.html获取，然后放到dist文件夹中
                // 并命名为home.html


                // true和body都是插入到 body 底部 
                inject: true,  
                // 加入hash随机数
                hash: true,

                // 压缩 
                minify: {
                    // 去掉所有空格
                    collapseWhitespace: true,
                    // 移除属性的引号
                    removeAttributeQuotes: true 
                },

                // 给被插入的html中就插入一个 link 标签  
                favicon: './assets/images/favicon.png'
        }),
        // css分离
        // new ExtractTextPlugin('style.css'),
        // 删除文件 保留新文件
        new CleanWebpackPlugin(['dist'])
    ]
}