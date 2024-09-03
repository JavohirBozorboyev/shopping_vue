<template>
  <section class="">
    <div class="container px-2 mx-auto grid grid-cols-12">
      <div :class="menu ? 'col-span-12 md:col-span-4' : 'hidden md:block md:col-span-4'">
        <ScrollPanel class="w-full flex flex-col" style="height: 90vh">
          <message @toggle-menu="handleToggleMenu" @id="handleId" @close-toogle="handleToggleMenu"></message>
        </ScrollPanel>
      </div>
      <div
        :class="
          menu
            ? 'hidden md:block col-span-12 md:col-span-8'
            : 'col-span-12 md:col-span-8'
        "
      >
        <span class="md:hidden">
          <i @click="toggleMenu" class="pi pi-bars block md:hidden"></i>
        </span>
        <div class="flex border-b bg-slate-200/50 flex-col gap-2">
              <div
      class="card flex w-full font-sans p-2 gap-3 md:text-xl text-slate-400 font-semibold"
    >
      <div>
        <img
          class="w-11 h-11 md:h-10 md:w-10 rounded-full"
          src="https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13"
          alt=""
        />
      </div>
      <div>
        <h2 class="text-xs md:text-sm">Javohir Bozorboyev</h2>
        <h3 class="text-xs md:text-sm">Last seen {{Id}} hours ago</h3>
      </div>
    </div>
        </div>
        <ScrollPanel class="w-full" style="height: 83vh">
           <div class="p-2 flex flex-col h-full gap-2 bg-slate-200/50">
    <div :class="Id ? 'flex flex-col overflow-y-auto h-full py-3 gap-2' : 'hidden'">
      <div
       
        :class="Id == 1 ? 'flex flex-row-reverse gap-2' : 'flex  gap-2'"
      >
        <div class="h-auto">
          <img class="w-12 h-12 rounded-full" src="https://avatars.mds.yandex.net/i?id=9f5947399d43b18bbc0cee78662bf69faa30fa8f-5162789-images-thumbs&n=13" alt="" />
        </div>
        <div
          :class="
            Id == 1
              ? 'bg-white h-auto rounded-t-2xl rounded-bl-2xl p-2 mb-3'
              : 'bg-white h-auto rounded-t-2xl rounded-br-2xl p-2 mb-3'
          "
        >
          <p>{{Id}}</p>
        </div>
      </div>
    </div>
    <div class="w-[96.5%] absolute bottom-6 left-auto right-auto p-3 rounded-lg bg-white">
      <form class="w-full flex gap-1">
        <div>
          <button
            @click="triggerFileInput()"
            type="button"
            class="transition duration-150 active:scale-95"
          >
            <i
              class="pi pi-paperclip text-slate-400 p-2 rounded-full"
              style=""
            ></i>
          </button>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileChange()"
          />
        </div>
        <input
          type="text"
          class="w-full outline-none font-semibold bg-transparent"
          placeholder="Type a message..."
        />
        <Button
          icon="pi pi-send"
          type="button"
          size="small"
          severity="contrast"
          class="transition duration-150 active:scale-95"
        ></Button>
      </form>
    </div>
  </div>
        </ScrollPanel>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import message from "../module/messages/message.vue";
import Button from "primevue/button";
import ScrollPanel from "primevue/scrollpanel";

let menu = ref(true);
let Id = ref(0);


function toggleMenu() {
  menu.value = !menu.value;
}

function handleToggleMenu(newState) {
  menu.value = newState;
}

function handleId(id) {
  Id.value = id;
}
</script>
<style scoped></style>
