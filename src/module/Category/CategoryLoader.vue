<script setup>
import Skeleton from "primevue/skeleton";
</script>

<template>
  <div
    class="col-span-6 xl:col-span-4 2xl:col-span-3 p-2 xl:p-3 rounded-md border min-h-80"
  >
    <Skeleton class="mb-2 h-40" height="12rem"></Skeleton>

    <div class="grid grid-cols-12 items-center gap-2">
      <Skeleton class="mb-2 col-span-8"></Skeleton>
      <Skeleton class="mb-2 col-span-4"></Skeleton>
    </div>

    <Skeleton class="mt-1" height="1.5rem"></Skeleton>
    <Skeleton class="mt-3"></Skeleton>
    <div class="grid grid-cols-12 items-center gap-2 mt-5">
      <Skeleton class="mb-2 col-span-2" height="2rem"></Skeleton>
      <Skeleton class="mb-2 col-span-2" height="2rem"></Skeleton>
      <div class="col-span-8 flex justify-end">
        <Skeleton class="mb-2" width="2rem" height="2rem"></Skeleton>
      </div>
    </div>
  </div>
</template>
