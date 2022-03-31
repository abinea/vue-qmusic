import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";

// 全局引入样式文件
import "@/assets/scss/index.scss";

const app = createApp(App);
app.use(router).use(store);

app.use(lazyPlugin, {
  loading: require("@/assets/images/default.png"),
});

app.mount("#app");
