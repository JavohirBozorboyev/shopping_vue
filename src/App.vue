<script setup>
import { RouterView, useRoute } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
import axios from "axios";
import AuthProvider from "./Provider/AuthProvider.vue";
axios.defaults.baseURL = "https://tez-sotish-api.uz";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTkzOTEyNTIyIiwiaWF0IjoxNzI0MzExNDk2LCJleHAiOjE3MjQ5MTYyOTZ9.hNh3o8QMVEu8fCjklBc2sqylKDvwEQ3u2Je1WsA-HwI`;
const route = useRoute();
</script>

<template>
  <AuthProvider>
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
  </AuthProvider>
</template>
