/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      {
        protocol: 'https',
        hostname: 'files.microcms-assets.io',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old STUDIO URLs → New Next.js URLs (301 permanent redirects)
      // /project (old cases page) → /cases
      {
        source: '/project',
        destination: '/cases',
        permanent: true,
      },
      // /project/:slug (old case detail pages) → /cases
      {
        source: '/project/:slug',
        destination: '/cases',
        permanent: true,
      },
      // /inquiry (old contact page) → /contact
      {
        source: '/inquiry',
        destination: '/contact',
        permanent: true,
      },
      // /policy (old privacy policy) → /privacy
      {
        source: '/policy',
        destination: '/privacy',
        permanent: true,
      },
      // /news/notice, /news/media, /news/event (old news categories) → /news
      {
        source: '/news/notice',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/news/media',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/news/event',
        destination: '/news',
        permanent: true,
      },
      // /service/event (old service page) → /service
      {
        source: '/service/event',
        destination: '/service',
        permanent: true,
      },
      // /service/towernohour (old service page) → /service
      {
        source: '/service/towernohour',
        destination: '/service',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
