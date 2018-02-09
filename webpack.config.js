const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const css = require('./webpack/css');
const font = require('./webpack/font');
const image = require('./webpack/image');
const extractCss = require('./webpack/css.extract');
const pug = require('./webpack/pug');
const devServer = require('./webpack/devserver');
const uglifyJs = require('./webpack/uglifyjs');

const PATHS = {
  sourse: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'build')
};

const common = merge([
  {
    entry: {
      app: PATHS.sourse + '/assets/js/app.js'
    },
    devtool: 'inline-source-map',
    plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        chunk: ['index', 'common'],
        template: PATHS.sourse + '/index.pug'
      }),
      new htmlWebpackPlugin({
        filename: '404.html',
        chunk: ['404', 'common'],
        template: PATHS.sourse + '/404.pug'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      })
    ],
    resolve: {
      extensions: [ '.js' ]
    },
    output: {
      filename: 'assets/js/[name].js',
      path: PATHS.build
    }
  },
  font(),
  image(),
  pug()
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      extractCss(),
      uglifyJs()
    ])
  }
  if (env === 'development') {
    return merge([
      common,
      css(),
      devServer()
    ])
  }
}