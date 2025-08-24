"use client";

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

        {/* Button: full width on mobile, auto on sm+ */}
        <button
          type="submit"
          className="h-[52px] sm:h-[56px] w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--color-brand)] px-5 sm:px-6 text-[14px] sm:text-[15px] font-extrabold text-white hover:bg-black transition duration-300 cursor-pointer"
        >
          SUBSCRIBE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 343 176.96"
            className="shrink-0"
            fill="white"
            aria-hidden="true"
          >
            <path
              d="M252.91-.02L232.124 20.4l25.2 24.75H0v28.88h286.72l14.7 14.44-14.7 14.45H0v28.87h257.32l-25.2 24.76 20.786 20.42 90.09-88.5z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default CTA;
