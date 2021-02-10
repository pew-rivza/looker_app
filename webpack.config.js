const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
console.log("BUILD MODE: ", process.env.NODE_ENV);

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const fileLoaderOptions = {
    outputPath: 'static/assets',
    context: 'src/assets',
    publicPath: "/static/assets",
    name: `[path]${filename('[ext]')}`
};

const jsLoaders = () => {
    const loaders = ['babel-loader'];

    if (isDev) {
        loaders.push({
            loader: 'eslint-loader',
            options: {
                fix: true
            }
        });
    }

    return loaders;
};

let config = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    module: {
        rules: [
            { test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|eot)$/i, use: [{
                    loader: 'file-loader',
                    options: fileLoaderOptions
                }]},
            { test: /\.(sa|sc|c)ss$/i, use: [ {
                    loader: MiniCssExtractPlugin.loader,
                    options: { publicPath: "" }
                }, 'css-loader', 'sass-loader' ] },
            { test: /\.(js|ts)x?$/i,
                exclude: /node_modules/,
                use: jsLoaders()
            }
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
            template: './public/index.html',
            favicon: './public/favicon.png'
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
                }
            ]
        })
    ],
    mode: isDev ? 'development' : 'production',
    devServer: {
        port: 1234,
        open: true
    }
};

if (isDev) config.devtool = 'source-map';

module.exports = config;