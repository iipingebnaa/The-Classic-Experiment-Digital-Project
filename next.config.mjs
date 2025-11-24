/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",       // enables static export
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},          // optional: silences Turbopack warnings
}

export default nextConfig
