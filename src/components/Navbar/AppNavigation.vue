<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Button from "primevue/button";
import { inject } from "vue";
const router = useRoute();
const auth = inject("auth");
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
          :class="router.path == '/favorites' ? 'bg-slate-950' : 'bg-gray-100'"
        >
          <i
            class="pi pi-heart p-[6px] rounded-[4px]"
            :class="
              router.path == '/favorites'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-gray-500'
            "
          ></i>
          <span
            class="text-sm uppercase hidden md:block"
            :class="
              router.path == '/favorites' ? 'text-white' : 'text-gray-500'
            "
            >favorites</span
          >
        </RouterLink>

        <RouterLink
          to="/chat"
          title="Profil"
          class="rounded-md p-1 flex items-center gap-2 md:pr-3 active:scale-95 duration-300"
          :class="router.path == '/chat' ? 'bg-slate-950' : 'bg-gray-100'"
        >
          <i
            class="pi pi-envelope p-[6px] rounded-[4px]"
            :class="
              router.path == '/chat'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-gray-500'
            "
          ></i>
          <span
            class="text-sm uppercase hidden md:block"
            :class="router.path == '/chat' ? 'text-white' : 'text-gray-500'"
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
        <RouterLink
          to="/profil"
          v-if="auth?.user && auth?.token"
          title="Profil"
          class="rounded-md p-1 flex items-center gap-2 md:pr-3 active:scale-95 duration-300 cursor-pointer select-none"
          :class="router.path == '/profil' ? 'bg-slate-950' : 'bg-gray-100'"
        >
          <i
            class="pi pi-user p-[6px] rounded-[4px]"
            :class="
              router.path == '/profil'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-gray-500'
            "
          ></i>
          <span
            class="text-sm uppercase hidden md:block"
            :class="router.path == '/profil' ? 'text-white' : 'text-gray-500'"
            >Profil</span
          >
        </RouterLink>
      </div>
    </div>
  </div>
</template>
