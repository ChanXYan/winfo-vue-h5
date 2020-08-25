
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  devServer: {
    proxy: {
      '/api': {
        target: "https://m.winfo.pub/sz/",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
