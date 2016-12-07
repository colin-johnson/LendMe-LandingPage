var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

var buildDir = path.resolve(__dirname, 'public', 'js');
var appDir = path.resolve(__dirname, 'src');

module.exports = {

  devtool: 'eval',

  entry: [
    //'webpack-dev-server/client?http://localhost:3000',
    //'webpack/hot/only-dev-server',
    appDir + '/index.js'
  ],

  output: {
    path: buildDir,
    filename: 'bundle.js',
    publicPath: './public/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: appDir
      }
      // {
      //  test: /\.scss$/,
      //  loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
      // }
    ]
  },

  plugins: [
    //new webpack.HotModuleReplacementPlugin()
    //new ExtractTextPlugin('main.css', {
    //  allChunks: true
    //})
  ]
};
