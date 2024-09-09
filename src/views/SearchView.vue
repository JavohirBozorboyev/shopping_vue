<template>
  <div class="min-h-screen">
    <h1 class="text-xl">{{ searchStore.search }}</h1>
    <!-- <h1 v-for="item in city" class="text-xl">{{ item.name }}</h1> -->
  </div>
</template>
<script setup>
import { watchEffect } from "vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

let { search, city } = searchStore;

watchEffect(() => {
  searchStore.search;
  searchStore.city;
  //   console.log(searchStore.search, "search page");
});
</script>
