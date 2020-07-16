const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* const _vconf = require('../config/vconf');
   const WebSocket = require('ws');
   const socket = new WebSocket(`ws://localhost:${_vconf.WebsocketPort}/refresh`);

   // 自定义插件，用户监听webpack编译完成
   class DonePlugin {
       apply(compiler) {
           compiler.hooks.done.tap('DonePlugin', () => {
               socket.send(`compileDone`);
           });
       }
   } */

module.exports = function (project) {
    return merge(
        common({ project }),
        {
            name: `${project}`,
            entry: {
                index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', `./src/${project}/index.js`],
            },
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.(sass|scss)$/,
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    implementation: require('dart-sass'),
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                        ],
                    },
                ],
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                    chunkFilename: '[id].css',
                }),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ],
            output: {
                filename: '[name].[hash].js',
                publicPath: `/`,
                path: path.resolve(
                    __dirname,
                    `../dist/${project}/`,
                ),
            },
            mode: 'development',
        },
    );
};
