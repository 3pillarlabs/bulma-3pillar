const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHdPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlaugin = require('mini-css-extract-plugin');

const docsPath = path.resolve(__dirname, 'docs')

module.exports = {
  entry: './src/index.js',
  output: {
    path: docsPath,
    filename: 'js/bundle.js'
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
      filename: 'css/bulma-3pillar-default.min.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHdPlugin({
      outputPath: docsPath
    })
  ],
  devServer: {
    contentBase: docsPath
  }
};
