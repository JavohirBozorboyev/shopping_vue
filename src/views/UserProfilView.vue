<script setup>
import { ref, inject } from "vue";
import Avatar from "primevue/avatar";
const auth = inject("auth");

const { user } = auth;
</script>
<template>
  <div class="min-h-screen">salom</div>
</template>
