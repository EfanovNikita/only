const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpack = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsWebpack(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    entry: {
        main: ['@babel/polyfill', path.resolve(__dirname, './src/index.js')],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'development',
    optimization: optimization(),
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Test',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.css$/,
                use: [{ loader: MiniCSSExtractPlugin.loader},
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    },
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    },
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.jsx'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
            react: path.join(__dirname, 'node_modules', 'react')
        }
    }
}