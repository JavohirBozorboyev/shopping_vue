<script setup>
import { inject, ref } from "vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "primevue/skeleton";

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
getFavorites();

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
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Muvofaqqiyatli olib tashlandi",
      });
      getFavorites();
      console.log(response);
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
</script>

<template>
  <div v-if="loader" class="grid grid-cols-12 gap-2 xl:gap-3">
    <Skeleton
      v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
      class="col-span-6 relative md:col-span-3 h-44"
      height="10rem"
    ></Skeleton>
  </div>

  <div v-if="!loader" class="grid grid-cols-12 gap-2 xl:gap-3">
    <div v-for="item in data" class="col-span-6 relative md:col-span-3">
      <span
        @click="addFavorite(item.id)"
        class="absolute right-0 bg-slate-50 flex items-center justify-center rounded-b-sm opacity-90 cursor-pointer w-6 h-6 transition duration-150 active:scale-95"
        ><i class="pi pi-trash"></i
      ></span>
      <div
        class="col-span-6 relative xl:col-span-4 2xl:col-span-3 p-2 xl:p-3 rounded-md border hover:border-black duration-300"
      >
        <span
          class="absolute bg-slate-50 h-6 w-6 text-center rounded-sm cursor-pointer transition duration-100 active:scale-95 top-1 right-1"
          ><i class="pi pi-trash text-gray-500"></i
        ></span>
        <div class="">
          <img
            :src="item.attachUrlResponses[0].originFile"
            alt=""
            class="w-full h-32 md:min-h-48 object-cover rounded-md"
          />
        </div>
        <div class="mt-2">
          <div class="flex justify-between items-center">
            <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
              Namangan Viloyati
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
            {{ item.priceTag.price }} {{ item.priceTag.currency.name }}
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
                class=""
                icon="pi pi-heart"
                size="small"
                severity="contrast"
              ></Button>
            </div>
            <RouterLink to="`/">
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
