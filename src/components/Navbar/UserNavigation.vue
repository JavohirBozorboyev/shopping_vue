<script setup>
import { ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
import Avatar from "primevue/avatar";
import Drawer from "primevue/drawer";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Password from "primevue/password";
import axios from "axios";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth";
const toast = useToast();

const router = useRouter();
const visible = ref(false);
const mod = ref(false);
const auth = inject("auth");
const { user, token } = auth;
const userData = reactive({
  firstname: user?.firstname,
  lastname: user?.lastname,
  phone: user?.phone,
  password: null,
});

const authStore = useAuthStore();
const updateUser = async () => {
  try {
    const response = await axios.patch(
      "/api/v1/user/update-me",
      {
        firstname: userData.firstname.trim(),
        lastname: userData.lastname.trim(),
        phone: userData.phone.trim(),
        password: userData.password.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("User updated successfully:", response.data);
    if (response.status == 200) {
      mod.value = false;
      toast.add({
        severity: "info",
        summary: "Муофақиятли",
        detail: "Малумотларингиз янгиланди",
        life: 2000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Хато",
      detail: "Малумотларингиз янгиланмади",
      life: 2000,
    });
  }
};

const deleteAccount = async () => {
  try {
    const response = await axios.delete("/api/v1/user/deleteMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Account deleted successfully:", response.data);
    if (response.status == 200) {
      authStore.logout();
      window.location.reload();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Хато",
      detail: "Малумотларингиз янгиланмади",
      life: 2000,
    });
  }
};

defineExpose({
  visible,
});
</script>

<template>
  <Drawer v-model:visible="visible" position="right">
    <template #header> </template>
    <article class="bg-slate-100 p-4 rounded-md">
      <div class="flex flex-col gap-3 justify-center items-center">
        <Avatar
          :image="user?.attach?.originFile"
          shape="circle"
          size="xlarge"
        />
        <span class="font-bold"
          >{{ user?.firstname }} {{ user?.lastname }}</span
        >
      </div>
    </article>
    <article class="mt-4">
      <div
        class="bg-slate-100 p-2 rounded-md text-slate-700 flex items-center gap-2"
      >
        <p class="text-[10px] uppercase">Телефон :</p>
        <p>{{ user?.emailOrPhone }}</p>
      </div>
    </article>
    <article
      class="mt-4 flex flex-col items-start p-2 px-3 bg-slate-100 rounded-md"
    >
      <div class="w-full flex justify-between items-center">
        <label for="" class="text-sm uppercase col-span-4">Таҳрирлаш:</label>
        <Button
          @click="mod = true"
          icon="pi pi-pencil"
          class="col-span-8"
          size="small"
          severity="info"
        ></Button>
      </div>
      <Divider />
      <div class="w-full flex justify-between items-center">
        <label for="" class="text-sm uppercase col-span-4"
          >Аccоунтни ўчириш:</label
        >
        <Button
          icon="pi pi-trash"
          class="col-span-8"
          size="small"
          severity="danger"
          @click="deleteAccount"
        ></Button>
      </div>
    </article>

    <template #footer>
      <div class="flex items-center gap-2">
        <Button
          label="Тизимдан чиқиш"
          icon="pi pi-sign-out"
          class="flex-auto"
          severity="danger"
          outlined
          @click="
            () => {
              auth.logout();
              router.go();
            }
          "
        ></Button>
      </div>
    </template>
  </Drawer>
  <Dialog
    v-model:visible="mod"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <div class="flex gap-2 flex-col mb-2">
      <label for="username" class="text-xs">Ism:</label>
      <InputText v-model="userData.firstname" class="flex-auto" />
    </div>
    <div class="flex gap-2 flex-col mb-4">
      <label for="email" class="text-xs">Familiya:</label>
      <InputText v-model="userData.lastname" class="flex-auto" />
    </div>
    <div class="flex gap-2 flex-col mb-2">
      <label for="username" class="text-xs">Telefon Raqam:</label>
      <InputMask
        v-model="userData.phone"
        id="phone"
        mask="+999 99-999-99-99"
        placeholder="+998 91-123-45-67"
        fluid
      />
    </div>
    <div class="flex gap-2 flex-col mb-4">
      <label for="email" class="text-xs">Parol:</label>
      <Password
        v-model="userData.password"
        placeholder="Парол"
        toggleMask
        :feedback="false"
        class=""
        variant="filled"
        fluid
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        size="small"
        @click="mod = false"
      ></Button>
      <Button
        type="button"
        label="Save"
        size="small"
        @click="updateUser"
      ></Button>
    </div>
  </Dialog>
  <Toast position="bottom-center" />
</template>
