<template>
  <div class="grid grid-cols-12 gap-2 xl:gap-3">
    <div
      class="col-span-6 xl:col-span-4 2xl:col-span-3 p-2 xl:p-3 rounded-md border hover:border-black duration-300"
    >
      <div class="">
        <img
          src="https://avatars.mds.yandex.net/i?id=00782806b70a7cd694288869be75dc857225a87a-4593530-images-thumbs&n=13"
          alt=""
          class="w-full h-32 md:min-h-48 object-cover rounded-md"
        />
      </div>
      <div class="mt-2">
        <div class="flex justify-between items-center">
          <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
            Namangan Viloyati
          </p>

          <Badge value="Янги" size="small" severity="secondary"></Badge>
        </div>
        <h1
          class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
        >
          Sarlavha
        </h1>
        <h1
          class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
        >
          <i class="pi pi-money-bill text-gray-400"></i>
          300 dollor
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
              outlined
              severity="contrast"
            ></Button>
          </div>
          <RouterLink to="/">
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
    <div
      class="col-span-6 xl:col-span-4 2xl:col-span-3 p-2 xl:p-3 rounded-md border hover:border-black duration-300"
    >
      <div class="">
        <img
          src="https://avatars.mds.yandex.net/i?id=00782806b70a7cd694288869be75dc857225a87a-4593530-images-thumbs&n=13"
          alt=""
          class="w-full h-32 md:min-h-48 object-cover rounded-md"
        />
      </div>
      <div class="mt-2">
        <div class="flex justify-between items-center">
          <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
            Namangan Viloyati
          </p>

          <Badge value="Янги" size="small" severity="secondary"></Badge>
        </div>
        <h1
          class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
        >
          Sarlavha
        </h1>
        <h1
          class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
        >
          <i class="pi pi-money-bill text-gray-400"></i>
          300 dollor
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
              outlined
              severity="contrast"
            ></Button>
          </div>
          <RouterLink to="/">
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
</template>
<script setup>
import Button from "primevue/button";
import Badge from "primevue/badge";
import { ref, onMounted, inject } from "vue";
import axios from "axios";
const data=ref([])
// const auth = inject("auth");
// const { token } = auth;

// function getProductByCategory() {
//   axios
//     .get(`http://tez-sotish-api.uz/api/v1/announcement/get/by-category/2`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error("Xatolik yuz berdi:", error);
//     });
// }
// getProductByCategory()
</script>
<style scoped></style>
