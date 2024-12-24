/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/haizi',
  assetPrefix: '/haizi',
  trailingSlash: true,
}

module.exports = nextConfig

