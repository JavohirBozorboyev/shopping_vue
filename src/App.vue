<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
</script>

<template>
  <header>
    <AppNavigation />
  </header>

  <main class="pt-[65px] pb-5">
    <RouterView />
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>
