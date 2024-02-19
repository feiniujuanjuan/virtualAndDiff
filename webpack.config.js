const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 虚拟打包路径，而不是真正的文件夹，在8080端口下虚拟生成
    publicPath: 'xuni',
    filename: 'bundle.js',
  },
  devServer: {
    port: 8090,
    // 静态资源文件夹
    contentBase: 'www',
  }
};