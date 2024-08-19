import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import AppLayout from "@/layout/AppLayout.vue";
import ProductLayout from "@/layout/ProductLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import CategoryView from "@/views/CategoryView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

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
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoriteView.vue"),
      meta: {
        layout: ProductLayout,
      },
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("../views/ChatsView.vue"),
      meta: {
        layout: ProductLayout,
      },
    },
    {
      path: "/favorites1",
      name: "favorites1",
      component: () => import("../module/favorites/favorits1.vue"),
    },
    {
      path: "/:pathMatch(.*)*", // Yangi 404 yo'nalish
      name: "NotFound",
      component: NotFoundView,
      meta: {
        layout: NotFoundLayout,
      },
    },
  ],
});

export default router;
