/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/catering-frontend',
  assetPrefix: '/catering-frontend/',
}

module.exports = nextConfig