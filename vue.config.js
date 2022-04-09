const { defineConfig } = require("@vue/cli-service")
const registerRouter = require("./backend/router")

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/variable.scss";
        @import "@/assets/scss/mixin.scss";
        `,
      },
    },
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined")
      }
      registerRouter(devServer.app)

      return middlewares
    },
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin =
        require("webpack-bundle-analyzer").BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false,
  // publicPath: process.env.NODE_ENV === "production" ? "/music-next" : "/",
})
