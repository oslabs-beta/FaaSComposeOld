const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: './client/index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contentHash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        // test: /\.scss$/,
        test: /\.css$/,

        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // "sass-loader"
        ],
      },
    ],
  },
});
