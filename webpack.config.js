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
            {   
                // 生成的目标文件文件名 
                filename: 'home.html', 
                // 需要套用的（插入的模板文件），如果没有那么插件给自动生成一个html
                template: path.join(__dirname, 'src/index.html'),  
                inject: true,
        }
        )
    ]
}