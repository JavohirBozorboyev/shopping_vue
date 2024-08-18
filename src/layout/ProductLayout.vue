<template>
      <div class="container mx-auto p-2 text-black bg-white">
    <div class="top p-1">
      <div class="inline-flex flex-wrap shadow-sm rounded-md mb-5" role="group">
        <RouterLink
        to="/favorites"
          type="button"
          class="rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Sevimlilar
        </RouterLink>
        <RouterLink
        to="/chat"
          type="button"
          class="border-t border-b border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Xabarlar
        </RouterLink>
        <RouterLink
        to="/"
          type="button"
          class="border-t border-b border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Reklamalar
        </RouterLink>
        <RouterLink
        to="/"
          type="button"
          class="border-t border-b border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          To'lovlar
        </RouterLink>
        <RouterLink
        to="/"
          type="button"
          class="rounded-r-md border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Sozlash; O'rnatish
        </RouterLink>
      </div>
    </div>
    <div class="bottom flex flex-col gap-3 p-1 px-3 w-full overflow-y-auto">
        <RouterView></RouterView>
    </div>
  </div>
    <div>
    </div>
</template>
<script setup>
import { RouterView,RouterLink } from "vue-router";
</script>
<style scoped>
    
</style>