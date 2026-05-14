/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "bcryptjs"],
  experimental: {
    outputFileTracingExcludes: {
      "/api/download": [
        "node_modules/@prisma/engines/**",
        "node_modules/@prisma/client/libquery_engine*",
        "node_modules/prisma/libquery_engine*",
        "node_modules/pdfjs-dist/**",
        "node_modules/@napi-rs/canvas/**",
      ],
    },
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Se NEXT_PUBLIC_API_URL estiver definido (deploy Vercel), proxy /api/* e /covers/* para a VPS
    if (!apiUrl) return { beforeFiles: [], afterFiles: [], fallback: [] };
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${apiUrl}/api/:path*`,
        },
        {
          source: "/covers/:path*",
          destination: `${apiUrl}/covers/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
