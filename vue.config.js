const path = require('path')
let remoteHost = false
// 需要代理的ip或域名
let proxy = {}
function fullPath(dir) {
  return path.join(__dirname, dir)
}
// remoteHost = '15.2.42.218' // 李艳娇
// remoteHost = '127.0.0.1'
// remoteHost = '15.2.27.13'
if (remoteHost) {
  proxy = {}
  const headers = {}
  headers.Route = remoteHost
  // eslint-disable-next-line eqeqeq
  proxy['^/opcenter-oms'] = {
    target: `http://${remoteHost}:8082`,
    changeOrigin: true,
    headers
  }
} else {
  proxy['^/opcenter-oms'] = {
    target: 'http://127.0.0.1:4355',
    changeOrigin: true,
    headers: {
      Route: remoteHost
    },
    pathRewrite: {
      '^/opcenter-oms': ''
    }
  }
}
console.log(proxy)
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/opcenter-oms', // 设置基本的URL    会自动添加上来
  lintOnSave: true, // 每次保存lint代码
  assetsDir: 'assets',
  productionSourceMap: false, // 生产环境开启 source map
  chainWebpack: config => {
    config.resolve.alias
      .set('@', fullPath('src'))
      .set('@assets', fullPath('src/assets'))
      .set('@api', fullPath('src/api'))
      .set('@config', fullPath('src/config'))
      .set('@plugins', fullPath('src/plugins'))
      .set('@com', fullPath('src/components'))
      .set('@router', fullPath('src/router'))
      .set('@store', fullPath('src/store'))
      .set('@utils', fullPath('src/utils'))
      .set('@enum', fullPath('src/enum'))
      .set('@mixin', fullPath('src/mixin'))
      .set('@views', fullPath('src/views'))
      .set('@tool', fullPath('src/tool'))
  },
  css: {
    sourceMap: true // 开启css source map
  },
  devServer: {
    proxy: proxy,
    open: true,
    // openPage: remoteHost ? 'login.html' : 'index.html'
    openPage: 'index.html'
  }
}
