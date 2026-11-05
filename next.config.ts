import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
        port: "",
        pathname: "/**", // Дозволяє всі шляхи зображень з цього домена
      },
    ],
  },
};

export default nextConfig;
