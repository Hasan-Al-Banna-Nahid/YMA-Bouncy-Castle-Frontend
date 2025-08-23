"use client";

import { NAV } from "@/static/nav";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaHeadset,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import Logo from "../assets/logos/logo.webp";

/* ----------------------------- Types for mobile stack ---------------------------- */
type MobileItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "submenu"; label: string; children: MobileItem[] };

type MobileView = {
  title: string;
  items: MobileItem[];
};

/* ----------------------------- Helpers to build mobile views ---------------------------- */
function buildRootMobileView(): MobileView {
  const items: MobileItem[] = [];

  NAV.items.forEach((item) => {
    if (item.type === "link") {
      items.push({ kind: "link", label: item.label, href: item.href });
    } else if (item.type === "dropdown") {
      items.push({
        kind: "submenu",
        label: item.label,
        children: item.items.map((s: any) => ({
          kind: "link",
          label: s.label,
          href: s.href,
        })),
      });
    } else if (item.type === "locations") {
      // 2 levels: Regions -> Places
      items.push({
        kind: "submenu",
        label: item.label,
        children: [
          { kind: "link", label: "All Locations", href: item.allHref },
          ...item.regions.map((region: any) => ({
            kind: "submenu" as const,
            label: region.name,
            children: region.locations.map((loc: any) => ({
              kind: "link" as const,
              label: loc.label,
              href: loc.href,
            })),
          })),
        ],
      });
    }
  });

  return { title: "", items };
}

/* ====================================================================================== */

