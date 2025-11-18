/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Enable standalone output for Docker
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
}

module.exports = nextConfig

