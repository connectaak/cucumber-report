const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { NODE_ENV } = process.env;

module.exports = {
  // Other configurations here
  plugins: [
    // Other plugins here
    new MiniCssExtractPlugin({
      filename: NODE_ENV === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename: NODE_ENV === 'production' ? '[id].[hash].css' : '[id].css',
    }),
  ],
  module: {
    rules: [
      // Other rules here
      {
        test: /\.css$/,
        use: [
          NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
      },
      // Other rules here
    ],
  },
};