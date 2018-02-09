module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }
      ]
    }
  }
};