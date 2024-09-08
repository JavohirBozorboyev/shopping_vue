<script setup>
import { inject } from "vue";
const { data } = defineProps(["data"]);
import Swal from "sweetalert2";
import Button from "primevue/button";

const auth = inject("auth");
const { user, token } = auth;

function addFavorite(id) {
  console.log(id);
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
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
</script>
<template>
  <div
    class="col-span-6 xl:col-span-4 2xl:col-span-3 rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80"
  >
    <div class="">
      <img
        :src="data.attachUrlResponses.originFile"
        alt=""
        class="w-full h-32 md:min-h-48 object-cover rounded-t-md duration-300"
      />
    </div>
    <div class="flex flex-col justify-between p-2 xl:p-3">
      <div class="flex justify-between items-center">
        <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
          {{ data.address }}
        </p>
      </div>
      <div>
        <h1
          class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
        >
          {{ data.title }}
        </h1>
        <h1
          class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
        >
          <i class="pi pi-money-bill text-gray-400"></i>
          {{ data.price }} {{ data.currencyCode }}
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
            @click="addFavorite(data.id)"
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
</template>
<style></style>
