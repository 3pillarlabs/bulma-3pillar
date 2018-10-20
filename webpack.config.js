const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHdPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlaugin = require('mini-css-extract-plugin');

const docsPath = path.resolve(__dirname, 'docs')

module.exports = {
  entry: {
    default: './src/default/default.js',
    dark: './src/dark/dark.js'
  },
  output: {
    path: docsPath,
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlaugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin([ docsPath ], { verbose: true }),
    new MiniCssExtractPlaugin({
      filename: 'css/[name]/bulma-3pillar.min.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      theme: 'default',
      alwaysWriteToDisk: true,
      filename: 'default.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      theme: 'dark',
      alwaysWriteToDisk: true,
      filename: 'dark.html',
      inject: false
    }),
    new HtmlWebpackHdPlugin({
      outputPath: docsPath
    })
  ],
  devServer: {
    contentBase: docsPath
  }
};
