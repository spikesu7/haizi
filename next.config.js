/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/haizi',
  assetPrefix: '/haizi/',
}

module.exports = nextConfig

