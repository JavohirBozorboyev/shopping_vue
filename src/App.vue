<script setup>
import { RouterView, useRoute } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
import axios from "axios";
import AuthProvider from "./Provider/AuthProvider.vue";
import BottomNavigation from "./components/Navbar/BottomNavigation.vue";
axios.defaults.baseURL = "http://45.138.158.149:9090";

const route = useRoute();
</script>

<template>
  <AuthProvider>
    <header>
      <AppNavigation />
    </header>

    <main class="pt-[55px] pb-4">
      <component :is="$route.meta.layout"> </component>
      <component v-if="!$route.meta.layout">
        <RouterView />
      </component>
    </main>

    <footer class="pb-14 sm:pb-0">
      <BottomNavigation />
      <AppFooter />
    </footer>
  </AuthProvider>
</template>
