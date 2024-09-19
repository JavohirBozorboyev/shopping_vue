<script setup>
import { ref, inject } from "vue";
import Avatar from "primevue/avatar";
const auth = inject("auth");

const { user } = auth;

console.log(user);
</script>
<template>
  <div class="min-h-screen">salom</div>
</template>
