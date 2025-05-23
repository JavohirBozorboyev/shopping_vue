<script setup>
import axios from "axios";
import Button from "primevue/button";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import FileUpload from "primevue/fileupload";

import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const auth = inject("auth");
const router = useRouter();
const { user, token } = auth;
const toast = useToast();
const selectedCity = ref();
const ApiCategoryData = ref();
let ApiRegionData = ref(null);

let loading = ref(true);
let PostLoading = ref(false);
// input v-model refs
const title = ref(null);
const description = ref(null);
const addres = ref(null);
const miqdor = ref(null);
const contact = ref(user?.emailOrPhone ?? "");
const files = ref([]);
const src = ref([]);
// input v-model error
const errors = ref({
  title: "",
  description: "",
  address: "",
  miqdor: "",
  category: "",
});

const countriesMoneyType = ref([
  { name: "O'zbekiston (UZS)", currency: "UZS", locale: "uz-UZ" },
  { name: "Rossiya (RUB)", currency: "RUB", locale: "ru-RU" },
  { name: "Amerika (USD)", currency: "USD", locale: "en-US" },
  { name: "Qozog'iston (KZT)", currency: "KZT", locale: "kk-KZ" },
  { name: "Xitoy (CNY)", currency: "CNY", locale: "zh-CN" },
  { name: "Turkiya (TRY)", currency: "TRY", locale: "tr-TR" },
]);

let countriesMoneyTypeSellected = ref({
  name: "O'zbekiston (UZS)",
  currency: "UZS",
  locale: "uz-UZ",
});

const ApiCall = async () => {
  try {
    let res = await axios.get(
      "https://api.tez-sotish.uz/api/v1/category/get/all-for-front"
    );

    let region = await fetch(
      "https://api.tez-sotish.uz/api/v1/region/get/all-tree"
    );
    ApiRegionData.value = (await region.json()).body;
    ApiCategoryData.value = res.data.body.map((item) => {
      return { name: item.name, id: item.id };
    });
  } catch (error) {
    console.log(error, "err");
  } finally {
    loading.value = false; // So'rov tugagach, loaderni yashirish
  }
};

function validateForm() {
  let isValid = true;

  // Xatoliklarni tozalash
  errors.value = {
    title: "",
    description: "",
    address: "",
    miqdor: "",
    category: "",
  };

  if (!title.value) {
    errors.value.title = "Сарлавҳа киритилиши шарт!";
    isValid = false;
  }
  if (!description.value) {
    errors.value.description = "Малумот киритилиши шарт!";
    isValid = false;
  }
  if (!addres.value) {
    errors.value.address = "Манзил киритилиши шарт!";
    isValid = false;
  }
  if (!miqdor.value) {
    errors.value.miqdor = "Миқдор киритилиши шарт!";
    isValid = false;
  }
  if (!selectedCity.value) {
    errors.value.category = "Категория танланиши шарт!";
    isValid = false;
  }

  return isValid;
}

