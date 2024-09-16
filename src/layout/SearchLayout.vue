<script setup>
import { RouterView } from "vue-router";
import AppFilter from "@/module/App/AppFilter.vue";
</script>

<template>
  <div>
    <AppFilter />
    <div class="container mx-auto mt-2">
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-3 bg-slate-100 rounded-md"></div>
        <div class="col-span-12 lg:col-span-9 px-2"><RouterView /></div>
      </div>
    </div>
  </div>
</template>
