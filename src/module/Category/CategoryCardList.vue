<script setup>
import { ref } from "vue";

import Button from "primevue/button";
import Badge from "primevue/badge";

import Paginator from "primevue/paginator";

const data = ref([1, 2, 3, 4, 1, 1, 1, 1, 1, 1]);
</script>

<template>
  <div class="grid grid-cols-12 gap-2 xl:gap-3">
    <div
      v-for="(item, index) in data"
      class="col-span-6 xl:col-span-4 p-2 xl:p-3 rounded-md border"
    >
      <div class="">
        <img
          src="https://i.pinimg.com/originals/d0/3a/c2/d03ac2264bb230c8e86bbabc15d4e667.jpg"
          alt=""
          class="w-full lg:min-h-56 object-cover rounded-md"
        />
      </div>
      <div class="mt-2">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-xs text-gray-400">Accses</p>
          </div>
          <Badge value="Yangi" severity="success" size="small"></Badge>
        </div>
        <h1 class="text-sm md:text-base lg:text-lg mt-1">Blue Band</h1>
        <h1 class="text-slate-700 font-bold text-xl mt-2">
          <i class="pi pi-dollar"></i>
          79
        </h1>
        <div class="mt-4 flex gap-2">
          <Button
            class="w-full"
            size="small"
            icon="pi pi-shopping-cart"
            label="Add to Card"
          ></Button>
          <Button class="" icon="pi pi-heart" size="small" outlined></Button>
        </div>
      </div>
    </div>

    <Paginator
      :rows="10"
      :totalRecords="120"
      :rowsPerPageOptions="[10, 20, 30]"
      class="col-span-12 mt-5"
    ></Paginator>
  </div>
</template>
