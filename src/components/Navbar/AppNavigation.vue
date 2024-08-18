<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="bg-white border-b fixed w-full top-0 z-[10000]">
    <div class="container mx-auto px-2 py-2 flex justify-between items-center">
      <div>
        <img
          src="../../../public/favicon.ico"
          alt=""
          class="w-10 h-10 object-cover"
        />
      </div>
      <div class="flex items-center gap-3">
        <RouterLink
          to="/favorites"
          title="Profil"
          class="bg-gray-100 rounded-md p-1 flex items-center gap-2 md:pr-2 active:scale-95 duration-300"
        >
          <i
            class="pi pi-heart p-[6px] bg-white rounded-[4px] text-slate-500"
          ></i>
          <span class="text-sm uppercase text-slate-500 hidden md:block"
            >favorites</span
          >
        </RouterLink>
        <RouterLink
          to="/"
          title="Profil"
          class="bg-gray-100 rounded-md p-1 flex items-center gap-2 md:pr-2 active:scale-95 duration-300"
        >
          <i
            class="pi pi-envelope p-[6px] bg-white rounded-[4px] text-slate-500"
          ></i>
          <span class="text-sm uppercase text-slate-500 hidden md:block"
            >SMS</span
          >
        </RouterLink>
        <RouterLink
          to="/"
          title="Profil"
          class="bg-gray-100 rounded-md p-1 flex items-center gap-2 md:pr-2 active:scale-95 duration-300"
        >
          <i
            class="pi pi-user p-[6px] bg-white rounded-[4px] text-slate-500"
          ></i>
          <span class="text-sm uppercase text-slate-500 hidden md:block"
            >Profil</span
          >
        </RouterLink>
      </div>
    </div>
  </div>
</template>
