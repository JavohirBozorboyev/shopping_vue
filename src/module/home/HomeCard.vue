<script setup>
import axios from "axios";
import { ref,inject } from "vue";
import router from "@/router";
import Button from "primevue/button";
import Swal from 'sweetalert2';

const auth = inject("auth","token");
// console.log(auth.token);

const data = ref([]);
function getProduct() {
  axios
    .get(`/api/v1/announcement/home?page=1&size=10`, {
      headers: {
        Authorization: `Bearer`+ auth.token,
      },
    })
    .then((response) => {
      data.value = response.data.body.rows;
      console.log(data.value);
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function addFavorite(id) {
  console.log(id);
   let bodyContent = JSON.stringify({
    emailOrPhone: auth.user.emailOrPhone,
  });
  axios
    .post(`/api/v1/like/add?announcementId=${id}`,bodyContent,
    {
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
  }
});
Toast.fire({
  icon: "success",
  title: "Muvofaqqiyatli olib tashlandi"
});
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
getProduct()
</script>
<template>
  <div
      v-for="(item, index) in data"
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
              icon="pi pi-shopping-cart "
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
          <RouterLink to="`/category/${router.params.slug}/${item.id}`">
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
</template>
<style></style>

