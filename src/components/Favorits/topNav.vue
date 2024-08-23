<template>
      <div class="mx-auto overflow-x-scroll p-2 text-black">
      <div class="inline-flex shadow-sm rounded-md mb-5" role="group">
        <RouterLink
        to="/favorites"
          type="button"
          class="rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Sevimlilar
        </RouterLink>
        <RouterLink
        to="/chat/:id"
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
          Sozlash
        </RouterLink>
      </div>
  </div>
    <div>
    </div>
</template>
<script setup>
import {RouterLink } from "vue-router";
</script>
<style scoped>

    
</style>