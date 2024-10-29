const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: { vk_elements: path.resolve(__dirname, "./src/index.js") },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !isProduction
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".ts", ".tsx", ".scss"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack & React",
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[contenthash].css' : '[name].css',
        }),
    ],
    devServer: {
        port: 3001,
        hot: true,
    },
    mode: isProduction ? 'production' : 'development',
};
