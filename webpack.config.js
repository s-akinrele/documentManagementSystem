const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.join(__dirname, 'client/app'),
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(__dirname, 'client/dist')
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: ['node_modules', 'server', 'spec', 'dist'],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }],
  },
};
module.exports = config;
