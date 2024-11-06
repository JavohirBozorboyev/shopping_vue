<script setup>
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <IconField class="w-full">
      <InputIcon class="pi pi-search" />
      <InputText placeholder="Қидирмоқ" class="w-full" />
    </IconField>
  </div>
  <section class="h-auto mt-4">
    <RouterLink
      to="/chat/14"
      class="flex items-center gap-2 hover:bg-slate-100 px-2 py-1 rounded duration-300"
    >
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        class="mr-2"
        size="large"
      />
      <div>
        <h1 class="text-slate-800">Coder Fisher</h1>
      </div>
    </RouterLink>
  </section>
</template>
