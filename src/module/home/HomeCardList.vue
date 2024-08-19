<script setup>
import { ref, onMounted } from "vue";
import HomeCard from "./HomeCard.vue";
import Paginator from "primevue/paginator";

const ApiCall = async () => {
  try {
    let res = await fetch(
      "https://tez-sotish-api.uz/api/v1/category/tree/top/ancestors?childId=1"
    );
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  ApiCall();
});
</script>

<template>
  <div
    class="container mx-auto px-2 bg-gray-50 rounded-md p-2 grid grid-cols-12"
  >
    <HomeCard />
    <div class="col-span-12 mt-2 border rounded-md overflow-hidden">
      <Paginator
        :rows="10"
        :totalRecords="120"
        :rowsPerPageOptions="[10, 20, 40, 60]"
        class=""
      ></Paginator>
    </div>
  </div>
</template>

<!-- {process.env.Api_URl}/api/v1/category/tree/top/ancestors -->
