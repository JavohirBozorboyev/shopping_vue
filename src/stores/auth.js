// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(Cookies.get("user") || "null") || null,
    token: Cookies.get("authToken") || null,
  }),
  actions: {
    async login(phone, password) {
      try {
        const response = await axios.post("/api/v1/auth/login", {
          emailOrPhone: phone,
          password,
        });

        this.token = response.data.body.token;
        this.user = response.data.body.user;

        Cookies.set("user", JSON.stringify(response.data.body.user), {
          expires: 7,
        });
        Cookies.set("authToken", response.data.body.token, {
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

        this.token = response.data.body.token;
        this.user = response.data.body.user;

        Cookies.set("user", JSON.stringify(response.data.body.user), {
          expires: 7,
        });
        Cookies.set("authToken", response.data.body.token, {
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
      Cookies.remove("user");
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await axios.get("/api/v1/user/get-me", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // this.logout();
      }
    },
  },
});
