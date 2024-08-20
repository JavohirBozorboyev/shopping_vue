<script setup>
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
onBeforeMount(() => {
  if (!authStore.user) {
    router.push("/login");
  }
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
