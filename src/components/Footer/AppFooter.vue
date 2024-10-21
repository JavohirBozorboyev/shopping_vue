<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const links = ref([
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Telegram", href: "/" },
  { name: "Youtube", href: "/" },
]);
</script>

<template>
  <div class="bg-slate-950 pt-5 hidden sm:block">
    <div
      class="container px-2 mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-5"
    >
      <div class="flex items-center justify-center sm:justify-start">
        <RouterLink to="/">
          <i class="pi pi-crown text-white" style="font-size: 2rem"></i>
        </RouterLink>
      </div>
      <div class="flex gap-5 justify-end">
        <a
          v-for="item in links"
          :href="item.href"
          title="Profil"
          target="_blank"
          class="text-gray-300 text-sm md:text-base"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class="border-t mt-5 p-5">
      <RouterLink
        to="/"
        title="Profil"
        class="text-white text-sm md:text-base uppercase flex items-center justify-center font-medium"
      >
        Tezsotish.uz
      </RouterLink>
    </div>
  </div>
</template>
