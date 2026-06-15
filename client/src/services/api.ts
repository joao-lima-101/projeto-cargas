import axios from "axios";
import { triggerLogout } from "./auth-service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let token: string | null;

api.interceptors.request.use((config) => {
  token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (token) {
        localStorage.removeItem("token");
        triggerLogout();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
