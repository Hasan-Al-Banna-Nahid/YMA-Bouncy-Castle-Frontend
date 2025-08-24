// api.ts
import axios from "axios";

export const API_BASE = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE,
  // Do not set withCredentials globally if you also call public endpoints.
  // We'll set it per-call where cookies are required.
});

let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => { accessToken = t; };

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Auto-refresh on 401
let refreshing = false;
let waiters: Array<() => void> = [];

const queue = () => new Promise<void>((resolve) => waiters.push(resolve));
const flush = () => { waiters.forEach(fn => fn()); waiters = []; };

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (refreshing) { await queue(); return api(original); }
      original._retry = true;
      refreshing = true;
      try {
        // refresh uses cookies → must send withCredentials
        const { data } = await axios.post<{ tokens?: { accessToken: string } }>(
          `${API_BASE}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAT = data?.tokens?.accessToken;         // or whatever your controller returns
        if (!newAT) throw new Error("No access token in refresh response");
        setAccessToken(newAT);
        refreshing = false;
        flush();
        return api(original);
      } catch (e) {
        refreshing = false;
        waiters = [];
        setAccessToken(null);
        // optional: redirect to login
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
