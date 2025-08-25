"use client";
import Loader from "@/components/loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isPending, isError, data } = useAuth();
  const { user, clear } = useAuthStore();
  useEffect(() => {
    if (!isPending && (isError || !data)) {
      router.replace("/auth");
      clear();
    }
  }, [isPending, isError, data, router]);

  if (isPending) return <Loader />;

  return <>{children}</>;
}
