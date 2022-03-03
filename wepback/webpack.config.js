const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin")
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const PureCss = require('purgecss-webpack-plugin')
const glob = require('glob')
const { NONAME } = require('dns')


function resolve(dir){
  return path.join(__dirname, dir)
}
const PATHS = {
  src: resolve('src')
}

// const smp = new SpeedMeasureWebpackPlugin();

// console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
  entry: './src/index.js', // 打包入口地址
  // entry: './src/entry.js', // 打包入口地址
  output: {
    filename: 'aaa.js', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  },
  // devtool: false,//'source-map',
  // cache: {
  //   type: 'filesystem'
  // },
  module: { 
    rules: [
      {
        test: /\.js/,
        // exclude: /node_modules/,
        use:{
          loader:"babel-loader",
        }
        // use: [
        //   // {
        //   //   loader: 'thread-loader',
        //   //   options: {
        //   //     work:3,
        //   //   }
        //   // },
        //   {
        //     loader: 'babel-loader',
        //     // options: {
        //     //   cacheDirectory: true,
        //     // }
        //     // options: {
        //     //   presets: [
        //     //     '@babel/preset-env'
        //     //   ]
        //     // }
        //   }
        // ]
      },
      {
        test: /\.css|less$/, //匹配所有的 css 文件
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'cache-loader',
          'css-loader',
          'postcss-loader', 
          'less-loader'], // use: 对应的 Loader 名称
          sideEffects: true,
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
      },
    ]
  },
  // optimization: {
  //   minimize: true,
  //   sideEffects: true,
  //   usedExports: true,
  // },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     // new TerserPlugin({
  //     //   // parallel: true,
  //     //   terserOptions: {
  //     //     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  //     //   },
  //     // }),
  //     // new OptCssAssetsPlugin({}),//压缩css
  //     // new TerserPlugin({}),//压缩js
  //   ],
  //   // sideEffects: true,
  //   // usedExports: true,
  // },
  mode: 'none',
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
    }),
    new PureCss({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
    }),
    
  //   new BundleAnalyzerPlugin({
  //     // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
  //     // generateStatsFile: true, // 是否生成stats.json文件
  //  })
   
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8980, // 端口号
    // open:true  // 是否自动打开浏览器
  },
}

module.exports = config;

// module.exports = (env, argv) => {
//   // console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
//   // 这里可以通过不同的模式修改 config 配置
//   return config;
//   // https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
//   // const a = smp.wrap(config);
//   // console.log('a----a',a)
//   // return a
// }
