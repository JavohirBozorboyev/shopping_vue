<script setup>
import CategoryCardList from "@/module/Category/CategoryCardList.vue";
import Breadcrumb from "primevue/breadcrumb";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
</script>

<template>
  <div>
    <CategoryCardList />
  </div>
</template>
