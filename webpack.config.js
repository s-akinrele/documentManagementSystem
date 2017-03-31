const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.join(__dirname, 'client/src'),
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(__dirname, 'client/public/')
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: ['node_modules', 'server', 'spec', 'dist'],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(woff|png|jpg|gif)$/,
      loader: 'url-loader?limit=250000'
    }],
  },
  devServer: {
    contentBase: 'client/public',
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
module.exports = config;
