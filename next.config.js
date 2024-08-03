/** @type {import('next').NextConfig} */
require("dotenv").config()

const nextConfig = {
  env: {
    PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
    SEED_PHRASE: process.env.NEXT_PUBLIC_SEED_PHRASE,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
}

module.exports = nextConfig
