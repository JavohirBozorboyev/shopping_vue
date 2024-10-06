<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const items = ref([
  { route: "/", label: "Home", icon: "pi pi-home" },
  { route: "/favorites", label: "Favorite", icon: "pi pi-heart" },
  { route: "/chat", label: "Products", icon: "pi pi-envelope" },
  { route: "/profil/product", label: "CMS", icon: "pi pi-list" },
]);
const route = useRoute();
</script>

<template>
  <div
    class="fixed bottom-0 w-full flex justify-center bg-white sm:hidden border-t"
  >
    <div class="grid grid-cols-4 w-full py-2">
      <RouterLink
        class="flex justify-center items-center"
        v-for="tab in items"
        :key="tab.label"
        :to="tab.route"
        :class="route.path == tab.route ? 'text-slate-950' : 'text-slate-400'"
      >
        <i
          class="text-xl block p-2"
          style="font-size: 1.2rem"
          :class="tab.icon"
        />
        <!-- <span>{{ tab.label }}</span> -->
      </RouterLink>
    </div>
  </div>
</template>
