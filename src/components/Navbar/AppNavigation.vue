<script setup>
import { RouterLink, useRoute } from "vue-router";
const router = useRoute();
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
          class="bg-gray-100 rounded-md p-1 flex items-center gap-2 md:pr-2 active:scale-95 duration-300"
          :class="router.path == '/favorites' ? 'bg-black' : null"
        >
          <i
            class="pi pi-heart p-[6px] bg-white rounded-[4px] text-gray-500"
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
          class="bg-gray-100 rounded-md p-1 flex items-center gap-2 md:pr-2 active:scale-95 duration-300"
          :class="router.path == '/chat' ? 'bg-black' : null"
        >
          <i
            class="pi pi-envelope p-[6px] bg-white rounded-[4px] text-gray-500"
          ></i>
          <span
            class="text-sm uppercase hidden md:block"
            :class="router.path == '/chat' ? 'text-white' : 'text-gray-500'"
            >SMS</span
          >
        </RouterLink>
        <RouterLink
          to="/profil"
          title="Profil"
          class="bg-gray-100 rounded-md p-1 flex items-center gap-2 md:pr-2 active:scale-95 duration-300"
          :class="router.path == '/profil' ? 'bg-black' : null"
        >
          <i
            class="pi pi-user p-[6px] bg-white rounded-[4px] text-gray-500"
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
