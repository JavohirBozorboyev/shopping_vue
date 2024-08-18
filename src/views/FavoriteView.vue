<template>
  <div class="container mx-auto p-2 text-black bg-white">
    <div class="top p-1">
      <div class="inline-flex flex-wrap shadow-sm rounded-md mb-5" role="group">
        <button
          type="button"
          class="rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Sevimlilar
        </button>
        <button
          type="button"
          class="border-t border-b border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Xabarlar
        </button>
        <button
          type="button"
          class="border-t border-b border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Reklamalar
        </button>
        <button
          type="button"
          class="border-t border-b border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          To'lovlar
        </button>
        <button
          type="button"
          class="rounded-r-md border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Sozlash; O'rnatish
        </button>
      </div>
    </div>
    <div class="bottom flex flex-col gap-3 p-1 px-3 w-full overflow-y-auto">
      <div class="grid grid-cols-12 items-center gap-2">
        <div
          v-for="item in data"
          class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-3 p-2 flex flex-col gap-1 relative bg-gray-50 rounded-lg"
        >
          <span
            class="flex absolute right-3 bg-gray-100 p-2 rounded-sm top-3 items-center justify-end active:scale-95 duration-300"
          >
            <i class="pi pi-trash text-gray-400 cursor-pointer"></i
          ></span>
          <div class="top w-full flex flex-wrap">
            <img
              class="w-full h-[250px] object-cover"
              src="https://avatars.mds.yandex.net/i?id=fafaa03adad3294c6556ec9c5a753b693307739a-9146954-images-thumbs&n=13"
              alt=""
            />
          </div>
          <div class="bottom flex flex-col gap-2">
            <div class="top flex flex-col gap-2">
              <h1
                class="font-medium text-base text-slate-700 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                Елка с эффиктом снега доставка бесплатная
              </h1>
              <span class="flex justify-between">
                <span class="w-[77%] flex items-center gap-2"
                  ><i class="pi pi-money-bill text-gray-400"></i>
                  <h2 class="font-semibold text-xl">230 000 сум</h2></span
                >
                <span class="bg-green-400 w-1/3 text-center rounded-2xl"
                  ><h1 class="text-white tracking-wider">Active</h1></span
                >
              </span>
            </div>
            <div class="center flex flex-col">
              <span class="flex items-center  gap-2">
                <i class="pi pi-map-marker text-gray-400"></i>
                <span class="text-sm">Ташкент, Учтепинский район</span>
                </span
              >
              <span class="flex justify-between"
                ><div>
                 <span class="flex items-center justify-center gap-2"> 
                   <i class="pi pi-clock text-gray-400"></i>
                  <span>Сегодня 10:23</span>
                 </span>
                </div>
                <div class="text-end px-2 bg-white rounded-lg">
                  <h1>ID:123456</h1>
                </div></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import Fovorits1 from "../module/favorites/favorits1.vue"
import { ref } from "vue";
const data = ref([
  {
    id: 1234456,
    status: "active",
    message: "Елка с эффиктом снега доставка бесплатная",
    price: 235000,
    location: "Ташкент, Учтепинский ра��он",
    date: "Сегодня 10:23",
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false,
  },
  {
    id: 1234456,
    status: "unactive",
    message: "Елка с эффиктом снега доставка бесплатная",
    price: 235000,
    location: "Ташкент, Учтепинский ра��он",
    date: "Сегодня 10:23",
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false,
  },
  {
    id: 1234456,
    status: "active",
    message: "Елка с эффиктом снега доставка бесплатная",
    price: 235000,
    location: "Ташкент, Учтепинский ра��он",
    date: "Сегодня 10:23",
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false,
  },
  {
    id: 1234456,
    status: "unactive",
    message: "Елка с эффиктом снега доставка бесплатная",
    price: 235000,
    location: "Ташкент, Учтепинский ра��он",
    date: "Сегодня 10:23",
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false,
  },
]);
</script>
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
