/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_EXPORT === 'true'

const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? 'export' : 'standalone', // Standalone for server deploys, export for GitHub Pages
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
    unoptimized: isStaticExport,
  },
}

module.exports = nextConfig

