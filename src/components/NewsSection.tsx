import NewsSectionClient from './NewsSectionClient'

interface NewsItem {
  id: number | string
  publishedAt: string
  category?: string
  title: string
  tags?: string[]
}

async function getLatestNews() {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 5, orders: '-publishedAt' },
    })
    return data.contents
  } catch {
    return []
  }
}

export default async function NewsSection() {
  const news = await getLatestNews()
  return <NewsSectionClient news={news} />
}

export type { NewsItem }
