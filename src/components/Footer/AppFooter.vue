<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const links = ref([
  { name: "Main Page", href: "/" },
  { name: "favorite", href: "/favorite" },
  { name: "SMS", href: "/sms" },
  { name: "Profil", href: "/profil" },
]);
const developers = ref([
  { name: "Frontend", href: "/" },
  { name: "Backend", href: "/" },
]);
</script>

<template>
  <div class="bg-gray-50 pt-5 border-t">
    <div class="container px-2 mx-auto grid grid-cols-12 items-center gap-5">
      <div class="col-span-12 sm:col-span-4 md:col-span-3">
        <img
          src="../../../public/favicon.ico"
          alt=""
          class="w-10 h-10 object-cover"
        />
      </div>
      <div
        class="col-span-12 sm:col-span-6 md:col-span-6 flex gap-3 lg:justify-center"
      >
        <RouterLink
          v-for="item in links"
          :to="item.href"
          title="Profil"
          class="text-slate-500 text-sm md:text-base capitalize"
        >
          {{ item.name }}
        </RouterLink>
      </div>
      <div class="col-span-12 sm:col-span-2 md:col-span-3 flex gap-3 md:justify-end">
        <RouterLink
          v-for="item in developers"
          :to="item.href"
          title="Profil"
          class="text-slate-500 text-sm md:text-base capitalize flex items-center justify-center"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
    <div class="border-t mt-5 p-5">
      <RouterLink
        to="/"
        title="Profil"
        class="text-emerald-500 text-sm md:text-base uppercase flex items-center justify-center font-medium"
      >
        Tezsotish.uz
      </RouterLink>
    </div>
  </div>
</template>
