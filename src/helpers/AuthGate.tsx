"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import * as React from "react";

/** Hides children while checking/redirecting. */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useRequireAuth();
  if (isLoading || !isAuthenticated) return null;
  return <>{children}</>;
}
