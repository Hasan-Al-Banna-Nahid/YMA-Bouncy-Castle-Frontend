"use client";

import SubscribeButton from "@/common/SubscribeButton";

const CTA = () => {
  return (
    <form
      className="w-full max-w-[1100px] lg:w-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Input: fluid on mobile, wider basis on sm+/lg+ */}
        <div className="min-w-0 flex-1 sm:flex-[1_1_640px] lg:flex-[1_1_780px]">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            placeholder="Your email"
            className="h-[52px] sm:h-[56px] w-full md:w-[25rem] rounded-none border border-white/70 bg-transparent px-4 sm:px-5 text-white placeholder:text-[#9ea3aa] outline-none focus:border-[var(--color-brand)]"
            required
            autoComplete="email"
          />
        </div>
        <SubscribeButton />
      </div>
    </form>
  );
};

export default CTA;
