const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // exclude: /node_modules/,
        // exclude: /(node_modules|bower_components)/, 
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-react'],
            // "plugins": ["@babel/plugin-transform-react-jsx-compat"]
          }
        }
      }
    ]
  },


  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },

  mode: 'development',
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './public/index.html'),

  })],
}