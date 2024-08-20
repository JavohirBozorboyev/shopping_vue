<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
import axios from "axios";
import AuthProvider from "./Provider/AuthProvider.vue";
const route = useRoute();
axios.defaults.baseURL = "https://tez-sotish-api.uz";
</script>

<template>
  <AuthProvider>
    <header>
      <AppNavigation />
    </header>

    <main class="pt-[55px]">
      <component :is="$route.meta.layout"> </component>
    </main>

    <footer>
      <AppFooter />
    </footer>
  </AuthProvider>
</template>
