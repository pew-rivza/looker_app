const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';
console.log("BUILD MODE: ", process.env.NODE_ENV);

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            { test: /\.txt$/i, use: 'raw-loader' },
            { test: /\.(png|jpe?g|gif|svg)$/i, use: 'file-loader' },
            { test: /\.(ttf|woff|woff2|eot)$/i, use: 'file-loader' },
            { test: /\.(sa|sc|c)ss$/i, use: [ {
                    loader: MiniCssExtractPlugin.loader,
                    options: {publicPath: ""}
                }, 'css-loader', 'sass-loader' ] },
            { test: /\.(js|ts)x?$/i, loader: 'babel-loader', exclude: /node_modules/ }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.png'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    mode: isDev ? 'development' : 'production',
    devServer: {
        port: 1234,
        open: true
    }
}