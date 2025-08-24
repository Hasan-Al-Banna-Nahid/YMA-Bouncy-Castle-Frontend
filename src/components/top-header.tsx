import Link from "next/link";
import {
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaSignInAlt,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function TopHeader() {
  return (
    // Hidden on mobile; visible from md and up
    <div className="hidden md:block w-full bg-dark-bg text-white">
      <div className="mx-auto max-w-[1800px] px-4 lg:px-6">
        <div className="flex h-11 items-center justify-between">
          {/* Left: tagline */}
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <span aria-hidden="true">👉</span>
            <span className="whitespace-nowrap">
              Best Children Fun Equipment Rental
            </span>
          </div>

          {/* Right: info + socials */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Opening hours */}
            <div className="flex items-center gap-2 text-xs lg:text-sm">
              <FaClock className="text-brand shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Mon - Sat 9.00 - 18.00</span>
            </div>

            {/* Divider */}
            <span
              className="hidden lg:block h-4 w-px bg-white/20"
              aria-hidden="true"
            />

            {/* Login/Register */}
            <Link
              href="/my-account"
              className="flex items-center gap-2 text-xs lg:text-sm hover:text-brand transition-colors"
            >
              <FaSignInAlt className="text-brand shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Login or Register</span>
            </Link>

            {/* Divider */}
            <span
              className="hidden lg:block h-4 w-px bg-white/20"
              aria-hidden="true"
            />

            {/* Socials */}
            <div className="flex items-center gap-4 lg:gap-6 text-white/60">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-brand transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-brand transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/07951431111"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-brand transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-brand transition-colors"
              >
                <FaTiktok />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-brand transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
