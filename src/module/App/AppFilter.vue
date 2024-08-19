<script setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { RouterLink, useRoute } from "vue-router";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

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
        <IconField class="col-span-12 md:col-span-6 lg:col-span-7">
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Search" class="w-full" />
        </IconField>
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
        <Button
          label="Qidirish"
          class="col-span-4 md:col-span-2"
          severity="contrast"
        />
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
            class="flex flex-col items-center justify-center p-2 rounded-md min-w-32 cursor-pointer select-none active:scale-[0.98] duration-300"
            :class="!router.params.slug ? 'bg-black text-white' : 'bg-white'"
          >
            <span
              class="object-cover w-full h-20 rounded-md bg-black flex items-center justify-center"
              :class="!router.params.slug ? '' : null"
            >
              <i class="pi pi-crown text-white" style="font-size: 2rem"></i>
            </span>
            <p
              class="capitalize mt-1 text-xs "
              :class="!router.params.slug ? ' text-white' : 'text-gray-700'"
            >
              Asosiy sahifa
            </p>
          </RouterLink>
          <RouterLink
            :to="`/category/${item.id}`"
            v-if="!loading"
            v-for="item of ApiCategoryData"
            class="flex flex-col items-center justify-center p-1 rounded-md min-w-32 cursor-pointer select-none active:scale-[0.98] duration-300"
            :class="router.params.slug == item.id ? 'bg-black ' : 'bg-white'"
          >
            <img
              :src="item.attach.originFile"
              :alt="item.name"
              class="w-full h-20 object-cover rounded-md"
            />
            <p
              class="capitalize mt-1 text-xs text-nowrap p-1"
              :class="
                router.params.slug == item.id ? ' text-white' : 'text-gray-700'
              "
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
