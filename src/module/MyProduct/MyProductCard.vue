<script setup>
import { inject, defineEmits } from "vue";
const { data, favoriteData } = defineProps(["data", "favoriteData"]);
import Image from "primevue/image";
import Swal from "sweetalert2";
import Button from "primevue/button";
import axios from "axios";
import { useRouter } from "vue-router";
const auth = inject("auth");
const router = useRouter();
const emit = defineEmits();
const { token } = auth;
</script>
<template>
  <div
    class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80 flex flex-col justify-between"
  >
    <div class="h-48 md:min-h-48 relative">
      <Image
        :src="data.attachUrlResponses.originFile"
        :alt="data?.title"
        class="w-full h-full object-cover rounded-t-md duration-300"
        preview
        width="100%"
      />

      <Button
        class="absolute float-right -mt-7 mr-2"
        icon="pi pi-images "
        size="large"
        severity="contrast"
        rounded
      ></Button>
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
          icon="pi pi-trash "
          size="small"
          severity="danger"
          text
        ></Button>
        <Button
          class=""
          icon="pi pi-pencil "
          size="small"
          severity="secondary"
          text
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
