<template>
  <div class="rounded flex flex-col gap-2 dark:border-surface-700">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Skeleton width="100%" height="450px"></Skeleton>
      <Skeleton width="100%" height="450px"> </Skeleton>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Skeleton width="100%" height="450px"></Skeleton>
      <Skeleton width="100%" height="450px"> </Skeleton>
    </div>
  </div>
</template>
<script setup>
import Skeleton from "primevue/skeleton";
</script>
<style scoped></style>
