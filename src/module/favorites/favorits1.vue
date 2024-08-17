<template>
    <div v-for="item in data" class="card transition hover:scale-[1.01] shadow-md w-full bg-gray-50 rounded-lg p-2">
        <table border="1" class=" w-full  rounded-lg" width="100%">
          <thead class=" rounded-2xl ">
            <tr>
              <th class="text-start pl-3">ID:1234456</th>
              <th>Xolati</th>
              <th>Ma'lumot</th>
              <th>O'chirish</th>
            </tr>
          </thead>
          <tbody class="w-full">
            <tr class="w-full border-t-2 border-gray-300">
              <td class="flex w-full pl-3 gap-2  py-2 items-center justify-start">
                <img class="w-1/6 rounded-lg object-cover hidden md:block h-[100px]" src="https://avatars.mds.yandex.net/i?id=fafaa03adad3294c6556ec9c5a753b693307739a-9146954-images-thumbs&n=13" alt="">
                <div class="flex flex-col gap-3">
                  <span>
                    <h1 class="font-bold">Елка с эффиктом снега доставка бесплатная</h1>
                    <h2 class="font-semibold">235 000 сум</h2>
                  </span>
                  <span>
                    <h1>Ташкент, Учтепинский район</h1>
                    <h2>Сегодня 10:23</h2>
                  </span>
                </div>
              </td>
              <td class="text-center">
                <h1 :class="item.status=='active'? 'text-green-400' : 'text-red-400'" >{{ item.status }}</h1>
                <!-- <h1 class="text-red-400">Неактивные</h1>
                <h1 class="text-gray-400">Удаление</h1> -->
              </td>
              <td class="w-1/4 text-center">
                <div class="flex items-center justify-center gap-2 w-full">
                  <span class="w-[50%] text-end"><i class="pi pi-heart"></i></span>
                  <span class="w-[50%] text-start">32</span>
                </div>
                <div class="flex items-center justify-center gap-2 w-full">
                  <span class="w-[50%] text-end"><i class="pi pi-phone"></i></span>
                  <span class="w-[50%] text-start">32</span>
                </div>
                <div class="flex items-center justify-center gap-2 w-full">
                  <span class="w-[50%] text-end"><i class="pi pi-eye"></i></span>
                  <span class="w-[50%] text-start">32</span>
                </div>
              </td>
              <td class="text-center">
                <i class="pi pi-trash cursor-pointer" style="font-size: 20px;"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>
<script setup>
import { ref } from 'vue';
const data=ref([
  {
    id: 1234456,
    status: 'active',
    message: 'Елка с эффиктом снега доставка бесплатная',
    price: 235000,
    location: 'Ташкент, Учтепинский ра��он',
    date: 'Сегодня 10:23',
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false
  },
  {
    id: 1234456,
    status: 'unactive',
    message: 'Елка с эффиктом снега доставка бесплатная',
    price: 235000,
    location: 'Ташкент, Учтепинский ра��он',
    date: 'Сегодня 10:23',
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false
  },
  {
    id: 1234456,
    status: 'active',
    message: 'Елка с эффиктом снега доставка бесплатная',
    price: 235000,
    location: 'Ташкент, Учтепинский ра��он',
    date: 'Сегодня 10:23',
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false
  },
  {
    id: 1234456,
    status: 'unactive',
    message: 'Елка с эффиктом снега доставка бесплатная',
    price: 235000,
    location: 'Ташкент, Учтепинский ра��он',
    date: 'Сегодня 10:23',
    views: 32,
    likes: 32,
    comments: 32,
    deleted: false
  },
])
</script>
<style scoped>
    
</style>