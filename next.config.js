/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_EXPORT === 'true'

const repoName = 'Jackie-Liang-Profilo'

const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? 'export' : 'standalone', // Standalone for server deploys, export for GitHub Pages
  basePath: isStaticExport ? `/${repoName}` : undefined,
  assetPrefix: isStaticExport ? `/${repoName}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isStaticExport ? `/${repoName}` : '',
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
    unoptimized: isStaticExport,
  },
}

module.exports = nextConfig

