import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["st3.depositphotos.com", "res.cloudinary.com", "i.pravatar.cc"],
  },
};

export default nextConfig;
