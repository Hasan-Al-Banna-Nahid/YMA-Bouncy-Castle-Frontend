"use client";
import { AuthGate } from "@/helpers/AuthGate";
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

  return (
    <AuthGate>
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {/* Responsive wrapper: vertical rail on md+, horizontal tabs on mobile */}
          <div className="grid gap-10 md:gap-16 md:grid-cols-[220px_1fr]">
            {/* Sidebar / Tabs */}
            <nav aria-label="Account" className="md:pt-1">
              {/* Mobile: horizontal list */}
              <ul className="md:hidden -mx-4 overflow-x-auto whitespace-nowrap border-b border-line pb-4 px-4 flex gap-8">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href} className="shrink-0">
                      <Link
                        href={item.href}
                        className={`text-[15px] font-semibold tracking-wide ${
                          active ? "text-brand" : "text-[#0c1116]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Desktop: vertical rail */}
              <ul className="hidden md:block space-y-6">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-[20px] leading-none ${
                          active ? "text-brand" : "text-[#0c1116]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Main content */}
            <div className="md:pt-1">{children}</div>
          </div>
        </div>
      </section>
    </AuthGate>
  );
}
