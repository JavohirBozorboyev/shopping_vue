<script setup>
import { inject, ref, watchEffect } from "vue";
import Button from "primevue/button";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "primevue/skeleton";
import { RouterLink } from "vue-router";

const auth = inject("auth");
const { user, token } = auth;

const data = ref();
let loader = ref(true);

function getFavorites() {
  axios
    .get(`/api/v1/like/getMyLike`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      data.value = response.data.body;
      loader.value = false;
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
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
        title: "Севимлидан ўчирилди",
      });
      getFavorites();
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

watchEffect(() => {
  getFavorites();
});
</script>

<template>
  <div class="pb-4">
    <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl">
      Севимли Махсулотлар
    </h1>
  </div>
  <div v-if="loader" class="grid grid-cols-12 gap-2 xl:gap-3 min-h-[80vh]">
    <Skeleton
      v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
      class="col-span-12 sm:col-span-6 relative md:col-span-3 h-44"
      height="10rem"
    ></Skeleton>
  </div>

  <div v-if="!loader" class="min-h-[90vh]">
    <div class="grid grid-cols-12 gap-2 xl:gap-3 pb-4">
      <div
        v-for="item in data"
        class="col-span-6 lg:col-span-4 xl:col-span-3 rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80 flex flex-col justify-between"
      >
        <div class="">
          <img
            :src="item?.attachUrlResponses[0].originFile"
            :alt="item.title"
            loading="lazy"
            class="w-full h-32 md:min-h-48 object-cover rounded-t-md duration-300"
          />
        </div>
        <div class="flex flex-col justify-between px-2 pt-2 xl:px-3 xl:pt-3">
          <div class="flex justify-between items-center">
            <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
              {{ item?.contactInfo?.address }}
            </p>
          </div>
          <div>
            <h1
              class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
            >
              {{ item.title }}
            </h1>
            <h1
              class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
            >
              <p class="text-xs text-gray-400 font-medium">Нарҳ :</p>
              {{ item?.priceTag.price }} {{ item?.priceTag?.currency.code }}
            </h1>
          </div>
        </div>
        <div class="flex justify-between gap-2 p-1 mt-2 border-t">
          <div class="flex gap-2">
            <Button
              class=""
              icon="pi pi-envelope "
              size="small"
              severity="secondary"
              aria-label="SMS"
            ></Button>

            <Button
              @click="addFavorite(item.id)"
              class=""
              icon="pi pi-trash"
              size="small"
              severity="secondary"
              aria-label="dislike"
            ></Button>
          </div>
          <RouterLink :to="`/category/${item.categoryId}/${item.id}`">
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
  </div>
  <div
    v-if="!data"
    class="col-span-12 h-[80vh] -mt-4 bg-slate-100 p-4 rounded flex items-center justify-center flex-col gap-5"
  >
    <i
      class="pi pi-exclamation-circle text-slate-500"
      style="font-size: 3rem"
    ></i>
    <p class="text-slate-500 text-xl">Севимли элонлар мавжуд эмас</p>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px !important;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: gainsboro;
  border-radius: 10px;
}
</style>
