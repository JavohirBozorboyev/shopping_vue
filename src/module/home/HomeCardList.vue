<script setup>
import HomeCard from "./HomeCard.vue";
import Paginator from "primevue/paginator";
</script>

<template>
  <div
    class="container mx-auto px-2 mt-5 bg-gray-50 rounded-md p-2 border grid grid-cols-12"
  >
    <HomeCard />
    <div class="col-span-12 mt-2 border rounded-md overflow-hidden">
      <Paginator
        :rows="10"
        :totalRecords="120"
        :rowsPerPageOptions="[10, 20, 40, 60]"
        class=""
      ></Paginator>
    </div>
  </div>
</template>
