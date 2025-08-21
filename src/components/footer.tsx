import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Logo from "../assets/logos/yma-bc-logo.webp";
const Footer = () => {
  return (
    <footer className="w-full bg-dark-bg text-white">
      {/* top striped accent */}
      <div className="h-[12px] w-[1700px] mx-auto bg-[repeating-linear-gradient(135deg,var(--color-brand)_0px,var(--color-brand)_2px,transparent_2px,transparent_10px)]" />

      {/* Newsletter */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 pt-20 pb-10">
        <div className="flex gap-8 items-center justify-between">
          <div className="flex items-start gap-12">
            <div className="hidden lg:block">
              <Image
                src={Logo}
                alt="YMA Bouncy Castles Logo"
                width={578}
                height={396}
                className="w-[188px] h-auto"
                priority
              />
            </div>

            {/* title + subtitle */}
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-[34px] leading-[1.15] font-extrabold text-white">
                Newsletter Subscription
              </h2>
              <p className="mt-2 text-[15px] italic">
                Get Latest Deals from YMA Bouncy Castle Equipment Rentals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* input */}
            <div className="w-full">
              <label htmlFor="newsletter-email" className="sr-only">
                Your email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="h-[56px] w-[400px] rounded-none border border-white bg-transparent px-5 text-white placeholder:text-[#9ea3aa] outline-none focus:border-[var(--color-brand)]"
              />
            </div>

            {/* button */}
            <div className="w-full lg:w-auto">
              <button
                type="button"
                className="h-[56px] w-full lg:w-[220px] inline-flex items-center justify-center gap-3 bg-[var(--color-brand)] px-6 text-[15px] font-extrabold text-white hover:opacity-90 transition cursor-pointer"
              >
                SUBSCRIBE
                {/* arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="176.96"
                  viewBox="0 0 343 176.96"
                  fill="white"
                >
                  <path
                    d="M252.91-.02L232.124 20.4l25.2 24.75H0v28.88h286.72l14.7 14.44-14.7 14.45H0v28.87h257.32l-25.2 24.76 20.786 20.42 90.09-88.5z"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="mt-10 h-[2px] w-full bg-[#383f43]" />
      </div>

      {/* Bottom grid */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <section>
            <HeaderWithAccent title="ABOUT YMA BOUNCY CASTLE" />
            <p className="mt-6 leading-7">
              Follow us on Social media and Contact us there to learn more about
              our rental services.
            </p>

            {/* Social row */}
            <div className="mt-6 flex items-center gap-4">
              <Social icon={<FaFacebookF />} href="#" label="Facebook" />
              <Social icon={<FaInstagram />} href="#" label="Instagram" />
              <Social icon={<FaWhatsapp />} href="#" label="WhatsApp" />
              <Social icon={<FaXTwitter />} href="#" label="X" />
              <Social icon={<FaYoutube />} href="#" label="YouTube" />
            </div>
          </section>

          {/* Useful links */}
          <section>
            <HeaderWithAccent title="USEFUL LINKS" />
            <ul className="mt-6 space-y-4 text-[16px]">
              <Bullet>About Rental</Bullet>
              <Bullet>
                <a href="/news" className="hover:text-[var(--color-brand)]">
                  Latest News
                </a>
              </Bullet>
              <Bullet>Our Process</Bullet>
              <Bullet>Terms &amp; Conditions</Bullet>
              <Bullet>Protections &amp; Coverages</Bullet>
            </ul>
          </section>

          {/* Explore */}
          <section>
            <HeaderWithAccent title="EXPLORE YMA BOUNCY CASTLE" />
            <ul className="mt-6 space-y-4 text-[16px]">
              <Bullet>
                <a href="/catalog" className="hover:text-[var(--color-brand)]">
                  See Catalog
                </a>
              </Bullet>
              <Bullet>
                <a
                  href="/our-locations"
                  className="hover:text-[var(--color-brand)]"
                >
                  Our Locations
                </a>
              </Bullet>
              <Bullet>Rental Pricing</Bullet>
              <Bullet>Quick User Guide</Bullet>
              <Bullet>Read FAQ’s</Bullet>
            </ul>
          </section>

          {/* Get in touch */}
          <section>
            <HeaderWithAccent title="GET IN TOUCH" />

            <div className="mt-6 space-y-8">
              {/* phone */}
              <div className="flex items-start gap-4">
                <IconBadge>
                  {/* 24h-like badge */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 150 150"
                    fill="white"
                  >
                    <path
                      d="M68.23 118.43a56.676 56.676 0 0 1-36.65-36.65l11.68-3.22V43.07H0V64.7a85.287 85.287 0 0 0 85.31 85.31h21.62v-43.26H71.44zm9.91-2.89h20v25.68H85.31A76.513 76.513 0 0 1 8.79 64.7V51.87h25.68v20L20.92 75.6l.98 4.13a65.329 65.329 0 0 0 48.38 48.38l4.13.98zm49.89-93.56a74.985 74.985 0 0 0-106.06 0l6.21 6.21a66.213 66.213 0 0 1 93.64 93.64l6.21 6.21a74.985 74.985 0 0 0 0-106.06zM85.66 66.54V40.15H59.28v8.79h17.59v8.81H59.28v26.38h26.39v-8.79h-17.6v-8.8h17.59zm26.4-8.79h-8.8v-17.6h-8.79v26.39h17.59v17.6h8.79V40.15h-8.79v17.6z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </IconBadge>
                <div className="leading-6">
                  <div className="text-[#9ea3aa]">For Rental Support</div>
                  <div className="mt-1 text-white font-extrabold text-[18px]">
                    07951431111
                  </div>
                </div>
              </div>

              {/* hours */}
              <div className="flex items-start gap-4">
                <IconBadge>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 135 150"
                    fill="white"
                  >
                    <path
                      d="M66.308 35.18a48.625 48.625 0 1 0 48.7 48.63 48.724 48.724 0 0 0-48.7-48.63zm0 88.46a39.835 39.835 0 1 1 39.9-39.83 39.911 39.911 0 0 1-39.9 39.83zM135 33.88l-18.685-18.66-13.387 13.37a65.833 65.833 0 0 0-19-8.64V8.8h8.814V.01H39.877V8.8h8.814v11.15a66.267 66.267 0 1 0 72.922 27.3zm-18.685-6.22l6.235 6.22-6.34 6.33q-1.449-1.65-3.013-3.21t-3.222-3.01zM57.495 8.8h17.628v9.39a67.261 67.261 0 0 0-17.628 0V8.8zm8.814 132.42a57.41 57.41 0 1 1 57.506-57.41 57.52 57.52 0 0 1-57.507 57.41zm4.4-88.45h-8.8V88.2h26.677v-8.79H70.71V52.77z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </IconBadge>
                <div className="leading-6">
                  <div className="text-[#9ea3aa]">The Office Hours</div>
                  <div className="mt-1 font-extrabold text-white">
                    7 days a week- 8am to 7pm
                  </div>
                </div>
              </div>

              {/* email */}
              <div className="flex items-start gap-4">
                <IconBadge>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 150 150"
                    fill="white"
                  >
                    <path
                      d="M124.47 47.26V.01H25.53v47.25L0 66.04v83.97h150V66.04zm-72.476 55.79L8.788 136.64V76.18zM75 96.3l57.79 44.92H17.209zm23 6.75l43.21-26.87v60.46zm39.77-35.09l-13.3 8.28V58.17zM115.68 8.8v72.91L90.61 97.3 75 85.17 59.392 97.3 34.32 81.71V8.8h81.36zM25.53 76.24l-13.306-8.28 13.306-9.79v18.07zm32.859-23.08l-4.286 4.28 6.215 6.21 4.286-4.28a19.734 19.734 0 0 0 6 2.49v6.06h8.79v-6.06a19.632 19.632 0 0 0 6-2.49l4.29 4.28 6.21-6.21-4.28-4.28a19.793 19.793 0 0 0 2.49-6.01h6.06v-8.78h-6.06a19.793 19.793 0 0 0-2.49-6.01l4.28-4.28-6.21-6.22-4.29 4.29a19.149 19.149 0 0 0-6-2.49V17.6h-8.79v6.06a19.245 19.245 0 0 0-6 2.49l-4.286-4.29-6.215 6.22 4.286 4.28a19.6 19.6 0 0 0-2.491 6.01h-6.055v8.78H55.9a19.6 19.6 0 0 0 2.489 6.01zM75 31.94a10.815 10.815 0 1 1-10.815 10.82A10.832 10.832 0 0 1 75 31.94z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </IconBadge>
                <div className="leading-6">
                  <div className="text-[#9ea3aa]">Send Us Email</div>
                  <a
                    href="mailto:info@ymabouncycastles.uk"
                    className="mt-1 block font-extrabold text-white hover:text-[var(--color-brand)]"
                  >
                    info@ymabouncycastles.uk
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-10 h-[2px] w-full bg-[#383f43]" />
      {/* copyright strip */}
      <div className=" grid grid-cols-1 py-20 text-center">
        <p className=" text-lg text-[#9ea3aa]">
          © 2025 <b className="text-white">YMA Bouncy Castle</b> — Fun Supplier.
          Developed By{" "}
          <a
            href="https://butterflydigital.ca"
            target="_blank"
            rel="noopener"
            className="hover:text-[var(--color-brand)] underline"
          >
            Butterfly Digital
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

/* ——— helpers ——— */

function HeaderWithAccent({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-[20px] tracking-wide font-extrabold text-white">
        {title}
      </h3>
      {/* dual accent lines like the theme */}
      <div className="mt-3 space-y-1">
        <span className="block h-[2px] w-4 bg-[var(--color-brand)]" />
        <span className="block h-[2px] w-8 bg-[var(--color-brand)]" />
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 block h-[6px] w-[6px] rounded-full bg-[#7b8087]" />
      <span className="leading-7">{children}</span>
    </li>
  );
}

function Social({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid place-items-center h-9 w-9 rounded-full bg-[#1E1F21] text-[#aeb3b9] hover:text-[var(--color-brand)]"
    >
      {icon}
    </a>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center h-[44px] w-[44px] rounded-full border border-[#2a2a2a] text-[var(--color-brand)]">
      {children}
    </div>
  );
}
