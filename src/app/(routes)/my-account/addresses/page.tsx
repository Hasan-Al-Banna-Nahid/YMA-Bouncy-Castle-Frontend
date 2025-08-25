"use client";

import Link from "next/link";

export default function Addresses({
  billingHref = "/account/addresses/billing",
  shippingHref = "",
}) {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Top note */}
        <p className="max-w-[980px] text-[15px] leading-7 text-[#4b5560]">
          The following addresses will be used on the checkout page by default.
        </p>

        {/* Two columns */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Billing */}
          <div>
            <h2 className="text-[18px] font-extrabold uppercase tracking-wide text-[#0c1116]">
              Billing Address
            </h2>

            <p className="mt-4 max-w-[360px] text-[15px] leading-7 text-[#4b5560]">
              You have not set up this type of address yet.
            </p>

            <Link
              href={"/my-account/addresses/billing"}
              className="mt-4 inline-block text-[15px] underline"
              aria-label="Edit billing address"
            >
              Edit
            </Link>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-[18px] font-extrabold uppercase tracking-wide text-[#0c1116]">
              Shipping Address
            </h2>

            <p className="mt-4 max-w-[360px] text-[15px] leading-7 text-[#4b5560]">
              You have not set up this type of address yet.
            </p>

            <Link
              href={"/my-account/addresses/shipping"}
              className="mt-4 inline-block text-[15px] underline"
              aria-label="Edit shipping address"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
