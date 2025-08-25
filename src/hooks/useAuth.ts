import api from "@/api/api";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useAuth() {
  const { setUser, clear } = useAuthStore();

  const query = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data?.data?.user ?? null;
    },
    retry: false,
    staleTime: 600_000,
  });

  useEffect(() => {
    if (query.isSuccess) setUser(query.data);
  }, [query.isSuccess, query.data, setUser]);

  useEffect(() => {
    if (query.isError) clear();
  }, [query.isError, clear]);

  return query;
}
