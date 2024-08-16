<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
</script>

<template>
  <header>
    <AppNavigation />
  </header>

  <main class="bg-gray-100 min-h-screen pt-[60px]">
    <RouterView />
  </main>

  <footer></footer>
</template>
