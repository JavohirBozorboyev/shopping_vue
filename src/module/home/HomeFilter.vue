<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Avatar from "primevue/avatar";
import Button from "primevue/button";

const value = ref(null);
const selectedCity = ref();
const cities = ref([
  { name: "Tashkent", code: "tsh" },
  { name: "Namangan", code: "nam" },
  { name: "Andijon", code: "LDN" },
  { name: "Farg'ona", code: "IST" },
  { name: "Buhoro", code: "PRS" },
]);
const category = ref([{ name: "Tashkent", code: "tsh" }]);
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
    <div class="mt-5 flex gap-2 md:gap-3 overflow-x-auto">
      <div
        class="flex flex-col items-center justify-center bg-white p-2 rounded-md w-24"
      >
        <span
          class="object-cover w-full h-16 rounded-md bg-gradient-to-tr from-teal-500 to-emerald-500"
        ></span>
        <p class="uppercase mt-1 text-sm text-slate-700">Barchasi</p>
      </div>
      <div
        v-for="item in category"
        class="flex flex-col items-center justify-center bg-white p-2 rounded-md w-24"
      >
        <img
          src="https://www.talkbass.com/attachments/ferrari-vintage-yellow-front-view-cars-vehicle-15262-jpg.3175142/"
          class="object-cover w-full h-16 rounded-md"
        />
        <p class="uppercase mt-1 text-sm text-slate-700">Transport</p>
      </div>
    </div>
  </div>
</template>
