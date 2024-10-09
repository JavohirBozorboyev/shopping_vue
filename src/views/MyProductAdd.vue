<script setup>
import axios from "axios";
import Button from "primevue/button";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import { ref, onMounted, watchEffect, inject } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const auth = inject("auth");
const router = useRouter();
const { user, token } = auth;
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
    let res = await axios("/api/v1/category/get/all-for-front");
    let region = await fetch("https://tez-sotish-api.uz/api/v1/region/get/all");
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
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        title: "Янги Элон Жойланди",
      });
      PostLoading.value = false;

      setTimeout(() => {
        router.push("/profil/product");
      }, 2000);
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
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
  </div>
</template>
