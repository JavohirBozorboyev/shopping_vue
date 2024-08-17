<script setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Avatar from "primevue/avatar";
import Button from "primevue/button";

import Skeleton from "primevue/skeleton";

const value = ref(null);
let ApiCategoryData = ref(null);
let loading = ref(true);

const selectedCity = ref();
const cities = ref([
  { name: "Tashkent", code: "tsh" },
  { name: "Namangan", code: "nam" },
  { name: "Andijon", code: "LDN" },
  { name: "Farg'ona", code: "IST" },
  { name: "Buhoro", code: "PRS" },
]);
const category = ref([{ name: "Tashkent", code: "tsh" }]);

const ApiCall = async () => {
  try {
    let res = await fetch(
      "https://tez-sotish-api.uz/api/v1/category/get/all-for-front"
    );
    ApiCategoryData.value = (await res.json()).body;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false; // So'rov tugagach, loaderni yashirish
  }
};

onMounted(() => {
  ApiCall();
});
</script>

<template>
  <div class="container mx-auto px-2 border bg-gray-50 p-2 rounded-md">
    <div class="grid grid-cols-12 items-center gap-2">
      <InputText
        type="text"
        v-model="value"
        placeholder="Search"
        class="p-2 col-span-12 md:col-span-7"
      />
      <Select
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        checkmark
        placeholder="Barcha viloyatlar"
        class="col-span-8 md:col-span-3"
      />
      <Button label="Qidirish" class="col-span-4 md:col-span-2" />
    </div>
    <div class="overflow-x-auto">
      <div class="mt-5 flex gap-2 md:gap-3 min-w-[1200px]">
        <div v-if="loading" v-for="_ in [1, 1, 1, 1, 1, 1]">
          <Skeleton size="5rem" class="min-w-32"></Skeleton>
          <Skeleton size="1rem" class="min-w-28 mt-1 mx-auto"></Skeleton>
        </div>
        <div
          v-if="!loading"
          class="flex flex-col items-center justify-center bg-white p-2 rounded-md min-w-32 cursor-pointer select-none"
        >
          <span
            class="object-cover w-full h-20 rounded-md bg-gradient-to-tr from-teal-500 to-emerald-500"
          ></span>
          <p class="capitalize mt-1 text-xs text-slate-700">Barchasi</p>
        </div>
        <div
          v-if="!loading"
          v-for="item of ApiCategoryData"
          class="flex flex-col items-center justify-center bg-white p-1 rounded-md min-w-32 cursor-pointer select-none"
        >
          <img
            :src="item.attach.originFile"
            :alt="item.name"
            class="w-full h-20 object-cover rounded-md"
          />
          <p class="capitalize mt-1 text-xs text-slate-700 text-nowrap p-1">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 2px !important;
  height: 4px !important;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: gainsboro;
  border-radius: 2px;
}
</style>
