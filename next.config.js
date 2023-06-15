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
      {
        source: "/student",
        destination: "/student/assessments",
      },
      {
        source: "/mentor",
        destination: "/mentor/records",
      },
    ];
  },
};

module.exports = nextConfig;
