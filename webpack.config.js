const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './src/index.js',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  // resolve: {
  //   extensions: ['.js'],
  // },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
