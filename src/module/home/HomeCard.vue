<script setup>
import { inject, defineEmits } from "vue";
const { data, favoriteData } = defineProps(["data", "favoriteData"]);
import Swal from "sweetalert2";
import Button from "primevue/button";
import axios from "axios";
import { useRouter } from "vue-router";
const auth = inject("auth");
const router = useRouter();
const emit = defineEmits();
const { token } = auth;

function addFavorite(id) {
  if (!token) {
    return router.push("/login");
  }
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
      emit("update", "Updated message from child");
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
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}
</script>
<template>
  <div
    class="col-span-6 lg:col-span-4 xl:col-span-3 rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80 flex flex-col justify-between"
  >
    <div class="">
      <img
        :src="data.attachUrlResponses.originFile"
        alt=""
        class="w-full h-32 md:min-h-48 object-cover rounded-t-md duration-300"
      />
    </div>
    <div class="flex flex-col justify-between px-2 pt-2 xl:px-3 xl:pt-3">
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
          <p class="text-xs text-gray-400 font-medium">Нарҳ :</p>
          {{ data.price }} {{ data.currencyCode }}
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
        ></Button>

        <Button
          @click="addFavorite(data.id)"
          class=""
          icon="pi pi-heart"
          size="small"
          v-if="!favoriteData"
          severity="secondary"
        ></Button>
      </div>
      <RouterLink :to="`/category/${data.categoryId}/${data.id}`">
        <Button
          class=""
          icon="pi pi-arrow-right"
          size="small"
          severity="secondary"
        ></Button>
      </RouterLink>
    </div>
  </div>
</template>
