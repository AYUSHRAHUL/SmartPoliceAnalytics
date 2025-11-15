/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb"
    }
  },
  // Provide an env flag so server code can skip DB connections during
  // build/static export. Set to 'true' to avoid connecting to MongoDB
  // while Next.js prerenders pages locally during `next build`.
  env: {
    SKIP_DB_ON_BUILD: "true"
  }
};

module.exports = nextConfig;


