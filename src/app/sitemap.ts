import { MetadataRoute } from 'next'
import { client } from '@/lib/microcms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://storyandco.co'

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/company`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/recruit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // サービス個別ページ
  const servicePages: MetadataRoute.Sitemap = [
    'patchandplay', 'andstory', 'newmake', 'community', 'event', 'sdgs'
  ].map((slug) => ({
    url: `${baseUrl}/service/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // microCMS: 事例ページ
  let casePages: MetadataRoute.Sitemap = []
  try {
    const casesData = await client.get({
      endpoint: 'cases',
      queries: { limit: 100, fields: 'id,updatedAt' },
    })
    casePages = casesData.contents.map((item: { id: string; updatedAt: string }) => ({
      url: `${baseUrl}/cases/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch cases', e)
  }

  // microCMS: ニュースページ
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const newsData = await client.get({
      endpoint: 'news',
      queries: { limit: 100, fields: 'id,updatedAt' },
    })
    newsPages = newsData.contents.map((item: { id: string; updatedAt: string }) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch news', e)
  }

  return [...staticPages, ...servicePages, ...casePages, ...newsPages]
}
