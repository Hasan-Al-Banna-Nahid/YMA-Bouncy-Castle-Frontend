import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TopHeader from "@/components/top-header";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://ymabouncycastles.uk";
const brandName = "YMA Bouncy Castle";
const defaultOG = `${SITE_URL}/og.jpg`; // place a 1200x630 image in /public/og.jpg

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brandName} — Best Children Fun Equipment Rental`,
    template: `%s | ${brandName}`,
  },
  description:
    "Bouncy castle & soft play hire across Greater London, Enfield and Essex. Fast delivery, friendly service, and safe equipment for unforgettable events.",
  keywords: [
    "bouncy castle hire",
    "soft play",
    "London",
    "Enfield",
    "Essex",
    "party rentals",
    "children fun equipment",
    "YMA Bouncy Castle",
  ],
  applicationName: brandName,
  authors: [{ name: brandName }],
  creator: brandName,
  publisher: brandName,
  referrer: "strict-origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: brandName,
    title: `${brandName} — Best Children Fun Equipment Rental`,
    description:
      "Hire bouncy castles, soft play & more across Greater London, Enfield, and Essex.",
    images: [{ url: defaultOG, width: 1200, height: 630, alt: brandName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} — Best Children Fun Equipment Rental`,
    description:
      "Bouncy castle & soft play hire across Greater London, Enfield and Essex.",
    images: [defaultOG],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "events",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#F4A949" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // JSON-LD: Organization + WebSite (with SearchAction)
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-192x192.png`,
    sameAs: [
      "https://www.facebook.com/people/YMA-Bouncy-Castles-LTD/100092844622235/",
      "https://www.instagram.com/yma.bouncycastles/",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-7951-431111",
        contactType: "customer service",
        areaServed: ["GB"],
        availableLanguage: ["en"],
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: brandName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip link for a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-black/80 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        {/* App */}
        <div id="main-content">
          <TopHeader />
          <Navbar />
          {children}
          <Footer />
        </div>

        {/* JSON-LD (SEO rich results) */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
