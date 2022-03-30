import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/recommend" },
  {
    name: "推荐",
    path: "/recommend",
    component: () => import("@/views/recommend.vue"),
  },
  {
    name: "歌手",
    path: "/singer",
    component: () => import("@/views/singer.vue"),
  },
  {
    name: "排行",
    path: "/top-list",
    component: () => import("@/views/top-list.vue"),
  },
  {
    name: "搜索",
    path: "/search",
    component: () => import("@/views/search.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
