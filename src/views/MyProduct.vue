<script setup>
import { RouterLink } from "vue-router";
import Button from "primevue/button";
</script>

<template>
  <div>
    <div class="flex justify-between items-center bg-slate-100 p-2 rounded-md">
      <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Менинг Элонларим
      </h1>
      <RouterLink to="/profil/product/add">
        <Button
          icon="pi pi-plus"
          aria-label="Save"
          severity="contrast"
          label="Махсулот қўшиш"
          size="small"
        />
      </RouterLink>
    </div>
  </div>
</template>
