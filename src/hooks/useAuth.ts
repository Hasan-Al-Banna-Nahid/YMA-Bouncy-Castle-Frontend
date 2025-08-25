"use client";

import { useMeQuery } from "@/api/auth";
import { useAuthStore } from "@/store/auth-store";

/**
 * Combines Zustand user with the /auth/me query status.
 * Fetches lazily on first mount.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);

  const { isLoading, isFetching, isSuccess, isError, refresh } = useMeQuery({
    enabled: user === null, // if persisted user exists, don't refetch immediately
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || isFetching,
    isSuccess,
    isError,
    refresh, // call after login to re-pull /auth/me
    clear, // call after logout
  };
}
