<script setup>
import Image from "primevue/image";
import Button from "primevue/button";

import Loader from "../components/CategoryID/Loader.vue";

import axios from "axios";
import { ref, onMounted, inject, reactive } from "vue";
import Swal from "sweetalert2";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { useRoute, useRouter } from "vue-router";

const auth = inject("auth");
const { token } = auth;
const route = useRoute();
const router = useRouter();

let loader = ref(true);

let product = reactive({
  data: null,
  loading: true,
  error: null,
});

function getProduct() {
  axios
    .get(`/api/v1/announcement/get/${route.params.id}`, {
      headers: {
        Authorization: `Bearer` + token,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        product.data = response.data.body;
        product.loading = false;
        loader.value = false;
      } else {
        router.push("/");
      }
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Oy 0-indekslangan
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

onMounted(() => {
  getProduct();
});
</script>
<template>
  <div class="container mx-auto p-2 min-h-[80vh] lg:py-10">
    <div v-if="product.loading">
      <Loader></Loader>
    </div>
    <article
      v-if="!product.loading"
      class="grid grid-cols-1 lg:grid-cols-2 gap-5"
    >
      <div
        class="grid gap-1 -m-2 sm:m-0"
        :class="
          product?.data?.attachUrlResponses.length == 1
            ? 'grid-cols-1'
            : 'grid-cols-2'
        "
      >
        <Image
          :src="product?.data?.attachUrlResponses[0].originFile"
          :alt="product?.data?.title"
          preview
          loading="lazy"
          class="w-full object-cover col-span-2"
        />
        <Image
          v-for="item in product?.data?.attachUrlResponses.slice(
            1,
            product?.data?.attachUrlResponses.length
          )"
          :src="item.originFile"
          :alt="product?.data?.title"
          loading="lazy"
          preview
          class="w-full object-cover"
        />
      </div>
      <div class="bg-slate-100 p-4 md:p-6 rounded">
        <p class="mb-2 text-gray-500 text-xs">
          <span>Сана:</span>
          {{ formatDateTime(product?.data?.createDateTime) }}
        </p>
        <h1 class="text-xl md:text-2xl xl:text-4xl font-bold">
          {{ product?.data?.title }}
        </h1>
        <h2 class="mt-5 text-base md:text-lg xl:text-2xl">
          {{
            FormatCurrency(
              product?.data?.priceTag?.price,
              product?.data?.priceTag?.currency.code
            )
          }}
        </h2>
        <p class="mt-5 text-gray-500 text-sm">
          {{ product?.data?.description }}
        </p>
        <div class="flex items-center gap-5 mt-5">
          <Button label="CМC" icon="pi pi-envelope" severity="contrast" />
          <a
            :href="'tel:' + product?.data?.contactInfo.phone"
            class="inline-block text-blue-500"
          >
            <span class="pi pi-phone"></span>
            {{ product?.data?.contactInfo.phone }}
          </a>
        </div>
      </div>
    </article>
  </div>
</template>
<style scoped></style>
