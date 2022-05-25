const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const isDev = process.env.NODE_ENV === 'development'
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
        // runtimeChunk: 'single',
    }
    if (!isDev) {
        config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]
    }
    return config
}

console.log(isDev)
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        another: './another.ts',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name].[ext]',
    },
    optimization: optimization(),
    // performance: {
    //     hints: false,
    //     maxEntrypointSize: 512000,
    //     maxAssetSize: 512000,
    // },
    devServer: {
        open: true,
        port: 3000,
        static: ['src'],
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: !isDev,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.jsx$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.tsx$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                    },
                },
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {},
            //         },
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        }
                    },
                    {
                        loader: 'postcss-loader', // postcss loader needed for tailwindcss
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [tailwindcss, autoprefixer],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[contenthash][ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[contenthash][ext][query]',
                },
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ],
    },
}
