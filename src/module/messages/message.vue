<template>
  <div class="h-[100%] overflow-y-auto py-4 flex flex-col gap-3">
    
       <span class="flex justify-between md:justify-center items-center">
            <!-- <h1 class="py-2 uppercase font-bold text-slate-900">SMS</h1> -->
            <span class="w-[98%]">
              <InputGroup>
                <Button icon="pi pi-search" severity="contrast" />
    <InputText placeholder="Қидирув" />
</InputGroup>
            </span>
          </span>
    <div
      v-for="item in data"
      @click="Chatpush(item.id)"
      class="card flex w-full cursor-pointer active:scale-95 font-sans transition duration-300 hover:bg-gray-100 p-2 gap-3 md:text-xl  text-slate-400 font-semibold rounded-sm border-b"
    >
      <div>
        <img
          class="w-11 h-11 md:h-14 md:w-14 rounded-full"
          :src="item.image"
          alt=""
        />
      </div>
      <div>
        <h2 class="text-xs md:text-sm">{{ item.name }}</h2>
        <h3 class="text-xs md:text-sm">ИД: {{ item.id }}</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import router from "@/router";

const emit = defineEmits(["toggle-menu", "id"]);

function closeToogle(){
  emit("close-toogle", false);
}
function Chatpush(id) {
  emit("toggle-menu", false);
  emit("id", id);
}

const data = ref([
  {
    id: 1,
    name: "Жaвохир Бозорбойэв",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 2,
    name: "Мaхмоуд Мaхмоуд",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 3,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 4,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 5,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 6,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 7,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 8,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  },
  {
    id: 9,
    name: "Рaшид Рaшид",
    image:
      "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13",
  }
]);
</script>
<style scoped>
::-webkit-scrollbar {
  width: 5px !important;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: gainsboro;
  border-radius: 10px;
}
</style>
