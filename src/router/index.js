import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import AppLayout from "@/layout/AppLayout.vue";
import ProductLayout from "@/layout/ProductLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import CategoryView from "@/views/CategoryView.vue";
import ChatsLayout from "../views/ChatsView.vue"
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
      path: "/category/:slug/:id",
      name: "category-info",
      component: () => import("../views/CategoryIdView.vue"),
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
    // {
    //   path: "/chat/:slug",
    //   name: "ChatId",
    //   component: () => import("../module/messages/chat.vue"),
    //   meta: {
    //     layout: ChatsLayout,
    //   },
    // },
    {
      path: "/favorites1",
      name: "favorites1",
      component: () => import("../module/favorites/favorits1.vue"),
    },
  ],
});

export default router;
