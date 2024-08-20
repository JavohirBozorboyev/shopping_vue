<script setup>
import { useAuthStore } from "@/stores/auth";
import { provide } from "vue";
import axios from "axios";

const authStore = useAuthStore();

provide("auth", authStore);

</script>

<template>
  <slot />
</template>
