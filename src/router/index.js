import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import AppLayout from "@/layout/AppLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import CategoryView from "@/views/CategoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/category/:slug",
      name: "category",
      component: CategoryView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoriteView.vue"),
    },
    {
      path: "/favorites1",
      name: "favorites1",
      component: () => import("../module/favorites/favorits1.vue"),
    },
  ],
});

export default router;
