const webpack = require('webpack');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    // modules: [
    //   path.join(__dirname, '../../../../node_modules/')
    // ],
    extensions: [
      '.js',
      '.jsx',
    ],
  },
};

module.exports = config;
