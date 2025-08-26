// api.ts
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`,
  withCredentials: true,
});

const REFRESH_URL = "/auth/refresh-token";

let isRefreshing = false;
let refreshSubscribers: Array<() => void> = [];

const handleLogout = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
    window.location.href = "/auth";
  }
};

const subscribeTokenRefresh = (cb: () => void) => {
  refreshSubscribers.push(cb);
};
const onRefreshSuccess = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

// Use a separate client for refresh OR guard the URL
const refreshClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    // Not our case
    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // IMPORTANT: don't try to refresh if the failing request IS the refresh
    if (originalRequest.url?.includes(REFRESH_URL)) {
      // handleLogout();
      return Promise.reject(error);
    }

    // Prevent infinite retries on the same originalRequest
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue while a refresh is in-flight
      return new Promise((resolve) => {
        subscribeTokenRefresh(() => resolve(api(originalRequest)));
      });
    }

    // Start refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshClient.post(REFRESH_URL); // separate client avoids self-interception
      isRefreshing = false;
      onRefreshSuccess();
      return api(originalRequest); // replay original
    } catch (e) {
      isRefreshing = false;
      refreshSubscribers = [];
      // handleLogout();
      return Promise.reject(e);
    }
  }
);

export default api;
