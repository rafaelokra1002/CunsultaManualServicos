/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Se NEXT_PUBLIC_API_URL estiver definido (deploy Vercel), proxy /api/* e /covers/* para a VPS
    if (!apiUrl) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: "/covers/:path*",
        destination: `${apiUrl}/covers/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
