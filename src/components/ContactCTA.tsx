import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";

import Pattern from "@/assets/images/cta_bg.webp";
import Logo from "@/assets/logos/logo.webp";
import SubscribeButton from "@/common/SubscribeButton";

export default function ContactCTA() {
  return (
    <section className="relative w-full text-white py-6 md:py-8">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-black/90"
        style={{
          backgroundImage: `url(${Pattern.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-6 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-[auto_1fr_auto_auto]">
          {/* Logo tile */}
          <div className="flex justify-center md:justify-start">
            <div className="h-[84px] w-[150px] md:h-[92px] md:w-[160px] lg:h-[104px] lg:w-[170px] bg-white/95">
              <Image
                src={Logo}
                alt="YMA Bouncy Castles"
                className="h-full w-full object-contain p-5"
                priority
              />
            </div>
          </div>

          {/* Headline + divider */}
          <div className="relative">
            <h3 className="text-[22px] leading-snug font-bold md:text-[26px] lg:text-[30px]">
              We Help To Utilize The Best
              <br className="hidden md:block" /> Equipment Work Better
            </h3>
            <span className="hidden md:block absolute right-0 top-0 h-full w-px bg-white/50" />
          </div>

          {/* Phone block */}
          <div className="flex items-center gap-4 md:pl-6">
            <FiPhoneCall className="text-5xl text-white" aria-hidden />
            <div className="leading-tight">
              <div className="text-white/80 text-sm">Get Quick Support</div>
              <div className="text-white font-bold text-2xl md:text-[26px]">
                07951431111
              </div>
            </div>
          </div>

          {/* CTA */}
          <SubscribeButton text="GET STARTED" className="bg-red-500" />
        </div>
      </div>
    </section>
  );
}
