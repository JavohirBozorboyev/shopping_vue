<script setup>
import { ref, inject } from "vue";
import Avatar from "primevue/avatar";
const auth = inject("auth");
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

let navLinkData = ref([
  {
    name: "Профил",
    url: "/profil",
    icon: "pi-user",
  },
  {
    name: "Севимли",
    url: "/favorites",
    icon: "pi-heart",
  },
  {
    name: "Постларим",
    url: "/",
    icon: "pi-plus",
  },
]);
const { user } = auth;
</script>

<template>
  <div>
    <article
      class="flex flex-col items-center gap-4 bg-slate-950 p-2 py-4 rounded-md"
    >
      <Avatar
        :image="user?.attach?.originFile"
        class="mr-2"
        size="xlarge"
        shape="circle"
      />
      <div>
        <h1 class="text-lg font-medium text-white text-center">
          {{ user?.firstname }} {{ user?.lastname }}
        </h1>
        <h1 class="text-gray-200 font-light text-sm text-center">
          {{ user?.emailOrPhone }}
        </h1>
      </div>
    </article>
    <article class="mt-4">
      <p class="mb-1 text-slate-950 uppercase text-sm">Саҳифалар</p>

      <RouterLink
        v-for="item in navLinkData"
        :to="item.url"
        title="Profil"
        class="rounded-md p-2 flex items-center gap-3 md:pr-3 active:scale-95 duration-300 border border-slate-300 mt-2"
        :class="route.path == item?.url ? 'bg-slate-950' : 'bg-gray-100'"
      >
        <i
          class="pi p-[6px] rounded-[4px]"
          :class="
            route?.path == item?.url
              ? `bg-slate-950 text-white ${item?.icon}`
              : `bg-slate-950 text-white ${item?.icon}`
          "
        ></i>
        <span
          class="text-sm uppercase hidden md:block font-medium"
          :class="route.path == item?.url ? 'text-white' : 'text-slate-900'"
          >{{ item?.name }}</span
        >
      </RouterLink>
    </article>
  </div>
</template>
