"use client";

import type { User } from "@/types/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (u: User | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (u) => set({ user: u }),
        clear: () => set({ user: null }),
      }),
      {
        name: "auth", // persisted key
        partialize: (s) => ({ user: s.user }), // persist only user
      }
    )
  )
);
