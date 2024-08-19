<script setup>
import { RouterLink } from "vue-router";

import Button from "primevue/button";
</script>

<template>
  <div class="flex justify-center items-center min-h-[80vh] flex-col gap-5">
    <h1 class="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-black">
      404 | Page not found
    </h1>
    <RouterLink to="/">
      <Button label="Go to Home" severity="contrast" />
    </RouterLink>
  </div>
</template>
