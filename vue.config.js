module.exports = {
  lintOnSave: false,
  devServer: {
    // 环境配置
    host: '0.0.0.0',
    // host: "192.168.0.118",
    hot: false,
    port: 8080,
    https: true,
    hotOnly: false,
    open: false, //配置自动启动浏览器
    disableHostCheck: true ,//外网映射
    proxy: {
      // 配置多个代理(配置一个 proxy: "http://localhost:4000" )
      "/api": {
        target: "http://a.com/api",
        changeOrigin: true, 
        pathRewrite: {
          "^/api": "/"
        }
      }

    }
  },
}