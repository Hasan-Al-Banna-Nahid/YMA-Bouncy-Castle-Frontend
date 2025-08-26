"use client";

import Loader from "@/components/loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, clear } = useAuthStore();
  const redirected = useRef(false);

  // Always call the hook, but disable it if we already have a user
  const query = useAuth({ enabled: !user });

  // Derive states so hook order never changes
  const isPending = !user && query.isPending;
  const isUnauth = !user && (query.isError || query.data === null);

  useEffect(() => {
    if (!isPending && isUnauth && !redirected.current) {
      redirected.current = true;
      clear();
      router.push("/auth");
    }
  }, [isPending, isUnauth, clear, router]);

  if (isPending) return <Loader />;
  if (isUnauth) return null;

  return <>{children}</>;
}
