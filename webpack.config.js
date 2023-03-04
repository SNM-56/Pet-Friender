const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: 'development',
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'frontend', 'src', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg)$/i,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: { limit: false }
      }
    ]
  },
  devServer: {
    port: 3000
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser')
    },
    extensions: ['.js', '.jsx', '.json']
  }
};
