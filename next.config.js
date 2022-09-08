/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
  swcMinify: true
}

module.exports = nextConfig
