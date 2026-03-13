import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://storyandco.co/', lastModified: new Date() },
    { url: 'https://storyandco.co/company', lastModified: new Date() },
    { url: 'https://storyandco.co/service', lastModified: new Date() },
    { url: 'https://storyandco.co/cases', lastModified: new Date() },
    { url: 'https://storyandco.co/news', lastModified: new Date() },
    { url: 'https://storyandco.co/contact', lastModified: new Date() },
  ]
}
