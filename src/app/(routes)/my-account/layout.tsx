"use client";

import api from "@/api/api";
import ProtectedRoute from "@/helpers/ProtectedRoute";

import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";

const NAV = [
  { label: "Dashboard", href: "/my-account" },
  { label: "Orders", href: "/my-account/orders" },
  { label: "Downloads", href: "/my-account/downloads" },
  { label: "Addresses", href: "/my-account/addresses" },
  { label: "Account details", href: "/my-account/details" },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user, clear } = useAuthStore();
  const username = user?.name || user?.email?.split("@")?.[0] || "Guest";

  const logout = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      clear();
      queryClient.removeQueries({ queryKey: ["user"] });
      toast.success("Logged out successfully.");
      router.push("/auth");
    },
    onError: () => {
      toast.error("Failed to logout. Please try again.");
    },
  });

  return (
    <ProtectedRoute>
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid gap-10 md:gap-16 md:grid-cols-[260px_1fr]">
            {/* Left rail */}
            <aside className="md:pt-1">
              {/* Profile header */}
              <div className="flex items-center gap-3 pb-6 border-b border-line md:border-0 md:pb-0">
                <div className="h-10 w-10 rounded-full bg-[#e9eef3] grid place-items-center text-sm font-bold text-[#0c1116]">
                  <Image
                    src={
                      user?.photo ||
                      "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                    width={40}
                    height={40}
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                </div>

                <div className="text-[14px] leading-tight">
                  <div className="text-[#6b7785]">Logged in as</div>
                  <div className="font-semibold tracking-wide">{username}</div>
                </div>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className="mt-4 text-[15px] font-semibold text-brand hover:opacity-90 disabled:opacity-60 md:mt-6"
              >
                {logout.isPending ? "Logging out..." : "Logout"}
              </button>

              {/* Navigation */}
              <nav aria-label="Account" className="mt-4 md:mt-8">
                <ul className="space-y-4 md:space-y-6">
                  {NAV.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`${
                            active ? "text-brand" : "text-[#0c1116]"
                          } block text-[16px] md:text-[20px] leading-none hover:text-brand`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <div className="md:pt-1">{children}</div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
