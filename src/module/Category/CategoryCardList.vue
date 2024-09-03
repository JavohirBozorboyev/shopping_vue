<script setup>
import { inject, ref, watchEffect } from "vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Paginator from "primevue/paginator";
import axios from "axios";
import { useRoute } from "vue-router";
import CategoryLoader from "./CategoryLoader.vue";
import Swal from "sweetalert2";

const auth = inject("auth");
const data = ref(null);
let loader = ref(true);

const router = useRoute();

async function CategoryApiCall() {
  try {
    const res = await axios.get(
      `/api/v1/announcement/get/list/${router.params.slug}?page=0&size=1`
    );
    data.value = res.data.body;
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTM3ODAyNjAzIiwiaWF0IjoxNzI0Njg5NzQ1LCJleHAiOjE3MjUyOTQ1NDV9.6WdthRtIYQ-vHhjjt0NREw2EZCxk9lyABDoPMHgInz8`,
      },
    })
    .then((response) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Muvofaqqiyatli qo'shildi",
      });
      console.log(response);
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

watchEffect(() => {
  CategoryApiCall();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-2 xl:gap-3">
    <CategoryLoader v-if="loader" v-for="_ in [1, 1, 1, 1, 1, 1]" />

    <div
      v-if="data?.rows.length == 0"
      class="col-span-12 bg-gray-50 rounded-md p-5 min-h-60 flex flex-col gap-5 justify-center items-center"
    >
      <i
        class="pi pi-exclamation-circle text-gray-400"
        style="font-size: 3rem"
      ></i>
      <h1 class="text-xl uppercase text-slate-700">Maxsulot Topilmadi!</h1>
    </div>
    <div
      v-if="!loader"
      v-for="(item, index) in data?.rows"
      class="col-span-6 xl:col-span-4 2xl:col-span-3 p-2 xl:p-3 rounded-md border hover:border-black duration-300"
    >
      <div class="">
        <img
          :src="item.attachUrlResponses.originFile"
          alt=""
          class="w-full h-32 md:min-h-48 object-cover rounded-md"
        />
      </div>
      <div class="mt-2">
        <div class="flex justify-between items-center">
          <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
            {{ item.address }}
          </p>

          <Badge value="Yangi" size="small" severity="secondary"></Badge>
        </div>
        <h1
          class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
        >
          {{ item.title }}
        </h1>
        <h1
          class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
        >
          <i class="pi pi-money-bill text-gray-400"></i>
          {{ item.price }} {{ item.currencyCode }}
        </h1>
        <div class="mt-4 flex justify-between gap-2">
          <div class="flex gap-2">
            <Button
              class=""
              icon="pi pi-envelope "
              size="small"
              severity="contrast"
            ></Button>

            <Button
              @click="addFavorite(item.id)"
              class=""
              icon="pi pi-heart"
              size="small"
              outlined
              severity="contrast"
            ></Button>
          </div>
          <RouterLink :to="`/category/${router.params.slug}/${item.id}`">
            <Button
              class=""
              icon="pi pi-arrow-right"
              size="small"
              severity="secondary"
            ></Button>
          </RouterLink>
        </div>
      </div>
    </div>

    <Paginator
      :rows="10"
      :totalRecords="data?.total"
      class="col-span-12 mt-5"
    ></Paginator>
  </div>
</template>
