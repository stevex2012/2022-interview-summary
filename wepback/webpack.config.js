const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin")
const webpack = require('webpack')

function resolve(dir){
  return path.join(__dirname, dir)
}


const smp = new SpeedMeasureWebpackPlugin();

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  },
  devtool: 'source-map',
  module: { 
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              work:3,
            }
          },
          {
            loader: 'babel-loader',
            // options: {
            //   presets: [
            //     '@babel/preset-env'
            //   ]
            // }
          }
        ]
      },
      {
        test: /\.css|less$/, //匹配所有的 css 文件
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', 
          'less-loader'] // use: 对应的 Loader 名称
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name][hash:8].[ext]'
        //     }
        //   }
        // ]
      },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: '[name][hash:8].[ext]',
      //         limit: 70*1024,
      //       }
      //     }
      //   ]
      // }
    ]
  },
  resolve: {
    // 别名
    alias: {
      '~': resolve('src'),
      '@': resolve('src'),
      'components': resolve('src/components'),
    },
    extensions: ['.js','.json','.wasm'],
    modules: [resolve('src'), 'node_modules']
  },
  plugins:[ // 配置插件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\locale$/,
      contextRegExp: /moment$/,
    })
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8980, // 端口号
    // open:true  // 是否自动打开浏览器
  },
}

module.exports = (env, argv) => {
  console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config;
  // https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
  // const a = smp.wrap(config);
  // console.log('a----a',a)
  // return a
}
