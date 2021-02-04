const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
console.log("BUILD MODE: ", process.env.NODE_ENV);

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            { test: /\.txt$/i, use: 'raw-loader' },
            { test: /\.(png|jpe?g|gif|svg)$/i, use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/',
                        context: 'src/assets',
                        name: '[name].[ext]'
                    }
                }]},
            { test: /\.(ttf|woff|woff2|eot)$/i, use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets',
                        context: 'src/assets',
                        name: '[path][name].[ext]'
                    }
            } },
            { test: /\.(sa|sc|c)ss$/i, use: [ {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ""
                    }
                }, 'css-loader', 'sass-loader' ] },
            { test: /\.(js|ts)x?$/i, loader: 'babel-loader', exclude: /node_modules/ }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/' + filename('js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/' + filename('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public/manifest.json',
                    to: 'manifest.json'
                },
                {
                    from: './public/favicon.png',
                    to: 'favicon.png'
                }
            ]
        })
    ],
    mode: isDev ? 'development' : 'production',
    devServer: {
        port: 1234,
        open: true,
        contentBase: "dist"
    }
}