"use client";

import api from "@/api/api";
import { useAuthStore } from "@/store/auth-store";
import type { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AUTH_QK = ["auth", "me"] as const;

export function useMeQuery(options?: { enabled?: boolean }) {
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clear);
  const qc = useQueryClient();

  const query = useQuery<User, unknown>({
    queryKey: AUTH_QK,
    queryFn: async () => {
      const { data } = await api.get<User>("/auth/me", {
        withCredentials: true,
      });
      return data;
    },
    enabled: options?.enabled ?? true,
    // tune to preference
    retry: false,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });

  // mirror into zustand
  if (query.isSuccess) setUser(query.data);
  if (query.isError) clear();

  const refresh = () => qc.invalidateQueries({ queryKey: AUTH_QK });

  return { ...query, refresh };
}
