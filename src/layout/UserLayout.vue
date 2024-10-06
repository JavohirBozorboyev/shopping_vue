<script setup>
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import UserNavigation from "@/components/Navbar/UserNavigation.vue";

const authStore = useAuthStore();
onBeforeMount(() => {
  if (!authStore.user) {
    router.push("/login");
  }
});
</script>

<template>
  <div class="container mx-auto mt-2">
    <div class="grid grid-cols-12">
      
      <div class="col-span-12 px-2 ">
        <RouterView />
      </div>
    </div>
  </div>
</template>
