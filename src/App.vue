<script setup>
import { RouterView } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
import axios from "axios";
axios.defaults.baseURL = "https://tez-sotish-api.uz";
</script>

<template>
  <header>
    <AppNavigation />
  </header>

  <main class="pt-[55px]">
    <component :is="$route.meta.layout"> </component>
    <component v-if="!$route.meta.layout">
      <RouterView />
    </component>
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>
