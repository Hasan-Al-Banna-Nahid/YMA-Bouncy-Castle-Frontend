import AboutImg from "@/assets/images/jeremiah-lawrence-eNfzBf1Ru1s-unsplash-1320x880.webp";
import TestimonialsSection from "@/components/about/TestimonialSection";
import AccentLines from "@/components/AccentLines";
import ContactCTA from "@/components/ContactCTA";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" crumbRight="About Us" />

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* --------- Top Intro Section --------- */}
        <div className="mt-8 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Image */}
          <div className="w-full">
            <div className="relative w-full overflow-hidden rounded-xl">
              <Image
                src={AboutImg}
                alt="Children having fun on a colorful bouncy castle"
                className="h-auto w-full object-cover"
                priority
                placeholder="blur"
                // Helps CLS across breakpoints
                sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full">
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] uppercase tracking-wide text-brand font-semibold mb-2">
              About YMA Bouncy Castle
            </p>

            <h2 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-bold leading-tight mb-5 text-ink">
              Discover The Magic of Bouncy Castles with us!
            </h2>

            <div className="max-w-full">
              <AccentLines />
            </div>

            <p className="mt-6 sm:mt-8 text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-ink/90">
              YMA Bouncy Castle is a reputable company based in London,
              providing top-quality bouncy castles for hire and inflatable
              rentals to the neighbouring areas of London, Essex, and Enfield.
              We offer a broad selection of Inflatables, Slides, Garden games,
              and Soft Play equipment rentals at an affordable price range.
              Whether you&apos;re looking for princess, jungle, superhero,
              dinosaur, or disco-themed inflatables, we have everything you need
              to make your event a success.
            </p>
          </div>
        </div>

        {/* --------- Mission & Commitment Section --------- */}
        <div className="mt-16 md:mt-20 lg:mt-24 space-y-14 md:space-y-16">
          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
              <h3 className="shrink-0 text-[16px] sm:text-[18px] md:text-[20px] font-bold text-ink flex items-center gap-3">
                <span>
                  <span className="opacity-0 hidden md:inline">******</span>OUR
                  MISSION
                </span>
                <span className="hidden md:block h-[40px] sm:h-[56px] w-[2px] bg-gray-400/60" />
              </h3>

              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-ink/90 max-w-none sm:max-w-[62ch]">
                We strive to deliver fresh and thrilling experiences that fill
                every event with joy and excitement. Our aim is to create
                memories that leave indelible impact, ensuring that each moment
                is meaningful and unforgettable. Join us on this mission to make
                your event truly special.
              </p>
            </div>
          </div>

          {/* Commitment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
              <h3 className="shrink-0 text-[16px] sm:text-[18px] md:text-[20px] font-bold text-ink flex items-center gap-3">
                <span>OUR COMMITMENT</span>
                <span className="hidden md:block h-[40px] sm:h-[56px] w-[2px] bg-gray-400/60" />
              </h3>

              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-ink/90 max-w-none sm:max-w-[62ch]">
                Our dedicated team is committed to delivering safe and
                high-quality inflatables that exceed your expectations. With a
                focus on customer satisfaction, we offer flexibility tailored to
                your needs. We prioritize sustainability and bring years of
                experience to create remarkable events. Trust us for an
                exceptional experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
      <TestimonialsSection />
    </>
  );
}
