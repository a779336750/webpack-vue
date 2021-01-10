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

// 自定义插件，用户监听webpack编译完成
class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', () => {
            console.log('compilation done!');
        });
    }
}

// 自定义插件，生成一个记录输出文件列表的txt文件
class recordFilesPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('recordFilesPlugin', (compilaton, cb) => {
            let content = '生成的文件列表：\n';
            Object.keys(compilaton.assets).forEach(fileName => {
                content += `${fileName}\n`;
            });
            compilaton.assets['fileList.txt'] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                },
            };
            cb();
        });
    }
}

module.exports = function (project) {
    return merge(
        common({ project }),
        {
            name: `${project}`,
            entry: {
                index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', `./src/${project}/index.ts`],
            },
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.(sass|scss)$/,
                        use: [
                            'css-hot-loader',
                            {
                                // 使用MiniCssExtractPlugin.loader替代style-loader
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    // 解决图片路径不对的问题
                                    publicPath: '../',
                                },
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                },
                            },
                              'resolve-url-loader',
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
                new DonePlugin(),
                new recordFilesPlugin(),
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
