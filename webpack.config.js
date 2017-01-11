const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const APP_PATH   = path.join(__dirname, 'app');
const BUILD_PATH = path.join(__dirname, 'build');

// 各環境共通の設定
var common = {
  entry: {
    app: path.join(APP_PATH, 'scripts')
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  output: {
    path: BUILD_PATH,
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: APP_PATH
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ["file-loader"],
        include: APP_PATH
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: APP_PATH
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(APP_PATH, 'index.html'),
      inject: true
    })
  ]
};

// 開発環境設定
// -------------
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      progress: true,
      stats: 'errors-only',
      contentBase: APP_PATH
    }
  });
}

// npm buildを実行した時の設定
if(TARGET === 'build') {
  module.exports = merge(common, {
  });
}
