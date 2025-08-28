import type { User } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  setUser: (u: User | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clear: () => set({ user: null }),
}));
