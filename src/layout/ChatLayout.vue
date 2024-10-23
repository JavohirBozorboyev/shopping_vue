<script setup>
import { RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
onBeforeMount(() => {
  if (!authStore.user) {
    router.push("/login");
  }
});
</script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>
