<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const items = ref([
  { route: "/", label: "Асосий", icon: "pi pi-home" },
  { route: "/favorites", label: "Севимлилар", icon: "pi pi-heart" },
  { route: "/chat", label: "CМС", icon: "pi pi-envelope" },
  { route: "/profil/product", label: "Элонларим", icon: "pi pi-list" },
]);
const route = useRoute();
</script>

<template>
  <div
    class="fixed z-50 bottom-0 w-full flex justify-center bg-white sm:hidden border-t"
  >
    <div class="grid grid-cols-4 w-full py-1">
      <RouterLink
        class="flex justify-center items-center flex-col uppercase"
        v-for="tab in items"
        :key="tab.route"
        :to="tab.route"
        :class="route.path == tab.route ? 'text-slate-950' : 'text-slate-400'"
      >
        <i
          class="text-xl block p-2 font-bold"
          style="font-size: 1.2rem"
          :class="tab.icon"
        />
        <span class="text-[10px] font-[500]">{{ tab.label }}</span>
      </RouterLink>
    </div>
  </div>
</template>
