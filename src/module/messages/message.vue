<template>
    <div class="container border h-full overflow-y-auto flex flex-col gap-3 p-3">
        <div v-for="item in data" @click="Chatpush(item.id)" class="card flex w-full cursor-pointer active:scale-95 font-sans bg-gray-50 rounded-lg transition duration-300 hover:scale-[1.025] p-2 gap-3 shadow md:text-xl text-slate-400 font-semibold">
            <div>
                <img class="w-11 h-11 md:h-14 md:w-14 rounded-full" :src="item.image" alt="">
            </div>
            <div>
                <h2 class="text-xs md:text-sm">{{ item.name }}</h2>    
                <h3 class="text-xs md:text-sm">ID: {{ item.id }}</h3>
        </div>  
        </div>
    </div>
</template>
<script setup>
import { ref} from "vue"
import router from '@/router';
import { defineEmits } from 'vue';

function Chatpush(id) {
    router.push(`/chat`)
    const newState = false; // yoki false ga o'zgartirishingiz mumkin
  emit('toggle-menu', newState);
}

const data= ref([
    {
        id: 1,
        name: "Javohir Bozorboyev",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    },
    {
        id: 2,
        name: "Mahmoud Mahmoud",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    },
    {
        id: 3,
        name: "Rashid Rashid",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    },
    {
        id: 4,
        name: "Rashid Rashid",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    },
    {
        id: 5,
        name: "Rashid Rashid",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    },
    {
        id: 6,
        name: "Rashid Rashid",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    },
    {
        id: 7,
        name: "Rashid Rashid",
        image: "https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
    }
])

const emit = defineEmits(['toggle-menu']);

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