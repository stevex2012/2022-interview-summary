const path = require('path')

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'aaa.js', // 输出文件名
    path: path.join(__dirname, 'distsss') // 输出文件目录
  },
}