<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";

const route = useRoute();
</script>

<template>
  <header>
    <AppNavigation />
  </header>

  <main class="pt-[55px] pb-5">
    <component :is="$route.meta.layout"> </component>
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>
