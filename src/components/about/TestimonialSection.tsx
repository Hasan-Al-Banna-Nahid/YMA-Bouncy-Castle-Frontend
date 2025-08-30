"use client";

import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import AccentLines from "../AccentLines";

/* ---------------- Stars Component ---------------- */
function Stars({ value = 0, size = 14 }: { value?: number; size?: number }) {
  const FULL = "var(--color-brand)";
  const EMPTY = "#D7DEE6";

  const stars = Array.from({ length: 5 }, (_, i) => {
    const idx = i + 1;
    const filled = value >= idx;
    const half = !filled && value > idx - 1 && value < idx;

    return (
      <span key={idx} className="inline-flex">
        {filled ? (
          <BsStarFill size={size} color={FULL} />
        ) : half ? (
          <BsStarHalf size={size} color={FULL} />
        ) : (
          <BsStar size={size} color={EMPTY} />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-[6px] leading-none">{stars}</div>
  );
}

/* ---------------- Testimonial Data ---------------- */
const TESTIMONIALS = [
  {
    id: 1,
    titleLine1: "Satisfied With The Facilities",
    titleLine2: "At BC Equipment Rental",
    body: "At dolore magna aliqua umt enim ad mini veniam quis ullamco aliquip commodo da consequat duis aute irue derit voluptate cillum dolore afugiat.",
    name: "Donald H. James",
    role: "Rental Customer",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: 2,
    titleLine1: "Satisfied With The Facilities",
    titleLine2: "At BC Equipment Rental",
    body: "At dolore magna aliqua umt enim ad mini veniam quis ullamco aliquip commodo da consequat duis aute irue derit voluptate cillum dolore afugiat.",
    name: "Katherine A. Fogg",
    role: "Rental Customer",
    rating: 4,
    avatar: "https://i.pravatar.cc/80?img=32",
  },
  {
    id: 3,
    titleLine1: "Outstanding Service & Support",
    titleLine2: "From Start To Finish",
    body: "Dolore magna aliqua. Et minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Sophie Carter",
    role: "Rental Customer",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=15",
  },
  {
    id: 4,
    titleLine1: "Great Range Of Inflatables",
    titleLine2: "Perfect For Our Event",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "James Patel",
    role: "Rental Customer",
    rating: 4,
    avatar: "https://i.pravatar.cc/80?img=47",
  },
];

/* ---------------- Main Component ---------------- */
export default function TestimonialsSection() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="uppercase text-[13px] tracking-wide text-[#6b7785]">
            Testimonials
          </div>
          <h2 className="mt-2 text-[26px] sm:text-[32px] lg:text-[44px] font-extrabold text-ink">
            Read Our Clients Thoughts
          </h2>
          <div className="mt-3 flex justify-center">
            <AccentLines />
          </div>
        </div>

        {/* Slider with Arrows */}
        <div className="relative">
          {/* Nav Buttons */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="absolute left-[-6px] sm:left-[-20px] lg:left-[-48px] top-1/2 -translate-y-1/2 z-10 text-ink transition cursor-pointer"
          >
            <HiOutlineChevronLeft size={36} />
          </button>
          <button
            ref={nextRef}
            aria-label="Next"
            className="absolute right-[-6px] sm:right-[-20px] lg:right-[-48px] top-1/2 -translate-y-1/2 z-10 text-ink hover:text-brand transition cursor-pointer"
          >
            <HiOutlineChevronRight size={36} />
          </button>

          <Swiper
            loop={true}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              // @ts-expect-error Swiper types
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error Swiper types
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 24 },
            }}
            className="!px-2"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <article className="h-full bg-white">
                  <div className="relative my-4 border border-line p-6 sm:p-8 lg:p-12 rounded">
                    {/* Quote Icon */}
                    <div className="text-[48px] sm:text-[58px] text-brand leading-none mb-2 absolute -top-[18px] left-8 sm:left-12">
                      &ldquo;
                    </div>

                    {/* Title */}
                    <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-ink">
                      {t.titleLine1}
                      <br />
                      {t.titleLine2}
                    </h3>

                    {/* Body */}
                    <p className="mt-4 sm:mt-6 text-[#7a828c] text-[14px] sm:text-[15px] leading-7 sm:leading-8">
                      {t.body}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 sm:mt-8 flex items-center gap-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-ink text-[15px] sm:text-[16px] truncate">
                            {t.name}
                          </p>
                          <Stars value={t.rating} size={14} />
                        </div>
                        <p className="text-sm text-[#7a828c]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
