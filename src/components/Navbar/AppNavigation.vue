<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import Menu from "primevue/menu";

import { inject } from "vue";
import UserNavigation from "./UserNavigation.vue";

const router = useRouter();
const route = useRoute();
const auth = inject("auth");

const { user } = auth;
const menu = ref();
const childRef = ref(null);
const items = ref([
  {
    label: "Профиле Линкс",
    items: [
      {
        label: "Элонларим",
        icon: "pi pi-bars",
        fun: () => {
          router.push("/profil/product");
        },
      },
      {
        label: "Элон қўшиш",
        icon: "pi pi-plus",
        fun: () => {
          router.push("/profil/product/add");
        },
      },
      {
        separator: true,
      },
      {
        label: "Профил",
        icon: "pi pi-user",
        fun: () => {
          if (childRef.value) {
            childRef.value.visible = true;
          }
        },
      },
      {
        label: "Тизимдан чиқиш",
        icon: "pi pi-sign-out",
        color: "red",
        fun: () => {
          auth.logout();
          router.go();
        },
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="bg-white border-b fixed w-full top-0 z-50">
    <div class="container mx-auto px-2 py-2 flex justify-between items-center">
      <div class="flex items-center">
        <RouterLink to="/">
          <i class="pi pi-crown text-black" style="font-size: 2rem"></i>
        </RouterLink>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink
          to="/favorites"
          title="Profil"
          class="rounded-md p-1 flex items-center gap-2 md:pr-3 active:scale-95 duration-300"
          :class="route.path == '/favorites' ? 'bg-slate-950' : 'bg-gray-100'"
        >
          <i
            class="pi pi-heart p-[6px] rounded-[4px]"
            :class="
              route.path == '/favorites'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-gray-500'
            "
          ></i>
          <span
            class="text-sm capitalize hidden md:block"
            :class="route.path == '/favorites' ? 'text-white' : 'text-gray-500'"
            >Севимли</span
          >
        </RouterLink>

        <RouterLink
          to="/chat"
          title="Profil"
          class="rounded-md p-1 flex items-center gap-2 md:pr-3 active:scale-95 duration-300"
          :class="route.path == '/chat' ? 'bg-slate-950' : 'bg-gray-100'"
        >
          <i
            class="pi pi-envelope p-[6px] rounded-[4px]"
            :class="
              route.path == '/chat'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-gray-500'
            "
          ></i>
          <span
            class="text-sm capitalize hidden md:block"
            :class="route.path == '/chat' ? 'text-white' : 'text-gray-500'"
            >СМС</span
          >
        </RouterLink>
        <RouterLink v-if="!auth?.user || !auth?.token" to="/login">
          <Button
            icon="pi pi-sign-in"
            label="Тизимга Кириш"
            size="small"
            severity="contrast"
        /></RouterLink>
        <div
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          v-if="auth?.user && auth?.token"
          title="Profil"
          class="rounded-md p-1 flex items-center gap-2 md:pr-3 active:scale-95 duration-300 cursor-pointer select-none"
          :class="route.path == '/profil' ? 'bg-slate-950' : 'bg-gray-100'"
        >
          <i
            class="pi pi-user p-[6px] rounded-[4px]"
            :class="
              route.path == '/profil'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-gray-500'
            "
          ></i>
          <span
            class="text-sm capitalize hidden md:block"
            :class="route.path == '/profil' ? 'text-white' : 'text-gray-500'"
            >Профил</span
          >
        </div>
      </div>
    </div>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #submenulabel="{ item }">
        <span class="text-slate-800 font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item }">
        <div
          class="flex items-center p-2 gap-2 cursor-pointer text-slate-700"
          :class="item?.color ? `text-${item?.color}-400 text-red-500` : ''"
          @click="
            () => {
              if (item.fun) {
                item.fun();
              }
            }
          "
        >
          <span :class="item.icon" />
          <span class="text-sm">{{ item.label }}</span>
        </div>
      </template>
    </Menu>
    <UserNavigation ref="childRef" />
  </div>
</template>
