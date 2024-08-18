<template>
    <section class="">
        <div class="container mx-auto p-2 flex flex-col">
            <TopNav></TopNav>
            <div class="flex">
                <span @click="toggleMenu()" class="absolute bg-slate-50 p-1 rounded-full z-50 ml-1 mt-2 cursor-pointer md:hidden"><i class="pi pi-list text-slate-400"></i></span>
                <div :class="menu ? 'left h-[75vh] relative w-full md:block md:w-1/3 ' : 'left h-[75vh] hidden md:block md:w-1/3 '">
                <message></message>
            </div>
            <div class="right h-[75vh] w-full md:w-3/4">
              <RouterView></RouterView>
            </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import message from "../module/messages/message.vue"
import TopNav from "../components/Favorits/topNav.vue"


let menu=ref(true)

function toggleMenu() {
    menu.value =!menu.value
}
</script>
<style scoped>
    
</style>