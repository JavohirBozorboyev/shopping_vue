<script setup>
import { RouterView } from "vue-router";
import AppFilter from "@/module/App/AppFilter.vue";
import axios from "axios";
axios.defaults.baseURL = "https://api.tez-sotish.uz";
</script>

<template>
  <div>
    <AppFilter />
    <div class="container mx-auto mt-2">
      <div class="grid grid-cols-12">
        <div class="col-span-12 px-2"><RouterView /></div>
      </div>
    </div>
  </div>
</template>
