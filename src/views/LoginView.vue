<script setup>
import { ref } from "vue";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import Button from "primevue/button";
import { useAuthStore } from "@/stores/auth";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
const activeSection = ref(true);

const router = useRouter();
const phone = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const authStore = useAuthStore();

let error = ref(false);
let errorLogin = ref(false);
let loadinLogin = ref(false);

const changeSection = () => {
  activeSection.value = !activeSection.value;
};

const login = async () => {
  loadinLogin.value = true;
  const res = await authStore.login(phone.value, password.value);
  if (res.status == 200) {
    activeSection.value = true;

    errorLogin.value = false;
    router.push("/");
    setTimeout(() => {
      loadinLogin.value = false;
      window.location.reload();
    }, 1000);
  }
  if (res.status == 401 || res.status == 404) {
    phone.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";

    errorLogin.value = true;
    loadinLogin.value = false;
  }
};
const register = async () => {
  const res = await authStore.register(
    firstName.value,
    lastName.value,
    phone.value,
    password.value
  );
  if (res.status == 200) {
    error.value = false;

    router.push("/");
    setTimeout(() => {
      loadinLogin.value = false;
      window.location.reload();
    }, 1000);
  }
  if (res.status == 400) {
    phone.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";

    error.value = true;
    loadinLogin.value = false;
  }
  if (res.status == 409) {
    phone.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";

    error.value = true;
    loadinLogin.value = false;
  }
};
</script>

<template>
  <div class="container px-2 mx-auto py-10 min-h-[80vh] flex items-center">
    <article class="w-full">
      <div class="max-w-lg border p-4 rounded-md mx-auto">
        <div
          class="grid grid-cols-2 items-center gap-2 bg-gray-100 p-2 rounded-md"
        >
          <div
            @click="changeSection"
            class="p-2 rounded-md px-4 text-center active:scale-95 duration-300 cursor-pointer"
            :class="
              activeSection
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-900 '
            "
          >
            Тизимга кириш
          </div>
          <div
            @click="changeSection"
            class="p-2 rounded-md px-4 text-center active:scale-95 duration-300 cursor-pointer"
            :class="
              !activeSection
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-900 '
            "
          >
            Рўйҳатдан ўтиш
          </div>
        </div>

        <!-- Login -->
        <div v-if="activeSection" class="mt-10 flex flex-col gap-4">
          <div>
            <h1 class="text-3xl text-slate-900 font-bold">Тизимга кириш</h1>
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400"
              >Телефон Рақам</label
            >
            <InputMask
              id="phone"
              v-model="phone"
              mask="+999 99-999-99-99"
              placeholder="+998 91-123-45-67"
              fluid
              :invalid="errorLogin"
            />
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400">Парол</label>
            <Password
              placeholder="Парол"
              toggleMask
              :feedback="false"
              class=""
              variant="filled"
              size="large"
              fluid
              v-model="password"
              :invalid="errorLogin"
            />
          </div>

          <Button
            label="Кириш"
            @click="login"
            severity="contrast"
            class="mt-5"
            :loading="loadinLogin"
          />
          <div class="mt-1">
            <p class="text-gray-400">
              Ҳисобингиз йўқми
              <span
                @click="changeSection"
                class="text-black font-semibold cursor-pointer ml-1"
                >Рўйҳатдан ўтиш</span
              >
            </p>
          </div>
        </div>
        <!-- Sign Up -->
        <div v-if="!activeSection" class="mt-10 flex flex-col gap-4">
          <div>
            <h1 class="text-3xl text-slate-900 font-bold">Рўйҳатдан ўтиш</h1>
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400"
              >Исмингиз</label
            >
            <InputText
              type="text"
              v-model="firstName"
              placeholder="Исмингиз"
              fluid
              :invalid="error"
            />
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400"
              >Фамилиянгиз</label
            >
            <InputText
              type="text"
              v-model="lastName"
              placeholder="Фамилиянгиз"
              fluid
              :invalid="error"
            />
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400"
              >Телефон Рақамингиз</label
            >
            <InputMask
              id="phone"
              mask="+999 99-999-99-99"
              placeholder="+998 91-123-45-67"
              fluid
              v-model="phone"
              aria-autocomplete="none"
              :invalid="error"
            />
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400">Парол</label>
            <Password
              placeholder="password"
              toggleMask
              :feedback="false"
              class=""
              variant="filled"
              size="large"
              fluid
              v-model="password"
              :invalid="error"
            />
          </div>

          <Button
            label="Рўйҳатдан Ўтиш"
            severity="contrast"
            class="mt-5"
            @click="register"
          />
          <div class="mt-1">
            <p class="text-gray-400">
              Ҳисобингиз борми?
              <span
                @click="changeSection"
                class="text-black font-semibold cursor-pointer ml-1"
                >Тизимга кириш</span
              >
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
