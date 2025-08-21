"use client";

import { NAV } from "@/static/nav";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaHeadset,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import Logo from "../assets/logos/logo.webp";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ESC to close + autofocus (no scroll lock)
  useEffect(() => {
    if (!isSearchOpen) return;
    inputRef.current?.focus();
  }, [isSearchOpen]);

  return (
    <header className="w-full bg-white text-[#0c1116] border border-line">
      <div className="mx-auto w-full flex justify-between items-center">
        <div className="flex justify-evenly items-center h-full w-full">
          {/* Logo */}
          <div className="h-full border-r border-line pl-10 pr-20">
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

          {/* Divider */}
          {/* <div className="h-full w-[4px] bg-line" /> */}

          {/* Support */}
          <div className="h-[90px] flex items-center gap-3 border-r pr-20 border-line">
            <FaHeadset className="text-[42px] text-brand" aria-hidden="true" />
            <div className="leading-tight">
              <div className="text-[14px] tracking-[0.02em] text-[#6b7785]">
                For Rental Support
              </div>
              <div className="mt-1 text-[22px] font-black tracking-[0.02em]">
                {NAV.supportPhone}
              </div>
            </div>
          </div>
          {/* <div className="h-full w-[1px] bg-line" /> */}

          {/* Menu */}
          <nav
            aria-label="Main"
            className="h-[90px] flex items-center justify-center pl-10"
          >
            <ul className="flex items-center gap-10">
              {NAV.items.map((item, idx) => {
                if (item.type === "link") {
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="text-[14px] font-extrabold tracking-[0.06em] hover:text-brand transition-colors py-10"
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
                        className="inline-flex items-center gap-2 text-[14px] font-extrabold tracking-[0.06em] hover:text-brand transition-colors"
                        aria-haspopup="true"
                        type="button"
                      >
                        {item.label} <FaChevronDown className="text-[12px]" />
                      </button>

                      {/* Dropdown */}
                      <div className="pointer-events-none absolute left-1/2 top-[90px] -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                        <div className="mx-auto h-3 w-3 rotate-45 border border-[#e9eef3] border-b-0 border-r-0 bg-white" />
                        <div className="mt-[-6px] w-[260px] rounded-sm border border-[#e9eef3] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                          <ul className="py-3">
                            {item.items.map((link) => (
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

                if (item.type === "locations") {
                  return (
                    <li key={idx} className="relative group py-10">
                      <button
                        className="inline-flex items-center gap-2 text-[14px] font-extrabold tracking-[0.06em] hover:text-brand transition-colors"
                        aria-haspopup="true"
                        type="button"
                      >
                        {item.label} <FaChevronDown className="text-[12px]" />
                      </button>

                      {/* Mega menu */}
                      <div className="pointer-events-none absolute left-1/2 top-[90px] z-10 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                        <div className="mx-10 ml-[120px] h-3 w-3 rotate-45 border border-[#e9eef3] border-b-0 border-r-0 bg-white" />
                        <div className="mt-[-6px] grid grid-cols-[260px_1fr] rounded-sm border border-[#e9eef3] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                          {/* Left column (regions) */}
                          <div className="min-w-[260px] border-r border-[#e9eef3]">
                            <ul className="py-3">
                              <li>
                                <a
                                  href={item.allHref}
                                  className="block px-6 py-3 text-[14px] hover:text-brand"
                                >
                                  All Locations
                                </a>
                              </li>

                              {item.regions.map((region) => (
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

                                  {/* Right-side panel */}
                                  <div className="absolute left-full top-[-10px] hidden min-w-[380px] border-l border-[#e9eef3] bg-white group-hover/location:block">
                                    <div className="py-3">
                                      {region.locations.map((loc) => (
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

          {/* Divider */}
          {/* <div className="h-[84px] w-px bg-line" /> */}
        </div>
        <div className="flex items-center w-[200px]">
          {/* Search */}
          <button
            aria-label="Search"
            className="flex h-[90px] w-full items-center justify-center text-[#0c1116] hover:text-brand border-l border-line cursor-pointer"
            type="button"
            onClick={() => setIsSearchOpen(true)}
          >
            <FaSearch className="text-[18px]" />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="flex h-[90px] w-full items-center justify-center bg-brand text-white hover:opacity-90"
          >
            <FaShoppingCart className="text-[18px]" />
          </Link>
        </div>
      </div>

      {/* SEARCH MODAL (keeps scrollbar visible; page remains scrollable) */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/75"
          onClick={() => setIsSearchOpen(false)}
        />
        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
          className={`absolute left-0 right-0 top-0 bg-white shadow-xl transition-all duration-300 ease-out
          ${
            isSearchOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="mx-auto w-full max-w-[1160px] px-6 py-8 md:py-10">
            <button
              aria-label="Close search"
              className="absolute right-6 top-6 text-4xl leading-none text-[#0c1116]/70 hover:text-[#0c1116]"
              onClick={() => setIsSearchOpen(false)}
              type="button"
            >
              ×
            </button>

            <p
              id="search-title"
              className="mb-4 text-[13px] tracking-wide text-[#6b7785]"
            >
              What are you looking for?
            </p>

            <input
              ref={inputRef}
              type="text"
              placeholder="Start typing..."
              className="w-full border-b border-[#e5e8ec] pb-3 text-[30px] leading-tight placeholder:text-[#b6bcc5] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
