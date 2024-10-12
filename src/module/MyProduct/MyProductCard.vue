<script setup>
import { inject, defineEmits } from "vue";
const { data } = defineProps(["data", "favoriteData"]);
import Image from "primevue/image";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";

const visible = ref(false);
const toast = useToast();
const auth = inject("auth");
const router = useRouter();
const emit = defineEmits();
const { token } = auth;
const onAdvancedUpload = (e) => {
  console.log(e);

  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};
</script>
<template>
  <div
    class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md border duration-300 overflow-hidden hover:bg-slate-100/80 flex flex-col justify-between"
  >
    <div class="h-48 md:min-h-48 relative">
      <Image
        :src="data.attachUrlResponses.originFile"
        :alt="data?.title"
        class="w-full h-full object-cover rounded-t-md duration-300"
        preview
        width="100%"
      />

      <Button
        @click="visible = true"
        class="absolute float-right -mt-7 mr-2"
        icon="pi pi-images "
        size="large"
        severity="contrast"
        rounded
      ></Button>
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
          text
        ></Button>
        <Button
          class=""
          icon="pi pi-pencil "
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
        <Toast />
        <FileUpload
          name="demo[]"
          url="/api/upload"
          @upload="onAdvancedUpload($event)"
          :multiple="true"
          accept="image/*"
          :maxFileSize="1000000"
        >
          <template
            #header="{ chooseCallback, uploadCallback, clearCallback, files }"
          >
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
                  @click="uploadEvent(uploadCallback)"
                  icon="pi pi-cloud-upload"
                  rounded
                  outlined
                  severity="success"
                  :disabled="!files || files.length === 0"
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
</template>
