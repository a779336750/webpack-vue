const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const info = process.argv.filter(element => (/--param=/).test(element))[0];
const target = info.split('=')[1];
const buildArr = target.split(',');
const smp = new SpeedMeasurePlugin();
class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', () => {
            console.log('你');
        });
    }
}

module.exports = function () {
    return smp.wrap(merge(
        common({ project: buildArr[0] }),
        {
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.(sass|scss)$/,
                        use: [
                            {
                                loader: 'style-loader',
                            },
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
                            {
                                loader: 'postcss-loader',
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
                new DonePlugin(),
            ],
            output: {
                filename: '[name].[chunkhash].js',
                path: path.resolve(
                    __dirname,
                    `../build/${buildArr[0]}/`,
                ),
            },
            mode: 'production',
        },
    ));
};
