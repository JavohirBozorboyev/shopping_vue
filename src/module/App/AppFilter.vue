<script setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { RouterLink, useRoute } from "vue-router";

const value = ref(null);
let ApiCategoryData = ref(null);
let ApiRegionData = ref(null);
let loading = ref(true);

const router = useRoute();

const selectedCities = ref();

const ApiCall = async () => {
  try {
    let res = await fetch(
      "https://tez-sotish-api.uz/api/v1/category/get/all-for-front"
    );
    let region = await fetch("https://tez-sotish-api.uz/api/v1/region/get/all");
    ApiCategoryData.value = (await res.json()).body;
    ApiRegionData.value = (await region.json()).body;
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
  <div class="bg-gray-50 py-4">
    <div class="container mx-auto px-2 p-2 rounded-md">
      <div class="grid grid-cols-12 items-center gap-2">
        <InputText
          type="text"
          v-model="value"
          placeholder="Search"
          class="p-2 col-span-12 md:col-span-6 lg:col-span-7"
        />
        <MultiSelect
          v-model="selectedCities"
          :options="ApiRegionData"
          optionLabel="name"
          filter
          :loading
          placeholder="Select Cities"
          :maxSelectedLabels="3"
          class="w-full col-span-8 md:col-span-4 lg:col-span-3"
        />
        <Button label="Qidirish" class="col-span-4 md:col-span-2" />
      </div>
      <div class="overflow-x-auto">
        <div class="mt-5 flex items-center gap-2 md:gap-3 min-w-[1200px]">
          <div v-if="loading" v-for="_ in [1, 1, 1, 1, 1, 1]">
            <Skeleton size="5rem" class="min-w-32"></Skeleton>
            <Skeleton size="1rem" class="min-w-28 mt-1 mx-auto"></Skeleton>
          </div>
          <RouterLink
            to="/"
            v-if="!loading"
            class="flex flex-col items-center justify-center bg-white p-2 rounded-md min-w-32 cursor-pointer select-none"
            :class="
              !router.params.slug
                ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white'
                : null
            "
          >
            <span
              class="object-cover w-full h-20 rounded-md bg-gradient-to-tr from-teal-500 to-emerald-500"
              :class="
                !router.params.slug
                  ? 'border'
                  : null
              "
            ></span>
            <p
              class="capitalize mt-1 text-xs text-slate-700"
              :class="!router.params.slug ? ' text-white' : null"
            >
              Barchasi
            </p>
          </RouterLink>
          <RouterLink
            :to="`/category/${item.router}`"
            v-if="!loading"
            v-for="item of ApiCategoryData"
            class="flex flex-col items-center justify-center bg-white p-1 rounded-md min-w-32 cursor-pointer select-none"
            :class="
              router.params.slug == item.router
                ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white'
                : null
            "
          >
            <img
              :src="item.attach.originFile"
              :alt="item.name"
              class="w-full h-20 object-cover rounded-md"
            />
            <p
              class="capitalize mt-1 text-xs text-slate-700 text-nowrap p-1"
              :class="router.params.slug == item.router ? ' text-white' : null"
            >
              {{ item.name }}
            </p>
          </RouterLink>
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
  display: none;
}

::-webkit-scrollbar-thumb {
  background-color: gainsboro;
  border-radius: 2px;
}
</style>
