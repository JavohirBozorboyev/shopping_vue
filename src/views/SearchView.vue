<script setup>
import { watchEffect } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import axios from "axios";
import SearchCardList from "@/module/search/SearchCardList.vue";
const searchStore = useSearchStore();

// watchEffect(() => {
//   console.log(searchStore?.city?.id);
// });
</script>

<template>
  <div class="min-h-screen">
    <SearchCardList />
  </div>
</template>
