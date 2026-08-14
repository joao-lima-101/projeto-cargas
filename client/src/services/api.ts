import axios from "axios";
import { triggerLogout } from "./auth-service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute =
        error.config?.url?.includes("/auth/login") ||
        error.config?.url?.includes("/auth/logout");

      if (!isAuthRoute) {
        triggerLogout();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
