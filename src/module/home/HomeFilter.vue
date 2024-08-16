<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";

import Button from "primevue/button";

const value = ref(null);
const selectedCity = ref();
const cities = ref([
  { name: "Tashkent", code: "tsh"},
  { name: "Namangan", code: "nam" },
  { name: "Andijon", code: "LDN" },
  { name: "Farg'ona", code: "IST" },
  { name: "Buhoro", code: "PRS" },
]);
</script>

<template>
  <div class="container mx-auto px-2 bg-white p-2 rounded-md">
    <div class="grid grid-cols-12 items-center gap-2">
      <InputText
        type="text"
        v-model="value"
        placeholder="Search"
        variant="filled"
        
        class="p-2 col-span-12 md:col-span-7"
      />
      <Select
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        variant="filled"
        
        checkmark
        placeholder="Barcha viloyatlar"
        class="col-span-8 md:col-span-3"
      />
      <Button label="Qidirish"  class="col-span-4 md:col-span-2" />
    </div>
  </div>
</template>
