<script setup>
import { useAuthStore } from "@/stores/auth";
import { provide } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const authStore = useAuthStore();

if (Cookies.get("authToken")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "authToken"
  )}`;
}

provide("auth", authStore);
</script>

<template>
  <slot />
</template>
