// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: Cookies.get("authToken") || null,
  }),
  actions: {
    async login(phone, password) {
      try {
        const response = await axios.post("/api/v1/auth/login", {
          emailOrPhone: phone,
          password,
        });

        Cookies.set("user", JSON.stringify(response.data.body.user), {
          expires: 7,
        });
        Cookies.set("authToken", JSON.stringify(response.data.body.token), {
          expires: 7,
        });
        return response;
      } catch (error) {
        return error.response;
      }
    },
    async register(firstname, lastname, phone, password) {
      try {
        const response = await axios.post("/api/v1/auth/register", {
          firstname: firstname,
          lastname: lastname,
          emailOrPhone: phone,
          password: password,
        });

        Cookies.set("user", JSON.stringify(response.data.body.user), {
          expires: 7,
        });
        Cookies.set("authToken", JSON.stringify(response.data.body.token), {
          expires: 7,
        });

        return response;
      } catch (error) {
        return error.response;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      Cookies.remove("authToken");
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await axios.get("https://your-auth-api.com/user", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        this.logout();
      }
    },
  },
});
