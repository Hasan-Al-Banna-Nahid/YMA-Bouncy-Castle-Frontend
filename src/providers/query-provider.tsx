"use client";
import api from "@/api/api";
import { useAuthStore } from "@/store/auth-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { setUser } = useAuthStore();
  useEffect(() => {
    api
      .post("/auth/refresh-token")
      .then((data) => {
        setUser(data.data.data.user);
      })
      .catch(() => {
        router.push("/auth");
      });
  }, []);
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
