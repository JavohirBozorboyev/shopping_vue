import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const search = ref("");
  const city = ref([]);

  function setSearch(term) {
    search.value = term;
  }
  function setCity(cityName) {
    city.value = cityName;
  }

  return { search, city, setSearch, setCity };
});
