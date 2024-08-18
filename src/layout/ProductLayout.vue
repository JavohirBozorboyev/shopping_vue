<template>
      <div class="container mx-auto p-2 text-black bg-white">
        <TopNav></TopNav>
    <div class="bottom flex flex-col gap-3 p-1 px-3 w-full overflow-y-auto">
        <RouterView></RouterView>
    </div>
  </div>
    <div>
    </div>
</template>
<script setup>
import { RouterView,RouterLink } from "vue-router";
import TopNav from "../components/Favorits/topNav.vue"
</script>
<style scoped>
    
</style>