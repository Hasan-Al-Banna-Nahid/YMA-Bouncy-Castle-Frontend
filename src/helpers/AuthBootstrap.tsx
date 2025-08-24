"use client";
import { useMeQuery } from "@/api/auth";
import { useEffect } from "react";

/** Fetches /auth/me once on app start (keeps SSR simple). */
export function AuthBootstrap() {
  const { refetch, isFetched } = useMeQuery({ enabled: false });

  useEffect(() => {
    if (!isFetched) void refetch();
  }, [isFetched, refetch]);

  return null;
}
