const isProd = true;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // assetPrefix: isProd ? 'https://cdn.mangachimp.online' : undefined,
};

export default nextConfig;

/*
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for 1 year
          },
        ],
      }
    ];
  },
};

export default nextConfig;
*/

// example.com/_next/static/*
// /manga/:manganame  cache for 60 seconds, then revalidate in cloudflare
// /manga/:manganame/:chapter cache for 1 year, revalidate when requested in cloudflare