<script setup>
import { ref } from "vue";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import Button from "primevue/button";
import { useAuthStore } from "@/stores/auth";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const activeSection = ref(true);

const router = useRouter();
const phone = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const authStore = useAuthStore();
const toast = useToast();
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
    toast.add({
      severity: "contrast",
      summary: "Tabriklaymiz",
      detail: "Tizimga Kirdingiz",
      life: 3000,
    });
    errorLogin.value = false;

    setTimeout(() => {
      loadinLogin.value = false;
      router.push("/");
    }, 2000);
  }
  if (res.status == 401 || res.status == 404) {
    phone.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";
    toast.add({
      severity: "error",
      summary: "Kechirasiz",
      detail: "Ro'yhatdan o'tmagan",
      life: 3000,
    });
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
    toast.add({
      severity: "contrast",
      summary: "Tabriklaymiz",
      detail: "Muofaqiyatli ro'yhatdan o'tdingiz",
      life: 3000,
    });
    error.value = false;

    setTimeout(() => {
      loadinLogin.value = false;
      router.push("/");
    }, 2000);
  }
  if (res.status == 400) {
    phone.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";
    toast.add({
      severity: "error",
      summary: "Xatolik",
      detail: "Malumotlarni tekshirib qayta ro'yhatdan o'ting!",
      life: 3000,
    });
    error.value = true;
    loadinLogin.value = false;
  }
  if (res.status == 409) {
    phone.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";
    toast.add({
      severity: "error",
      summary: "Xatolik",
      detail: "Avvalroq bunday malumotlar bilan ro'yhatdan o'tilgan.",
      life: 3000,
    });
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
            Login
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
            Sign Up
          </div>
        </div>

        <!-- Login -->
        <div v-if="activeSection" class="mt-10 flex flex-col gap-4">
          <div>
            <h1 class="text-3xl text-slate-900 font-bold">Login</h1>
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400">Phone</label>
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
            <label for="phone" class="block mb-1 text-slate-400"
              >Password</label
            >
            <Password
              placeholder="password"
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
            label="Login"
            @click="login"
            severity="contrast"
            class="mt-5"
            :loading="loadinLogin"
          />
          <div class="mt-1">
            <p class="text-gray-400">
              Don't have an account?
              <span
                @click="changeSection"
                class="text-black font-semibold cursor-pointer ml-1"
                >Sign Up here</span
              >
            </p>
          </div>
        </div>
        <!-- Sign Up -->
        <div v-if="!activeSection" class="mt-10 flex flex-col gap-4">
          <div>
            <h1 class="text-3xl text-slate-900 font-bold">Sign Up</h1>
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400"
              >First Name</label
            >
            <InputText
              type="text"
              v-model="firstName"
              placeholder="First Name"
              fluid
              :invalid="error"
            />
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400"
              >Last Name</label
            >
            <InputText
              type="text"
              v-model="lastName"
              placeholder="Last Name"
              fluid
              :invalid="error"
            />
          </div>
          <div class="flex-auto">
            <label for="phone" class="block mb-1 text-slate-400">Phone</label>
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
            <label for="phone" class="block mb-1 text-slate-400"
              >Password</label
            >
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
            label="Sign Up"
            severity="contrast"
            class="mt-5"
            @click="register"
          />
          <div class="mt-1">
            <p class="text-gray-400">
              Already have an account?
              <span
                @click="changeSection"
                class="text-black font-semibold cursor-pointer ml-1"
                >Login here</span
              >
            </p>
          </div>
        </div>
      </div>
    </article>
    <Toast />
  </div>
</template>
