/** @type {import('next').NextConfig} */
require("dotenv").config()

const nextConfig = {
  env: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    ADDRESS: process.env.ADDRESS,
    SEED_PHRASE: process.env.SEED_PHRASE,
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
