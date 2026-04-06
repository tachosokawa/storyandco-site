import type { MetadataRoute } from 'next'
import { client } from '@/lib/microcms'

const BASE_URL = 'https://www.storyandco.co'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- 静的ページ ---
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/recruit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // サービス詳細ページ
    ...['andstory', 'newmake', 'patchandplay', 'community', 'event', 'sdgs'].map((slug) => ({
      url: `${BASE_URL}/service/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // --- 動的ページ: ニュース ---
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const data = await client.getList({
      endpoint: 'news',
      queries: { limit: 100, fields: 'id,updatedAt' },
      customRequestInit: { next: { revalidate: 3600 } },
    })
    newsPages = data.contents.map((item: { id: string; updatedAt: string }) => ({
      url: `${BASE_URL}/news/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Sitemap: ニュース取得エラー', e)
  }

  // --- 動的ページ: 事例 ---
  let casesPages: MetadataRoute.Sitemap = []
  try {
    const data = await client.getList({
      endpoint: 'cases',
      queries: { limit: 100, fields: 'id,updatedAt' },
      customRequestInit: { next: { revalidate: 3600 } },
    })
    casesPages = data.contents.map((item: { id: string; updatedAt: string }) => ({
      url: `${BASE_URL}/cases/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Sitemap: 事例取得エラー', e)
  }

  return [...staticPages, ...newsPages, ...casesPages]
}
