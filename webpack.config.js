// 引入html-webpack-plugin插件
const htmlWebpackPlugin = require('html-webpack-plugin');
// css分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// css压缩文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// js压缩混淆 这里配合css使用
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 引入path模块
const path = require('path');


module.exports = (env, argv) => {
    // 环境变量属性 NODE_ENV
const devMode = env.mode !== 'production';
console.log('当前环境是开发环境吗？：', devMode ,  'env.mode是什么？：', env.mode, '入参', argv);

    return {
        // 入口
        entry: {
            index: './src/index.js'
        },
        // 出口
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js' 
        },
        devtool: devMode ? 'cheap-module-eval-source-map' : '#source-map',
        // loader解析器
        module: {
            rules: [

                /* 
                * 这里只是对css自己编译 
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    // 对MiniCssExtractPlugin的配置项
                                    publicPath: '../'
                                }
                            },
                            "css-loader"
                        ]
                    }, 
                */

                {
                    test: /\.(le|c)ss$/,
                    use: [
                        // 开发环境以style标签引入,生产环境以link的形式引入
                        // 说明了style-loader是做开发插入style标签的
                        // mini-css-extract-plugin用于production中
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ],
                }
            ]
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
            // 
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            // 删除文件 保留新文件
            new CleanWebpackPlugin(['dist'])
        ],

        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    // cache: true,
                    // parallel: true,
                    // sourcMap: true
                }),
                new OptimizeCSSAssetsPlugin({
                    
                }),
            ],
        }
    };
   
}