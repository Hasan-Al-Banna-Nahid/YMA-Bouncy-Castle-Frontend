"use client";

import { useLogout } from "@/api/auth";
import { AuthGate } from "@/helpers/AuthGate";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { label: "Dashboard", href: "/my-account" },
  { label: "Orders", href: "/my-account/orders" },
  { label: "Downloads", href: "/my-account/downloads" },
  { label: "Addresses", href: "/my-account/addresses" },
  { label: "Account details", href: "/my-account/details" },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const logout = useLogout();
  const { user } = useAuthStore();

  const username = user?.name || user?.email?.split("@")?.[0] || "Guest";

  return (
    <AuthGate>
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid gap-10 md:gap-16 md:grid-cols-[260px_1fr]">
            {/* Left rail (on md+) / Full-width stack (on mobile) */}
            <aside className="md:pt-1">
              {/* Profile header (mobile + desktop) */}
              <div className="flex items-center gap-3 pb-6 border-b border-line md:border-0 md:pb-0">
                {/* {user?.avatarUrl ? (
                  // If you have a real avatar URL
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={`${username} avatar`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="h-10 w-10 text-[#c7ccd3]" />
                )} */}

                <div className="text-[14px] leading-tight">
                  <div className="text-[#6b7785]">Logged in as</div>
                  <div className="font-semibold tracking-wide">{username}</div>
                </div>
              </div>

              {/* Logout link (brand) */}
              <button
                type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className="mt-4 text-[15px] font-semibold text-brand hover:opacity-90 md:mt-6"
              >
                {logout.isPending ? "Logging out..." : "Logout"}
              </button>

              {/* Navigation — mobile & desktop share the same vertical list to match your screenshot */}
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
            <div className="md:pt-1">
              {/*
                On the dashboard page your copy should sit near the top,
                matching the screenshot’s spacing/typography.
              */}
              {children}
            </div>
          </div>
        </div>
      </section>
    </AuthGate>
  );
}
