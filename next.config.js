/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/login",
      },
    ];
  },
};

module.exports = nextConfig;
