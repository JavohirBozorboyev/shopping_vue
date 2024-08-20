<script setup>
import Image from 'primevue/image';
import Button from "primevue/button";
import router from '@/router';

import axios from "axios";
import { ref, onMounted } from "vue";

let productID=router.currentRoute.value.params.id
console.log(productID);
let number = ref("");
let producDescription = ref("");
let productTitle = ref("");
let productImg = ref();
let productPrice = ref("");
let productValute= ref("");
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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Oy 0-indekslangan
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
  getProduct();
});
</script>
<template>
  <div class="container mx-auto p-2 flex flex-col  md:flex-row gap-5 w-full">
    <div class="left rounded-lg">
      <div v-if="product" class="container rounded-lg bg-gray-50 flex flex-col gap-2">
        <div class="flex flex-col rounded-lg gap-2">
          <div class="top rounded-lg flex flex-col md:flex-row-reverse gap-2 w-full p-2 shadow">
            <span>
              <Image
              class="w-full z-50 h-full object-contain"
              :src="product.attachUrlResponses[0].originFile"
              alt=""
              preview
            />
            </span>
            <span  :class="productImg ? 'flex flex-row md:flex-col gap-2' : 'hidden'">
              <Image v-for="item in productImg"
              class="w-[100px] h-[100px] z-50  object-contain"
              :src="item.originFile"
              alt=""
              preview
            />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="right w-full">
      <div class="container bg-gray-50 flex flex-col gap-2 w-full">
        <h1 class="px-2 font-semibold text-xl md:text-2xl">
          {{ productTitle }}
        </h1>
        <div class="card p-2 flex flex-col md:flex-row gap-2">
          <div
            class="flex gap-4 p-4 bg-gray-200 text-white rounded-lg w-full flex-col"
          >
            <!-- <span class="text-xs text-slate-800"
              >Sifatli mahsulot yetkazib berish hizmati mavjut</span
            > -->
            <h1 class="md:text-2xl font-bold text-slate-800">{{ productPrice.price }} {{ productValute }}</h1>
            <span class="text-xs text-slate-800"
              ><h3>{{ productTime  }}</h3></span>
              <div class="flex gap-2">
            <Button
              class=""
              icon="pi pi-shopping-cart "
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
          </div>
          <div class="card p-2 flex flex-col gap-2 bg-slate-50 w-full">
            <div
              class="w-full border p-1 rounded-lg flex items-center gap-2 font-semibold"
            >
              <img
                class="w-12 h-12 object-cover rounded-full"
                src="https://avatars.mds.yandex.net/i?id=3ff1e7144e00e1272505ba5e56adf16847c8db0a-4220229-images-thumbs&n=13"
                alt="user image"
              />
              <h1>Maxmudov Olimjon</h1>
            </div>
            <div
              class="flex w-full border p-1 rounded-lg items-center justify-between gap-2 font-semibold"
            >
              <span class="flex items-center gap-2"
                ><i class="pi pi-phone"></i>
                <h1>{{ number }}</h1></span
              >
            </div>
            <div
              class="w-full border cursor-pointer p-1 rounded-lg flex items-center gap-2 font-semibold"
            >
              <i class="pi pi-send"></i>
              <h1>SMS</h1>
            </div>
          </div>
        </div>
        <h1 class="px-2 text-sm md:text-xl font-semibold text-slate-600">
          Mahsulot haqida
        </h1>
        <div class="card p-4 flex flex-wrap gap-2">
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Model:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Ishlab chiqarilgan:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Rang:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Xolat:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Balandligi:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Kengligi:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Dvigatel hajmi:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Yoqilg'i turi:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Xostlar soni:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Kuzov turi:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Shift balandligi:</h1>
          </div>
          <div class="bg-slate-100 text-sm md:text-base p-1">
            <h1>Yaqin atrofda:</h1>
          </div>
        </div>
        <h1 class="md:text-xl text-sm font-sans text-slate-600 px-2">
          Izoh
        </h1>
        <div class="bottom flex flex-col gap-2 p-4 rounded-lg bg-slate-50">
          <div class="card border p-2">
            <p class="text-xs md:text-sm">{{ producDescription }}</p>
          </div>
          <div class="flex text-sm justify-between">
            <span>ID:123456789</span>
            <span class="flex gap-2 items-center justify-center"
              ><i class="pi pi-eye"></i>
              <p>100</p></span
            >
            <span
              class="flex gap-2 items-center justify-center cursor-pointer text-red-600 transition duration-100 hover:scale-[1.015]"
              ><p class="underline">Shikoyat qilish</p>
              <i class="pi pi-bookmark-fill"></i
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
