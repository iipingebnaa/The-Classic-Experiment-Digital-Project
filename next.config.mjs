import { withPWA } from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  pwa: {
    dest: "public",        // where service worker and PWA files will be generated
    register: true,        // auto-register service worker
    skipWaiting: true,     // activate SW immediately
  },
});

export default nextConfig;
