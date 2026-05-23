/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/catering-frontend' : '',
  assetPrefix: isProd ? '/catering-frontend/' : '',
}

module.exports = nextConfig