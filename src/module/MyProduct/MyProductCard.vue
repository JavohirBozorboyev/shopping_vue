<script setup>
import { inject, defineEmits } from "vue";
const { data } = defineProps(["data"]);
import Image from "primevue/image";
import Button from "primevue/button";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { ref } from "vue";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const visible = ref(false);
const auth = inject("auth");
const emit = defineEmits();
const { token } = auth;
const files = ref([]);
const src = ref([]);
const toast = useToast();

const moadal = ref(false);
let uploadImageLoader = ref(false);
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

async function uploadCallback() {
  uploadImageLoader.value = true;
  try {
    const formData = new FormData();

    for (let i = 0; i < files.value.length; i++) {
      formData.append("images", files.value[i]);
    }
    formData.append("announceId", data?.id);

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
    visible.value = false;
    if (response.status == 200) {
      toast.add({
        severity: "success",
        summary: "Бажарилди",
        detail: "Расимлар ўзгартирилди",
        life: 2000,
      });
      uploadImageLoader.value = false;

      emit("update");
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Хатолик",
      detail: "Расимлар юкланмади",
      life: 2000,
    });
  }
}
async function deleteProduct(id) {
  try {
    const response = await axios.delete(`/api/v1/announcement/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      console.log(response.data);

      moadal.value = false;
      emit("update");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<template>
  <div
    class="col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80 flex flex-col justify-between"
  >
    <div class="h-36 md:h-64 xl:h-64 relative">
      <Image
        :src="data.attachUrlResponses.originFile"
        :alt="data?.title"
        class="w-full h-full object-cover rounded-t-md duration-300"
        preview
        width="100%"
      />
    </div>
    <div class="flex flex-col justify-between px-2 pt-2 xl:px-3 xl:pt-3">
      <div class="flex justify-between items-center">
        <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
          {{ data.address }}
        </p>
      </div>
      <div>
        <h1
          class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
        >
          {{ data.title }}
        </h1>
        <h1
          class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
        >
          <p class="text-xs text-gray-400 font-medium">Нарҳ :</p>
          {{ FormatCurrency(data.price, data.currencyCode) }}
        </h1>
      </div>
    </div>
    <div class="flex justify-between gap-2 p-1 mt-2 border-t">
      <div class="flex gap-2">
        <Button
          class=""
          icon="pi pi-trash "
          size="small"
          severity="danger"
          @click="moadal = true"
          text
        ></Button>
        <Button
          class=""
          @click="visible = true"
          icon="pi pi-images "
          size="small"
          severity="secondary"
          text
        ></Button>
      </div>
      <RouterLink :to="`/category/${data.categoryId}/${data.id}`">
        <Button
          class=""
          icon="pi pi-arrow-right"
          size="small"
          severity="secondary"
        ></Button>
      </RouterLink>
    </div>
    <div>
      <Dialog
        v-model:visible="visible"
        maximizable
        modal
        :header="data.title"
        class="p-0"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
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
                <Button
                  :loading="uploadImageLoader"
                  @click="uploadCallback()"
                  icon="pi pi-cloud-upload"
                  rounded
                  outlined
                  severity="success"
                  :disabled="!files || files.length === 0 || uploadImageLoader"
                ></Button>
              </div>
            </div>
          </template>
          <template #empty>
            <span>Расимлар юкланг</span>
          </template>
        </FileUpload>
      </Dialog>
    </div>
  </div>
  <Toast position="bottom-center" />

  <Dialog
    v-model:visible="moadal"
    modal
    header="Элонни Ўчириш"
    :style="{ width: '25rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw', '400px': '90vw' }"
  >
    <div
      class="rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80 flex flex-col justify-between"
    >
      <div class="relative">
        <Image
          :src="data.attachUrlResponses.originFile"
          :alt="data?.title"
          class="w-full h-full object-cover rounded-t-md duration-300"
          width="100%"
        />
      </div>
      <div class="flex flex-col justify-between p-2">
        <div class="flex justify-between items-center">
          <p class="text-[10px] lg:text-xs text-gray-400 line-clamp-1">
            {{ data.address }}
          </p>
        </div>
        <div>
          <h1
            class="text-xs lg:text-sm mt-2 text-slate-700 font-semibold line-clamp-2"
          >
            {{ data.title }}
          </h1>
          <h1
            class="text-slate-700 font-semibold text-sm mt-2 flex items-center gap-2"
          >
            <p class="text-xs text-gray-400 font-medium">Нарҳ :</p>
            {{ FormatCurrency(data.price, data.currencyCode) }}
          </h1>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        label="Бекор Қилиш"
        severity="secondary"
        size="small"
        @click="moadal = false"
      ></Button>
      <Button
        size="small"
        type="button"
        label="Элонни Ўчириш"
        severity="danger"
        @click="deleteProduct(data.id)"
      ></Button>
    </div>
  </Dialog>
</template>
