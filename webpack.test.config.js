/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './test/all.tests.js',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_test'),
  },
  devServer: {
    contentBase: "./_test",
    port: 7700
  },
  module: {
    rules: [
      {
        test: require.resolve('angular'),
        loader: 'exports-loader?window.angular'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'test/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
};
