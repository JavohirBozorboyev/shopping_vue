<script setup>
import Image from "primevue/image";
import Button from "primevue/button";
import router from "@/router";

import axios from "axios";
import { ref, onMounted } from "vue";

let productID = router.currentRoute.value.params.id;
console.log(productID);
let number = ref("");
let producDescription = ref("");
let productTitle = ref("");
let productImg = ref();
let productPrice = ref("");
let productValute = ref("");
let productTime = ref();

const product = ref();

function getProduct() {
  axios
    .get(`/api/v1/announcement/get/${productID}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTkzOTEyNTA1IiwiaWF0IjoxNzI0MDAzODI0LCJleHAiOjE3MjQ2MDg2MjR9.Hg-vLh6lKJRLkMjKdzwJxbdt_UQEQUcLzWKSxnv9Dlw`,
      },
    })
    .then((response) => {
      product.value = response.data.body;
      number.value = response.data.body.contactInfo.phone;
      producDescription.value = response.data.body.description;
      productTitle.value = response.data.body.title;
      productImg.value = response.data.body.attachUrlResponses;
      productPrice.value = response.data.body.priceTag;
      productValute.value = response.data.body.priceTag.currency.name;
      productTime.value = formatDateTime(response.data.body.createDateTime);
      console.log(product.value, 555);
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

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
  getProduct();
});
</script>
<template>
  <div class="container mx-auto p-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
    <div class="p-2 grid-cols-12 rounded-md bg-gray-50">
      <div
        class="rounded-lg bg-gray-50 grid grid-cols-12 gap-2"
      >
        <Image  v-for="item in product?.attachUrlResponses"
          class="w-full h-full object-cover rounded-md overflow-hidden"
          :class="
            product?.attachUrlResponses.length == 1
              ? 'col-span-12'
              : 'col-span-6'
          "
          :src="item?.originFile"
          alt=""
          preview
        />
      </div>
    </div>
    <div class="w-full bg-gray-50 p-2 sm:p-3 md:p-4 lg:p-8 rounded-md">
      <div class="flex flex-col gap-2 w-full">
        <h1
          class="font-semibold text-base md:text-2xl xl:text-3xl text-slate-900"
        >
          {{ productTitle }}
        </h1>
        <div class="my-5 ">
            <h1 class="md:text-2xl font-bold text-slate-800">
            {{ productPrice.price }} {{ productValute }}
          </h1>
        </div>
        <div class="flex gap-2">
          <Button
            class=""
            icon="pi pi-shopping-cart "
            severity="contrast"
            label="Add to cart"
          ></Button>

          <Button
            class=""
            icon="pi pi-heart"
            outlined
            severity="contrast"
            label="Favorite"
          ></Button>
        </div>
        <div class="mt-5">
          <span class="text-sm text-slate-500"> Mahsulot haqida: </span>
          <p class="text-xs md:text-sm xl:text-base mt-1 text-slate-700">
            {{ producDescription }}
          </p>
          <span class="text-xs grid grid-cols-12 gap-4 text-slate-800 mt-4 ">
            <span class="col-span-6">
              {{
            productTime
          }}
            </span>
            <div class="col-span-12 md:text-end md:col-span-6">   
              <span class="text-xs  text-slate-800 mt-4 ">Yuboruvchi: </span>
                <span
                  :href="`mailto:${product?.contactInfo?.email}`"
                  class="text-xs  text-slate-700"
                  target="_blank"
                >
                  {{ product?.contactInfo?.phone }}
                </span>
          </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
