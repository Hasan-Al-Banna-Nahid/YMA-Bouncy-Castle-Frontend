import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TopHeader from "@/components/top-header";
import QueryProvider from "@/providers/query-provider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const SITE_URL = "https://ymabouncycastles.uk";
const brandName = "YMA Bouncy Castle";
const defaultOG = `${SITE_URL}/og.jpg`;

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
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="main-content">
          <QueryProvider>
            <TopHeader />
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
          <Toaster richColors position="top-right" />
        </div>
      </body>
    </html>
  );
}
