import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import lazyPlugin from "vue3-lazy"
import loadingDirective from "@/components/base/loading/directive"
import noResultDirective from "@/components/base/no-result/directive"

// 全局引入样式文件
import "@/assets/scss/index.scss"

const app = createApp(App)
app.use(router).use(store)
app
  .use(lazyPlugin, {
    loading: require("@/assets/images/default.png"),
  })
  .directive("loading", loadingDirective)
  .directive("no-result", noResultDirective)

app.mount("#app")
