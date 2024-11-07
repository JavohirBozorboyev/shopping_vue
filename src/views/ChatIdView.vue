<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import { RouterLink } from "vue-router";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
</script>

<template>
  <section class="">
    <nav
      class="bg-white md:bg-slate-100 shadow md:shadow-none w-full fixed top-0 left-0 right-0 z-[1000] md:static flex items-center gap-2 md:rounded-md px-2 overflow-hidden"
    >
      <RouterLink to="/chat" class="block p-2 rounded-md">
        <i class="pi pi-arrow-left text-slate-800"></i>
      </RouterLink>

      <div class="flex items-center gap-2 w-full p-2">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          class="mr-2"
          size="large"
        />
        <h1 class="text-slate-800 text-lg">Coder Fisher</h1>
      </div>
    </nav>
    <article
      class="min-h-[90vh] md:min-h-[70vh] my-2 rounded-md bg-slate-100"
    ></article>
    <article
      class="fixed md:static w-full bottom-0 left-0 p-2 z-[1000] bg-white md:bg-slate-100 md:rounded-md"
    >
      <div class="container flex gap-2 mx-auto">
        <InputText
          placeholder="Хабар"
          class="w-full rounded-lg"
          size="large"
          style="border-radius: 40px"
        />
        <Button
          size="small"
          severity="contrast"
          icon="pi pi-send"
          aria-label="Save"
          style="border-radius: 40px; width: 55px; font-size: 24px"
        />
      </div>
    </article>
  </section>
</template>