export default function Navbar() {
  /* ---------- Search modal ---------- */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus();
  }, [isSearchOpen]);

  /* ---------- Mobile drawer (stack navigation) ---------- */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const rootView = useMemo(buildRootMobileView, []);
  const [stack, setStack] = useState<MobileView[]>([rootView]);

  const currentView = stack[stack.length - 1];

  function pushSubmenu(sub: MobileItem) {
    if (sub.kind !== "submenu") return;
    setStack((s) => [...s, { title: sub.label, items: sub.children }]);
  }

  function popView() {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }

  function openDrawer() {
    setDrawerOpen(true);
    setStack([rootView]);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    // keep stack reset for next open
    setTimeout(() => setStack([rootView]), 200);
  }

  /* =================================================================================== */
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line text-[#0c1116]">
      {/* ======================== DESKTOP (≥1024px) ======================== */}
      <div className="hidden lg:block">
        <div className="mx-auto w-full ">
          <div className="grid grid-cols-[260px_1px_380px_1px_1fr_1px_64px_64px] items-center">
            {/* Logo */}
            <div className="h-[90px] flex items-center justify-center">
              <Link
                href="/"
                aria-label="YMA Bouncy Castles – Home"
                className="inline-flex"
              >
                <Image
                  src={Logo}
                  alt="YMA Bouncy Castles"
                  width={180}
                  height={60}
                  priority
                  className="h-auto w-[180px]"
                />
              </Link>
            </div>

            {/* divider */}
            <div className="h-[90px] w-px bg-line" />

            {/* Support */}
            <div className="h-[90px] flex items-center justify-center gap-3">
              <FaHeadset
                className="text-[42px] text-brand"
                aria-hidden="true"
              />
              <div className="leading-tight">
                <div className="text-[14px] tracking-[0.02em] text-[#6b7785]">
                  For Rental Support
                </div>
                <div className="mt-1 text-[22px] font-black tracking-[0.02em]">
                  {NAV.supportPhone}
                </div>
              </div>
            </div>
            <div className="h-[90px] w-px bg-line" />
            {/* Desktop menu */}
            <nav
              aria-label="Main"
              className="h-[90px] flex items-center justify-center"
            >
              <ul className="flex items-center gap-10">
                {NAV.items.map((item: any, idx: number) => {
                  if (item.type === "link") {
                    return (
                      <li key={idx} className="py-10">
                        <Link
                          href={item.href}
                          className="text-[14px] font-extrabold tracking-[0.06em] hover:text-brand transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  if (item.type === "dropdown") {
                    return (
                      <li key={idx} className="relative group py-10">
                        <button
                          type="button"
                          aria-haspopup="true"
                          className="inline-flex items-center gap-2 text-[14px] font-extrabold tracking-[0.06em] hover:text-brand transition-colors"
                        >
                          {item.label} <FaChevronDown className="text-[12px]" />
                        </button>

                        {/* dropdown */}
                        <div className="pointer-events-none absolute left-1/2 top-[90px] -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                          <div className="mx-auto h-3 w-3 rotate-45 border border-[#e9eef3] border-b-0 border-r-0 bg-white" />
                          <div className="mt-[-6px] w-[260px] rounded-sm border border-[#e9eef3] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                            <ul className="py-3">
                              {item.items.map((link: any) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block px-6 py-3 text-[14px] hover:text-brand"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                    );
                  }

                  // Locations mega menu
                  if (item.type === "locations") {
                    return (
                      <li key={idx} className="relative group py-10">
                        <button
                          type="button"
                          aria-haspopup="true"
                          className="inline-flex items-center gap-2 text-[14px] font-extrabold tracking-[0.06em] hover:text-brand transition-colors"
                        >
                          {item.label} <FaChevronDown className="text-[12px]" />
                        </button>

                        <div className="pointer-events-none absolute left-1/2 top-[90px] z-10 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                          <div className="mx-10 ml-[120px] h-3 w-3 rotate-45 border border-[#e9eef3] border-b-0 border-r-0 bg-white" />
                          <div className="mt-[-6px] grid grid-cols-[260px_1fr] rounded-sm border border-[#e9eef3] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                            {/* left column */}
                            <div className="min-w-[260px] border-r border-[#e9eef3]">
                              <ul className="py-3">
                                <li>
                                  <Link
                                    href={item.allHref}
                                    className="block px-6 py-3 text-[14px] hover:text-brand"
                                  >
                                    All Locations
                                  </Link>
                                </li>

                                {item.regions.map((region: any) => (
                                  <li
                                    key={region.name}
                                    className="relative group/location"
                                  >
                                    <Link
                                      href={region.href}
                                      className="flex items-center justify-between px-6 py-3 text-[14px] hover:text-brand"
                                    >
                                      {region.name}
                                      <FaChevronRight className="text-[12px]" />
                                    </Link>

                                    {/* right panel */}
                                    <div className="absolute left-full top-[-10px] hidden min-w-[380px] border-l border-[#e9eef3] bg-white group-hover/location:block">
                                      <div className="py-3">
                                        {region.locations.map((loc: any) => (
                                          <Link
                                            key={loc.href}
                                            href={loc.href}
                                            className="block px-6 py-3 text-[14px] hover:text-brand"
                                          >
                                            {loc.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            </nav>

            {/* divider */}
            <div className="h-[90px] w-px bg-line" />

            {/* search & cart */}
            <button
              aria-label="Search"
              className="flex h-[90px] w-[64px] items-center justify-center text-[#0c1116] hover:text-brand"
              onClick={() => setIsSearchOpen(true)}
              type="button"
            >
              <FaSearch className="text-[18px]" />
            </button>
            <Link
              href="/cart"
              aria-label="Cart"
              className="flex h-[90px] w-[64px] items-center justify-center bg-brand text-white hover:bg-black transition duration-300"
            >
              <FaShoppingCart className="text-[18px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ======================== MOBILE (<1024px) ======================== */}
      <div className="lg:hidden">
        {/* top bar */}
        <div className="flex h-[64px] items-center justify-between px-4">
          <button
            aria-label="Open menu"
            className="text-2xl"
            onClick={openDrawer}
            type="button"
          >
            <FaBars />
          </button>

          <Link
            href="/"
            aria-label="YMA Bouncy Castles – Home"
            className="inline-flex"
          >
            <Image
              src={Logo}
              alt="YMA Bouncy Castles"
              width={110}
              height={40}
              className="h-auto"
            />
          </Link>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className="text-xl"
              type="button"
            >
              <FaSearch />
            </button>
            <Link aria-label="Account" href="/my-account" className="text-xl">
              <FaUser />
            </Link>
            <Link aria-label="Cart" href="/cart" className="text-xl">
              <FaShoppingCart />
            </Link>
          </div>
        </div>

        {/* Drawer overlay */}
        <div
          className={`fixed inset-0 z-[60] transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeDrawer}
            aria-hidden
          />

          {/* Drawer panel */}
          <aside
            className={`absolute left-0 top-0 h-full w-[86%] max-w-[360px] bg-[#201d1b] text-white transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* header row inside drawer */}
            <div className="flex items-center justify-between px-5 h-[58px] border-b border-white/10">
              {stack.length > 1 ? (
                <button
                  className="inline-flex items-center gap-2 text-sm"
                  onClick={popView}
                  type="button"
                >
                  <FaArrowLeft className="text-white/70" />
                  <span className="uppercase tracking-wide">Back</span>
                </button>
              ) : (
                <span />
              )}

              <button
                aria-label="Close menu"
                className="text-2xl"
                onClick={closeDrawer}
                type="button"
              >
                <FaTimes />
              </button>
            </div>

            {/* Title when in submenu */}
            {currentView.title && (
              <div className="px-5 py-3 text-brand uppercase tracking-wide text-sm border-b border-white/10">
                {currentView.title}
              </div>
            )}

            {/* items */}
            <nav className="overflow-y-auto">
              <ul className="px-2 py-2">
                {currentView.items.map((it, i) => {
                  if (it.kind === "link") {
                    return (
                      <li key={`${it.href}-${i}`}>
                        <Link
                          href={it.href}
                          className="flex items-center justify-between px-4 py-4 text-base font-semibold uppercase tracking-wide hover:text-brand"
                          onClick={closeDrawer}
                        >
                          {it.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={`${it.label}-${i}`}>
                      <button
                        type="button"
                        onClick={() => pushSubmenu(it)}
                        className="w-full flex items-center justify-between px-4 py-4 text-base font-semibold uppercase tracking-wide hover:text-brand"
                      >
                        <span>{it.label}</span>
                        <FaChevronRight className="text-sm" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Support block (like screenshot) */}
              <div className="px-4 pb-8">
                <div className="mt-2 rounded border border-white/10">
                  <div className="flex items-center gap-3 px-4 py-4">
                    <FaHeadset className="text-2xl text-brand" />
                    <div>
                      <div className="text-xs text-white/70">
                        For Rental Support
                      </div>
                      <div className="text-xl font-black">
                        {NAV.supportPhone}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-4 py-3 text-center text-xs">
                    <div className="inline-flex items-center gap-2">
                      <span className="text-brand">★</span>
                      <span>Best Children Fun Equipment Rental</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-4 py-3 text-xs flex items-center gap-2">
                    <span className="text-brand">⏱</span>
                    Mon - Sat 9.00 – 18.00
                  </div>
                </div>
              </div>
            </nav>
          </aside>
        </div>
      </div>

      {/* ======================= SEARCH MODAL (shared) ======================= */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
          isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop (click to close) */}
        <div
          className="absolute inset-0 bg-black/75"
          onClick={() => setIsSearchOpen(false)}
        />
        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
          className={`absolute left-0 right-0 top-0 bg-white shadow-xl transition-all duration-300 ease-out ${
            isSearchOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="mx-auto w-full max-w-[1160px] px-6 py-7 sm:py-9">
            <button
              aria-label="Close search"
              className="absolute right-6 top-5 text-3xl leading-none text-[#0c1116]/70 hover:text-[#0c1116]"
              onClick={() => setIsSearchOpen(false)}
              type="button"
            >
              ×
            </button>

            <p
              id="search-title"
              className="mb-3 text-[13px] tracking-wide text-[#6b7785]"
            >
              What are you looking for?
            </p>

            <input
              ref={inputRef}
              type="text"
              placeholder="Start typing..."
              className="w-full border-b border-[#e5e8ec] pb-3 text-[26px] sm:text-[30px] leading-tight placeholder:text-[#b6bcc5] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
