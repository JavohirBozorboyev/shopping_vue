<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const links = ref([
  { name: "Main page", href: "/" },
  { name: "Favorite", href: "/favorites" },
]);
const developers = ref([
  { name: "Frontend", href: "/" },
  { name: "Backend", href: "/" },
]);
</script>

<template>
  <div class="bg-slate-950 pt-5">
    <div class="container px-2 mx-auto grid grid-cols-12 items-center gap-5">
      <div
        class="col-span-12 sm:col-span-4 md:col-span-3 flex items-center justify-center sm:justify-start"
      >
        <RouterLink to="/">
          <i class="pi pi-crown text-white" style="font-size: 2rem"></i>
        </RouterLink>
      </div>
      <div
        class="col-span-12 sm:col-span-6 md:col-span-6 flex gap-5 justify-center"
      >
        <RouterLink
          v-for="item in links"
          :to="item.href"
          title="Profil"
          class="text-gray-300 text-sm md:text-base"
        >
          {{ item.name }}
        </RouterLink>
      </div>
      <div
        class="col-span-12 sm:col-span-2 md:col-span-3 flex gap-5 justify-center md:justify-end"
      >
        <RouterLink
          v-for="item in developers"
          :to="item.href"
          title="Profil"
          class="text-gray-300 text-sm md:text-base flex items-center justify-center"
        >
          {{ item.name }}
        </RouterLink>
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
