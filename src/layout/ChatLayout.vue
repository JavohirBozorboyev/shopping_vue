<script setup>
import { RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import ChatNav from "@/module/messages/ChatNav.vue";
const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
onBeforeMount(() => {
  if (!authStore.user) {
    router.push("/login");
  }
});
console.log(route?.params?.id);
</script>

<template>
  <div
    v-if="route.path === `/chat`"
    class="grid grid-cols-12 gap-2 container mx-auto px-2 pt-2 min-h-[80vh]"
  >
    <div class="col-span-12 md:col-span-4 xl:col-span-3">
      <ChatNav />
    </div>
    <div class="hidden md:block md:col-span-8 xl:col-span-9">
      <RouterView></RouterView>
    </div>
  </div>
  <div
    v-if="route.path !== `/chat`"
    class="grid grid-cols-12 gap-2 container mx-auto px-2 pt-2"
  >
    <div class="hidden md:block col-span-4 xl:col-span-3">
      <ChatNav />
    </div>
    <div class="col-span-12 md:col-span-8 xl:col-span-9">
      <RouterView></RouterView>
    </div>
  </div>
</template>
