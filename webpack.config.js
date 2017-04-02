const path = require('path');
const webpack = require('webpack');

const config = {
  devtool: 'inline-source-map',
  context: path.join(__dirname, 'client/src'),
  entry: [
    'webpack-hot-middleware/client?reload=true', // note that it reloads
    // the page if hot module reloading fails.
    path.resolve(__dirname, 'client/src/index')
  ],
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
module.exports = config;
