<script setup>
import { ref, onMounted, watchEffect } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { RouterLink, useRoute } from "vue-router";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { useSearchStore } from "@/stores/searchStore";
import { useRouter } from "vue-router";
import Select from "primevue/select";

const searchStore = useSearchStore();

let ApiCategoryData = ref(null);
let ApiRegionData = ref(null);
let loading = ref(true);

const route = useRoute();
const router = useRouter();

const ApiCall = async () => {
  try {
    let res = await fetch(
      "https://tez-sotish-api.uz/api/v1/category/get/all-for-front"
    );
    let region = await fetch("https://tez-sotish-api.uz/api/v1/region/get/all");
    ApiCategoryData.value = (await res.json()).body;
    ApiRegionData.value = (await region.json()).body;
  } catch (error) {
    console.log(error, "err");
  } finally {
    loading.value = false; // So'rov tugagach, loaderni yashirish
  }
};

const SearchFunc = () => {
  searchStore.setSearch(searchStore.search);
  searchStore.setCity(searchStore.city);
  router.push("/search");
};

watchEffect(() => {
  searchStore;
  // console.log(searchStore.city, "filter");
});

onMounted(() => {
  ApiCall();
});
</script>

<template>
  <div class="bg-slate-100 md:py-2">
    <div class="container mx-auto px-2 p-2 rounded-md">
      <div class="overflow-x-auto">
        <div class="flex items-center gap-2 md:gap-3 min-w-[1200px]">
          <div v-if="loading" v-for="_ in [1, 1, 1, 1, 1, 1]">
            <Skeleton size="5rem" class="min-w-32"></Skeleton>
            <Skeleton size="1rem" class="min-w-28 mt-1 mx-auto"></Skeleton>
          </div>

          <RouterLink
            :to="`/category/${item.id}`"
            v-if="!loading"
            v-for="item of ApiCategoryData"
            class="flex flex-col items-center justify-center p-1 rounded-md min-w-32 cursor-pointer select-none active:scale-[0.98] duration-300"
            :class="route.params.slug == item.id ? 'bg-slate-950 ' : 'bg-white'"
          >
            <img
              :src="item.attach.originFile"
              :alt="item.name"
              class="w-full h-20 object-cover rounded-md"
            />
            <p
              class="capitalize mt-1 text-xs text-nowrap p-1"
              :class="
                route.params.slug == item.id ? ' text-white' : 'text-gray-700'
              "
            >
              {{ item.name }}
            </p>
          </RouterLink>
        </div>
      </div>
      <div class="grid grid-cols-12 items-center gap-2 mt-6">
        <IconField class="col-span-12 md:col-span-6 lg:col-span-7">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchStore.search"
            placeholder="Элонларни қидриш"
            class="w-full"
          />
        </IconField>
        <Select
          v-model="searchStore.city"
          :options="ApiRegionData"
          filter
          :loading="loading"
          showClear
          optionLabel="name"
          placeholder="Шаҳар танлаш"
          class="w-full col-span-8 md:col-span-4 lg:col-span-3"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Select>

        <Button
          @click="SearchFunc"
          label="Қидриш"
          class="col-span-4 md:col-span-2"
          severity="contrast"
        />
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

