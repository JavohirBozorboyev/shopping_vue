<script setup>
import { ref, inject } from "vue";
import Avatar from "primevue/avatar";
const auth = inject("auth");

const { user } = auth;
</script>
<template>
  <div class="container mx-auto px-2 py-5 min-h-screen grid grid-cols-12 gap-5">
    <div class="col-span-12 lg:col-span-4 bg-gray-50 h-full rounded-md p-4">
      <article class="flex items-center gap-4">
        <Avatar :label="user?.firstname" class="mr-2" size="xlarge" />
        <div>
          <h1 class="text-xl font-bold text-slate-900">Alisher</h1>
          <h1 class="text-slate-600">Bahramov</h1>
        </div>
      </article>

      <article class="mt-10">
        <p class="text-base">
          {{ user?.emailOrPhone }}
        </p>
      </article>
    </div>
  </div>
</template>
