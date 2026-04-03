/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images configuration for Cloudflare
  images: {
    unoptimized: true,
  },
  // Disable experimental features that don't work in Workers
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Disable MCP server (not compatible with Cloudflare Workers)
  serverExternalPackages: [],
};

module.exports = nextConfig;
