const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const hotMiddlewareScript = 'webpack-hot-middleware/client';

module.exports = function (config) {
    const { project } = config;

    return {
        entry: {
            index: [`./src/${project}/index.js`, hotMiddlewareScript],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'happypack/loader?id=babel',
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: 'happypack/loader?id=url',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]',
                            outputPath: 'font/',
                        },
                    },
                },

                {
                    test: /\.(csv|tsv)$/,
                    use: ['csv-loader'],
                },
                {
                    test: /\.xml$/,
                    use: ['xml-loader'],
                },
            ],
        },
        plugins: [
            // 请确保引入这个插件！
            new VueLoaderPlugin(),
            new HappyPack({
                id: 'babel',
                loaders: [
                    {
                        path: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        },
                    },
                ],
                // 共享进程池
                threadPool: happyThreadPool,
            }),
            new HappyPack({
                id: 'url',
                loaders: [
                    {
                        path: 'url-loader',
                        options: {
                            limit: 1000,
                            outputPath: 'images/',
                            fallback: 'file-loader',
                        },
                    },
                ],
                // 共享进程池
                threadPool: happyThreadPool,
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Production',
                template: `./src/${project}/index.html`,
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(
                __dirname,
                `../dist/${project}/`,
            ),
        },
    };
};
