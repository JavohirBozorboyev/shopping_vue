<script setup>
import { inject, ref, watchEffect } from "vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Paginator from "primevue/paginator";
import axios from "axios";
import { useRoute } from "vue-router";
import CategoryLoader from "./CategoryLoader.vue";
import Swal from "sweetalert2";

const route = useRoute();
const auth = inject("auth");
const { token } = auth;
const data = ref(null);
const favoriteData = ref(null);
let loader = ref(true);
let paginationPage = ref(1);
let paginationSize = ref(10);

async function CategoryApiCall() {
  let bodyContent = JSON.stringify({
    page: paginationPage.value,
    size: paginationSize.value,
  });
  let reqOptions = {
    url: `/api/v1/announcement/get/list/${route.params.slug}`,
    method: "GET",
    data: bodyContent,
  };
  try {
    const res = await axios.request(reqOptions);
    const favorite = await axios.get(`/api/v1/like/getMyLike`);
    const favoriteRes = await favorite.data;
    data.value = res.data.body;
    favoriteData.value = favoriteRes.body;
  } catch (error) {
    console.log(error);
  } finally {
    loader.value = false;
  }
}

function addFavorite(id) {
  let bodyContent = JSON.stringify({
    emailOrPhone: auth.user.emailOrPhone,
  });
  axios
    .post(`/api/v1/like/add?announcementId=${id}`, bodyContent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        CategoryApiCall();
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          title: "Севимлига қўшилди",
        });
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function onPageChange(e) {
  paginationPage.value = e.page + 1;
  paginationSize.value = e.rows;
  CategoryApiCall();
}
watchEffect(() => {
  loader.value = true;
  CategoryApiCall();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-1">
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
    <div
      v-if="!loader"
      v-for="(item, index) in data?.rows"
      class="col-span-6 xl:col-span-4 2xl:col-span-3 rounded-md border overflow-hidden hover:bg-slate-50 duration-300 flex flex-col justify-between"
    >
      <div class="">
        <img
          :src="item.attachUrlResponses.originFile"
          alt=""
          class="w-full h-32 md:min-h-48 object-cover rounded-t-sm"
        />
      </div>
      <div class="px-2 pt-2 xl:px-3 xl:pt-3 flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
            {{ item.address }}
          </p>

          <!-- <Badge value="Янги" size="small" severity="secondary"></Badge> -->
        </div>
        <h1
          class="text-xs lg:text-sm mt-2 text-slate-500 font-semibold line-clamp-2"
        >
          {{ item.title }}
        </h1>
        <h1
          class="text-slate-700 font-semibold text-sm xl:text-base mt-2 flex items-center gap-2"
        >
          <p class="text-xs text-gray-400 font-medium">Нарҳ :</p>
          {{ item.price }} {{ item.currencyCode }}
        </h1>
      </div>
      <div class="flex justify-between gap-2 p-1 mt-2 border-t">
        <div class="flex gap-2">
          <Button
            class=""
            icon="pi pi-envelope "
            size="small"
            severity="secondary"
          ></Button>

          <Button
            v-if="!(favoriteData.find((fin) => fin.id == item.id) ?? 0)"
            @click="addFavorite(item.id)"
            class=""
            icon="pi pi-heart"
            size="small"
            severity="secondary"
          ></Button>
        </div>
        <RouterLink :to="`/category/${route.params.slug}/${item.id}`">
          <Button
            class=""
            icon="pi pi-arrow-right"
            size="small"
            severity="secondary"
          ></Button>
        </RouterLink>
      </div>
    </div>

    <Paginator
      v-if="data?.rows?.length != 0"
      :rows="paginationSize"
      :totalRecords="data?.total"
      :rowsPerPageOptions="[5, 10, 20, 30]"
      @page="onPageChange"
      class="col-span-12 mt-5"
    ></Paginator>
  </div>
</template>
