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
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old STUDIO URLs → New Next.js URLs (301 permanent redirects)
      { source: '/home', destination: '/', permanent: true },
      { source: '/home/', destination: '/', permanent: true },
      { source: '/project', destination: '/cases', permanent: true },
      { source: '/project/category/:slug', destination: '/cases', permanent: true },
      { source: '/project/:slug', destination: '/cases', permanent: true },
      { source: '/inquiry', destination: '/contact', permanent: true },
      { source: '/inquiry/:slug', destination: '/contact', permanent: true },
      { source: '/policy', destination: '/privacy', permanent: true },
      { source: '/news/notice', destination: '/news', permanent: true },
      { source: '/news/media', destination: '/news', permanent: true },
      { source: '/news/event', destination: '/news', permanent: true },
      { source: '/news/category/:slug', destination: '/news', permanent: true },
      // Old service URLs with different slugs
      { source: '/service/new-make', destination: '/service/newmake', permanent: true },
      { source: '/service/towernohour', destination: '/service', permanent: true },
      // Old service URL variants
      { source: '/service/and-story', destination: '/service/andstory', permanent: true },
      // Old STUDIO news URLs (IDs don't match new microCMS IDs)
      { source: '/news/pr', destination: '/news', permanent: true },
      { source: '/news/pr001', destination: '/news', permanent: true },
      { source: '/news/post-:id', destination: '/news', permanent: true },
      { source: '/news/tokyometro', destination: '/news', permanent: true },
      { source: '/news/lifefood', destination: '/news', permanent: true },
      // Deleted/unpublished microCMS articles → redirect to news list
      { source: '/news/fhquIl7h', destination: '/news', permanent: true },
      { source: '/news/D58FhYPK', destination: '/news', permanent: true },
      { source: '/news/xgO9ESFu', destination: '/news', permanent: true },
      { source: '/news/UtXwyC6u', destination: '/news', permanent: true },
    ]
  },
}

module.exports = nextConfig
