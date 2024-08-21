import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppLayout from "@/layout/AppLayout.vue";
import ProductLayout from "@/layout/ProductLayout.vue";
import CategoryView from "@/views/CategoryView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NotFoundLayout from "@/layout/NotFoundLayout.vue";
import FavoriteView from "@/views/FavoriteView.vue";
import CategoryIdView from "@/views/CategoryIdView.vue";
import ChatsView from "../views/ChatsView.vue";
import LoginView from "@/views/LoginView.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import UserProfilView from "@/views/UserProfilView.vue";
import UserLayout from "@/layout/UserLayout.vue";
import CategoryIdLayout from "@/layout/CategoryIdLayout.vue";
import ChatLayoutVue from "@/layout/ChatLayout.vue";

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
      name: "category-id",
      component: CategoryIdView,
      meta: {
        layout: CategoryIdLayout,
      },
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoriteView,
      meta: {
        layout: ProductLayout,
      },
    },
    {
      path: "/chat",
      name: "Chat",
      component: ChatsView,
      meta: {
        layout: ChatLayoutVue,
      },
    },
    {
      path: "/profil",
      name: "user",
      component: UserProfilView,
      meta: {
        layout: UserLayout,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        layout: LoginLayout,
      },
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
