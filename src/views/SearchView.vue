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
    <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 mt-1 text-slate-900">
      Қидирув Натижалари
    </h1>
    <SearchCardList />
  </div>
</template>
