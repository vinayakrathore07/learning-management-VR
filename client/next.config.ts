import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      // agar video mein aur domains use hue hain toh add kar lena
    ],
  },
};

export default nextConfig;