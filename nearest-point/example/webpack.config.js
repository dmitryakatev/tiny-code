'use strict';

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  mode: env.NODE_ENV === DEVELOPMENT ? DEVELOPMENT : PRODUCTION,

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  entry: {
    app: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: './app.js',
    path: path.resolve(__dirname, './dist'),
  },

  resolve: {
    extensions: ['.js'],
  },

  // watch: env.NODE_ENV === DEVELOPMENT,
  devtool: env.NODE_ENV === PRODUCTION ? false : 'source-map',

  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin(),
  ],
});