async function addNewPost() {
  if (!validateForm()) {
    return;
  }
  PostLoading.value = true;
  const itemData = {
    title: title.value,
    categoryId: selectedCity.value?.id,
    description: description.value,
    priceTag: {
      currencyId: 2,
      price: String(miqdor.value),
    },
    contactInfo: {
      phone: user?.emailOrPhone,
      address: addres.value,
      regionId: addres?.value?.id,
    },
  };

  try {
    const response = await axios.post("/api/v1/announcement/add", itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      uploadCallback(response.data.body.id);
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

function onFileSelect(event) {
  const item = event.files;
  src.value = [];

  for (let i = 0; i < item.length; i++) {
    const file = item[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      src.value.push(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  files.value = item;
}

async function uploadCallback(id) {
  try {
    const formData = new FormData();

    for (let i = 0; i < files.value.length; i++) {
      formData.append("images", files.value[i]);
    }
    formData.append("announceId", id);

    const response = await axios.post(
      "/api/v1/announcement/save/images",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status == 200) {
      PostLoading.value = false;
      toast.add({
        severity: "success",
        summary: "Муофақиятли",
        detail: "Янги элон жойланди",
        life: 2000,
      });
      setTimeout(() => {
        router.push("/profil/product");
      }, 2000);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Хато",
      detail: "Элон жойланмади",
      life: 2000,
    });
  }
}

onMounted(() => {
  ApiCall();
});
</script>

<template>
  <div>
    <div
      class="flex justify-between items-center bg-slate-900 p-2 px-3 rounded-md"
    >
      <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white">
        Янги элон қўшиш
      </h1>
    </div>
    <main class="mt-2 bg-gray-50 rounded-md p-2 min-h-screen pb-10">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
          <FileUpload
            name="demo[]"
            :multiple="true"
            accept="image/*"
            @select="onFileSelect"
            :maxFileSize="10000000"
          >
            <template #header="{ chooseCallback, clearCallback, files }">
              <div
                class="flex flex-wrap justify-between items-center flex-1 gap-4"
              >
                <div class="flex gap-2 justify-between items-center w-full">
                  <article class="flex gap-2">
                    <Button
                      @click="chooseCallback()"
                      icon="pi pi-images"
                      rounded
                      outlined
                      severity="secondary"
                    ></Button>

                    <Button
                      @click="clearCallback()"
                      icon="pi pi-times"
                      rounded
                      outlined
                      severity="danger"
                      :disabled="!files || files.length === 0"
                    ></Button>
                  </article>
                </div>
              </div>
            </template>
            <template #empty>
              <span>Расимлар юкланг</span>
            </template>
          </FileUpload>
        </div>
        <h1 class="text-lg lg:text-xl col-span-12">Малумотлар</h1>
        <p v-if="errors.title" class="text-red-500 col-span-12">
          {{ errors.title }}
        </p>

        <InputText
          placeholder="Пост сарлавҳаси"
          type="text"
          v-model="title"
          class="col-span-12"
        />
        <p v-if="errors.description" class="text-red-500 col-span-12">
          {{ errors.description }}
        </p>
        <Textarea
          v-model="description"
          rows="5"
          cols="30"
          class="col-span-12"
          placeholder="Пост малумотлари"
        />
        <article class="col-span-12 md:col-span-4">
          <p
            v-if="errors.category"
            class="text-red-500 col-span-12 md:col-span-4"
          >
            {{ errors.category }}
          </p>
          <Select
            v-model="selectedCity"
            :options="ApiCategoryData"
            optionLabel="name"
            placeholder="Категорй танланг"
            class="w-full"
            :loading="loading"
          />
        </article>

        <article class="col-span-12 md:col-span-8">
          <p v-if="errors.address" class="text-red-500">{{ errors.address }}</p>
          <Select
            v-model="addres"
            :options="ApiRegionData"
            filter
            :loading="loading"
            showClear
            optionLabel="name"
            placeholder="Шаҳар танлаш"
            class="w-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </article>
        <Divider class="col-span-12" />
        <p v-if="errors.miqdor" class="text-red-500 col-span-12">
          {{ errors.miqdor }}
        </p>
        <Select
          v-model="countriesMoneyTypeSellected"
          :options="countriesMoneyType"
          optionLabel="name"
          placeholder="Валюта тури"
          class="col-span-12 lg:col-span-4"
        />

        <InputNumber
          v-model="miqdor"
          placeholder="Миқдорни киритинг"
          inputId="currency-us"
          mode="currency"
          :currency="countriesMoneyTypeSellected?.currency ?? `UZS`"
          :locale="countriesMoneyTypeSellected?.locale ?? `uz-UZ`"
          fluid
          class="col-span-12 lg:col-span-6"
        />
        <Divider class="col-span-12" />
        <h1 class="text-lg lg:text-xl col-span-12">Контакат</h1>
        <InputText
          v-model="contact"
          placeholder="Телефон Рақам"
          type="text"
          class="col-span-12 sm:col-span-6 lg:col-span-4"
        />
        <article class="col-span-12 mt-5">
          <Button
            @click="addNewPost"
            label="Янги элонни қўшиш"
            class=""
            severity="contrast"
            size="large"
            :loading="PostLoading"
          />
        </article>
      </div>
    </main>
    <Toast position="bottom-right" group="br" />
  </div>
</template>
