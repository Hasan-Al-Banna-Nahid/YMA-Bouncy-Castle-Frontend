"use client";

import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { FiArrowUp } from "react-icons/fi";

type FaqItem = {
  id: number;
  q: string;
  a: React.ReactNode;
};

const FAQS: FaqItem[] = [
  {
    id: 1,
    q: "What areas do you cover for bouncy castle rentals?",
    a: (
      <>
        Our service area includes various regions of North and East London,
        covering places like <b>Loughton</b>, <b>Chigwell</b>,{" "}
        <b>Walthamstow</b>, <b>Chingford</b>, <b>Edmonton</b>,{" "}
        <b>Muswell Hill</b>, <b>Tottenham</b>, <b>Highgate</b>,{" "}
        <b>Wood Green</b>, <b>Hornsey</b>, <b>South Woodford</b>,{" "}
        <b>Woodford</b>, <b>Wanstead</b> and other adjacent areas. We also
        provide our services to nearby areas such as <b>Romford</b>,{" "}
        <b>Barking</b>, <b>Dagenham</b>, and <b>Leyton</b>. For more information
        please check our{" "}
        <a href="/our-locations" className="font-semibold underline">
          Location Page
        </a>
        .
      </>
    ),
  },
  {
    id: 2,
    q: "How do I book a bouncy castle?",
    a: (
      <>
        You can book directly on our website by selecting your castle, location,
        and date—then completing checkout. Or call our team and we’ll book it
        for you.
      </>
    ),
  },
  {
    id: 3,
    q: "Are your bouncy castles safe?",
    a: (
      <>
        Absolutely. All inflatables are safety-checked, cleaned after each hire,
        and installed by trained staff. We provide mats and secure anchoring.
      </>
    ),
  },
  {
    id: 4,
    q: "Is there an age limit for using your bouncy castles?",
    a: (
      <>
        We have options for toddlers through to teens. Each product page shows
        the recommended age/weight limits—please choose accordingly.
      </>
    ),
  },
  {
    id: 5,
    q: "Can I get a rental for tomorrow?",
    a: (
      <>
        Often yes! Same-day/next-day availability depends on stock and your
        area. Call us for the quickest confirmation.
      </>
    ),
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageHeader title="Read FAQ’s" crumbRight="READ FAQ'S" />

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-6">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const btnId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className="relative rounded-sm bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                {/* bottom brand bar when open */}
                <div
                  className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] transition-colors duration-300 ${
                    isOpen ? "bg-brand" : "bg-transparent"
                  }`}
                />

                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <div className="grid grid-cols-[1fr_38px] items-stretch">
                    {/* Left: Question + (animated) Answer */}
                    <div className="px-6 sm:px-8 py-6 sm:py-7">
                      <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#0c1116]">
                        {item.q}
                      </h3>

                      {/* Smooth, JS-free height animation */}
                      <div
                        id={panelId}
                        aria-hidden={!isOpen}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`mt-4 pr-2 text-[15px] leading-7 text-[#6e7680] transition-opacity duration-300 ${
                              isOpen ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: thin divider + chevron */}
                    <div className="relative h-full">
                      <div className="absolute left-0 top-0 h-full w-px bg-[#e9eef3]" />
                      <div className="grid place-items-center h-full text-brand">
                        <FiArrowUp
                          size={22}
                          className={`${
                            isOpen ? "rotate-180" : " rotate-0"
                          } transition duration-300`}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
