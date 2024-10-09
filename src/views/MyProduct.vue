<script setup>
import { RouterLink } from "vue-router";
import Button from "primevue/button";
import MyProductList from "@/module/MyProduct/MyProductList.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center rounded-md px-2">
      <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl">Элонларим</h1>
      <RouterLink to="/profil/product/add">
        <Button
          icon="pi pi-plus"
          aria-label="Save"
          severity="contrast"
          label="Элон қўшиш"
          size="small"
        />
      </RouterLink>
    </div>
    <main class="my-5">
      <MyProductList />
    </main>
  </div>
</template>
