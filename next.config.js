/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/haizi',
  assetPrefix: '/haizi/',
  trailingSlash: true,
  distDir: 'dist',
}

module.exports = nextConfig

