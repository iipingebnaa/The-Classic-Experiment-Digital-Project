/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  pwa: {
    dest: 'public',    // where the service worker and manifest live
    register: true,    // auto-register service worker
    skipWaiting: true, // activate new SW immediately
  },
  turbopack: {},       // optional: silences Turbopack warnings
}

export default nextConfig
