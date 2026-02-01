import axios from "axios";
import Cookies from "js-cookie";

// Create a single axios instance lazily and attach interceptors so
// authentication concerns are centralized and easy to follow.
// - Attaches `u-x-key` header from cookie on each request.
// - Handles 401 responses globally (clears cookie + redirects to login).
// This keeps auth behavior consistent for all API calls.
let instance = null;
export const axiosInstance = () => {
  if (instance) return instance;

  instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // Request interceptor: ensure token header is present on every request
  instance.interceptors.request.use(
    (config) => {
      try {
        const token = Cookies.get("u-x-key");
        if (token) config.headers["u-x-key"] = String(token);
      } catch (e) {
        // swallow cookie read errors
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle global auth errors
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err?.response?.status;
      if (status === 401) {
        try {
          Cookies.remove("u-x-key");
        } catch (e) {}
        // navigate to login to force re-authentication
        if (typeof window !== "undefined") window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  );

  return instance;
};
