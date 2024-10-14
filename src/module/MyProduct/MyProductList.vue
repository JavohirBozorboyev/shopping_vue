<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
import { inject } from "vue";
import CategoryLoader from "../Category/CategoryLoader.vue";
import MyProductCard from "./MyProductCard.vue";

const auth = inject("auth");
const { token } = auth;

const data = ref(null);

let loader = ref(true);

async function getProduct() {
  // loader.value = true;
  try {
    const res = await axios.get(`/api/v1/announcement/get-me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataRes = await res.data;
    data.value = dataRes.body;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
}

watchEffect(() => {
  loader.value = true;
  getProduct();
});
</script>

<template>
  <div class="container px-2 mx-auto rounded-md grid grid-cols-12 gap-2">
    <CategoryLoader v-if="loader" v-for="_ in [1, 1, 1, 1, 1, 1]" />
    <div
      v-if="data?.rows?.length == 0"
      class="col-span-12 bg-gray-50 rounded-md p-5 min-h-60 flex flex-col gap-5 justify-center items-center"
    >
      <i
        class="pi pi-exclamation-circle text-black"
        style="font-size: 3rem"
      ></i>
      <h1 class="text-xl uppercase text-slate-700">Махсулот Топилмади!</h1>
    </div>
    <div v-if="!loader" class="grid grid-cols-12 gap-1 col-span-12">
      <MyProductCard v-for="item in data" :data="item" @update="getProduct" />
    </div>
  </div>
</template>

<!-- {process.env.Api_URl}/api/v1/category/tree/top/ancestors -->
