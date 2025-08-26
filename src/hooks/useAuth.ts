import api from "@/api/api";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Options = { enabled?: boolean };

export function useAuth(opts: Options = {}) {
  const { setUser, clear } = useAuthStore();
  const enabled = opts.enabled ?? true;

  const query = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data?.data?.user ?? null;
    },
    retry: false,
    staleTime: 600_000,
    enabled,
  });

  useEffect(() => {
    if (!enabled) return;
    if (query.isSuccess) setUser(query.data);
    if (query.data) setUser(query.data);
  }, [enabled, query.isSuccess, query.data, setUser]);

  useEffect(() => {
    if (!enabled) return;
    if (query.isError) clear();
  }, [enabled, query.isError, clear]);

  return query;
}
