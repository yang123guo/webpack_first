/**
 * @file
 */
const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const url = require('url');
const publicPath = '';
module.exports = (options = {}) => ({
    entry: {
        vendor: './src/vendor',
        index: './src/main.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            'views': resolve(__dirname, 'src/views'),
            'com': resolve(__dirname, 'src/common'),
        },
        extensions: ['.js', '.vue', '.json', '.css']
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        proxy: {
            '/promotion/': {
                target: 'http://10.64.38.89:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/promotion/': '/promotion/'
                }
            },
            '/inner-api/': {
                target: 'http://yq01-dianshang-yinjian-02.epc.baidu.com:8092',
                changeOrigin: true,
                pathRewrite: {
                    '^/inner-api/': '/inner-api/'
                }
            },
            '/marketing-oa-web/': {
                target: 'http://10.64.26.176:8082',
                changeOrigin: true,
                pathRewrite: {
                    '^/marketing-oa-web/': '/marketing-oa-web/'
                }
            },
            '/freight/': {
                target: 'http://10.64.70.26:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/freight/': '/freight/'
                }
            },
            '/duCodeBatch/': {
                target: 'http://10.64.29.145:8083',
                changeOrigin: true,
                pathRewrite: {
                    '^/duCodeBatch/': '/duCodeBatch/'
                }
            },
            '/luckdraw/': {
                target: 'http://10.64.74.14:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/luckdraw/': '/luckdraw/'
                }
            },
            '/coupon/': {
                target: 'http://10.64.38.89:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/coupon/': '/coupon/'
                }
            }
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
});
