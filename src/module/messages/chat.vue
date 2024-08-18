<template >
    <div  class="container p-2 flex flex-col  h-full border gap-2">
        <div class="flex flex-col overflow-y-auto h-full py-3  gap-2">
            <div v-for="item in data" class="flex gap-2">
            <div class="h-auto">
                <img class="w-14 h-14 rounded-full" :src="item.image" alt="">
            </div>
             <div class="bg-gray-100 h-auto rounded-t-2xl rounded-br-2xl p-2 mb-3">
            <p>{{ item.message }}</p>
             </div>
        </div>
        </div>
        <div class="w-full p-3 bg-slate-50">
            <form class="w-full flex gap-1">
                <div>
                    <button @click="triggerFileInput()" type="button" class="transition duration-150 active:scale-95"><i class="pi pi-paperclip text-slate-400 p-2 rounded-full" style=""></i></button>
                    <input type="file" ref="fileInput" class="hidden" @change="handleFileChange()">
                </div>
                <input type="text"  class="w-full outline-none font-semibold bg-transparent" placeholder="Type a message...">
                <button type="button" class="transition duration-150 active:scale-95"><i class="pi pi-send bg-green-400 p-2 rounded-full" style="color: white"></i></button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref} from "vue"

const data= ref([
    {
        id: 1,
        name: 'John Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hello, how are you?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: 'https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13',
        message: 'Hi, I am doing?'
    },
])

// Fayl inputiga murojaat qilish uchun `ref` yaratiladi
const fileInput = ref(null)

// Tugma bosilganda fayl inputini ishga tushirish
const triggerFileInput = () => {
  fileInput.value.click()
}

// Fayl tanlanganda ishlatiladigan funksiya
const handleFileChange = (event) => {
  if (event && event.target && event.target.files.length > 0) {
    const selectedFile = event.target.files[0]
    console.log('Tanlangan fayl:', selectedFile)
  } else {
    console.log('Hech qanday fayl tanlanmadi yoki xato yuz berdi.')
  }
}
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