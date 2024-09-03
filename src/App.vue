<script setup>
import { RouterView, useRoute } from "vue-router";
import AppNavigation from "./components/Navbar/AppNavigation.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
import axios from "axios";
import AuthProvider from "./Provider/AuthProvider.vue";
axios.defaults.baseURL = "https://tez-sotish-api.uz";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTM3ODAyNjAzIiwiaWF0IjoxNzI0Njg5NzQ1LCJleHAiOjE3MjUyOTQ1NDV9.6WdthRtIYQ-vHhjjt0NREw2EZCxk9lyABDoPMHgInz8`;
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
