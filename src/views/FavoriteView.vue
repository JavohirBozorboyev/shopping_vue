<script setup>
import { inject, ref } from "vue";
import Button from "primevue/button";
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
</script>

<template>
  <div v-if="loader" class="grid grid-cols-12 gap-2 xl:gap-3">
    <Skeleton
      v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
      class="col-span-12 sm:col-span-6 relative md:col-span-3 h-44"
      height="10rem"
    ></Skeleton>
  </div>

  <div v-if="!loader">
    <div class="grid grid-cols-12 gap-2 xl:gap-3">
      <div
        v-for="item in data"
        class="col-span-12 sm:col-span-6 relative lg:col-span-4 2xl:col-span-3 rounded-md border hover:bg-slate-50 duration-300 overflow-hidden"
      >
        <div class="">
          <img
            :src="item.attachUrlResponses[0].originFile"
            alt=""
            class="w-full h-48 object-cover rounded-t-sm"
          />
        </div>
        <div class="p-2 xl:p-3">
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
              {{ item.priceTag.price }} {{ item.priceTag.currency.name }}
            </h1>
          </div>
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
                icon="pi pi-trash"
                size="small"
                severity="contrast"
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
