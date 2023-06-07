/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/auth/login",
      },
    ];
  },
};

module.exports = nextConfig;
