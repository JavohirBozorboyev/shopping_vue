<script setup>
import { ref, watchEffect, inject } from "vue";

import Paginator from "primevue/paginator";
import axios from "axios";
import CategoryLoader from "../Category/CategoryLoader.vue";
import SearchCard from "./SearchCard.vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
const auth = inject("auth");
const { token } = auth;

const data = ref(null);
const favoriteData = ref(null);

let loader = ref(true);
let paginationPage = ref(1);
let paginationSize = ref(10);

async function getProduct() {
  try {
    const res = await axios.post("/api/v1/announcement/search", {
      page: paginationPage.value,
      size: paginationSize.value,
      filter: {
        title: searchStore?.search,
        regionId: searchStore?.city?.id,
      },
    });

    // console.log(res.data);
    data.value = res.data.body;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
}

async function getFavorite() {
  if (!token) {
    return;
  }
  try {
    const favorite = await axios.get(`/api/v1/like/getMyLike`);
    const favoriteRes = await favorite.data;
    favoriteData.value = favoriteRes.body;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
}

function onPageChange(e) {
  paginationPage.value = e.page + 1;
  paginationSize.value = e.rows;
  getProduct();
}
const handleUpdate = () => {
  getProduct();
  getFavorite();
};

watchEffect(() => {
  loader.value = true;
  getProduct();
  getFavorite();
  handleUpdate();
});
</script>

<template>
  <div class="container mx-auto rounded-md grid grid-cols-12 gap-2">
    <CategoryLoader v-if="loader" v-for="_ in [1, 1, 1, 1, 1, 1]" />
    <div
      v-if="data?.rows?.length == 0"
      class="col-span-12 bg-gray-50 rounded-md p-5 min-h-screen flex flex-col gap-5 justify-center items-center"
    >
      <i
        class="pi pi-exclamation-circle text-black"
        style="font-size: 3rem"
      ></i>
      <h1 class="text-xl uppercase text-slate-700">Махсулот Топилмади!</h1>
    </div>
    <div v-if="!loader" class="grid grid-cols-12 gap-1 col-span-12">
      <SearchCard
        @update="handleUpdate"
        v-for="item in data?.rows"
        :data="item"
        :favoriteData="favoriteData?.find((fin) => fin.id == item.id) ?? 0"
      />
    </div>

    <div class="col-span-12 mt-2 border rounded-md overflow-hidden">
      <Paginator
        v-if="data?.rows?.length != 0"
        :rows="paginationSize"
        :totalRecords="data?.total"
        :rowsPerPageOptions="[5, 10, 20, 30]"
        @page="onPageChange"
      ></Paginator>
    </div>
  </div>
</template>

<!-- {process.env.Api_URl}/api/v1/category/tree/top/ancestors -->
