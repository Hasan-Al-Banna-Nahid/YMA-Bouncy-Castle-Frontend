// api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`,
  withCredentials: true,
});

const REFRESH_URL = "/auth/refresh-token";
// Any 401 from these endpoints should NOT trigger refresh
const NO_REFRESH_ON_401 = [REFRESH_URL, "/auth/login", "/auth/register"];

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

// Optional: extend request config with our _retry flag
interface RetriableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Use a separate client for refresh (so its 401s aren’t intercepted)
const refreshClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error?.config as RetriableRequestConfig | undefined;
    const status = error?.response?.status;

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    const reqUrl = originalRequest.url ?? "";

    // ⛔️ Never try to refresh for these endpoints (incl. refresh itself)
    if (NO_REFRESH_ON_401.some((p) => reqUrl.includes(p))) {
      // Optionally: handleLogout();
      return Promise.reject(error);
    }

    // Avoid infinite loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue the call until the current refresh finishes
      return new Promise((resolve) => {
        subscribeTokenRefresh(() => resolve(api(originalRequest)));
      });
    }

    // Start refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshClient.post(REFRESH_URL);
      isRefreshing = false;
      onRefreshSuccess();
      return api(originalRequest); // replay the original request
    } catch (e) {
      isRefreshing = false;
      refreshSubscribers = [];
      // Optionally: handleLogout();
      return Promise.reject(e);
    }
  }
);

export default api;
