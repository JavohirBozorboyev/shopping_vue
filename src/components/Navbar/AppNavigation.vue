<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";

import { inject } from "vue";
const router = useRouter();
const route = useRoute();
const auth = inject("auth");

const { user, token } = auth;
console.log(user);
const menu = ref();
const items = ref([
  {
    label: "Profile Links",
    items: [
      {
        label: "Profil page",
        icon: "pi pi-user",
        fun: () => {
          router.push("/profil");
        },
      },
      {
        label: "Settings",
        icon: "pi pi-cog",
        fun: () => {},
      },

      {
        label: "Logout",
        icon: "pi pi-sign-out",
        fun: () => {
          auth.logout();
          router.go();
        },
      },
    ],
  },
  {
    separator: true,
  },
]);
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="bg-white border-b fixed w-full top-0 z-[10000]">
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
            class="text-sm uppercase hidden md:block"
            :class="route.path == '/favorites' ? 'text-white' : 'text-gray-500'"
            >favorites</span
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
            class="text-sm uppercase hidden md:block"
            :class="route.path == '/chat' ? 'text-white' : 'text-gray-500'"
            >SMS</span
          >
        </RouterLink>
        <RouterLink v-if="!auth?.user || !auth?.token" to="/login">
          <Button
            icon="pi pi-sign-in"
            label="Login"
            size="small"
            severity="secondary"
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
            class="text-sm uppercase hidden md:block"
            :class="route.path == '/profil' ? 'text-white' : 'text-gray-500'"
            >Profil</span
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
          class="flex items-center p-2 gap-2 cursor-pointer"
          @click="
            () => {
              if (item.fun) {
                item.fun();
              }
            }
          "
        >
          <span :class="item.icon" />
          <span class="text-sm text-slate-700">{{ item.label }}</span>
        </div>
      </template>
      <template #end>
        <button
          class="relative overflow-hidden w-full border-0 bg-transparent flex p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200 items-center"
        >
          <Avatar :image="user?.attach.originFile" class="mr-2" />
          <span class="inline-flex flex-col items-start">
            <span class="font-semibold text-sm">{{ user?.firstname }}</span>
            <span class="text-xs">{{ user?.lastname }}</span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>
