const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            { test: /\.txt$/i, use: 'raw-loader' },
            { test: /\.(png|jpe?g|gif|svg)$/i, use: 'file-loader' },
            { test: /\.(ttf|woff|woff2|eot)$/i, use: 'file-loader' },
            { test: /\.css$/i, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.(js|ts)x?$/i, loader: "babel-loader", exclude: /node_modules/ }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.png"
        }),
        new CleanWebpackPlugin()
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        port: 1234,
        open: true
    }
}