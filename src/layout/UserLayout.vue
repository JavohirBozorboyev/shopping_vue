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
      <div
        class="hidden md:block md:col-span-4 lg:col-span-3 min-h-screen bg-gray-50 rounded-md p-2"
      >
        <UserNavigation />
      </div>
      <div class="col-span-12 md:col-span-8 lg:col-span-9  px-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>
