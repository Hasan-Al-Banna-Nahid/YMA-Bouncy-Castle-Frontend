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
    <div className="w-full bg-dark-bg text-white">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          👉
          <span>Best Children Fun Equipment Rental</span>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-1">
            <FaClock className="text-brand" />
            <span>Mon - Sat 9.00 - 18.00</span>
          </div>

          <span className="h-4 w-px bg-gray-600" />

          <a
            href="/login"
            className="flex items-center gap-1 hover:text-brand transition-colors"
          >
            <FaSignInAlt className="text-brand" />
            <span>Login or Register</span>
          </a>

          <span className="h-4 w-px bg-gray-600" />

          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="hover:text-brand cursor-pointer text-gray-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="hover:text-brand cursor-pointer text-gray-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/07951431111"
              target="_blank"
              aria-label="WhatsApp"
              className="hover:text-brand cursor-pointer text-gray-400"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              aria-label="TikTok"
              className="hover:text-brand cursor-pointer text-gray-400"
            >
              <FaTiktok />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
              className="hover:text-brand cursor-pointer text-gray-400"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
