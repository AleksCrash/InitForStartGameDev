const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.css?$/,
          use: ExtractTextPlugin.extract({
            publicPath: '../../',
            fallback: 'style-loader',
            use: 'css-loader',
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('./assets/css/[name].css'),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
    ]
  }
};