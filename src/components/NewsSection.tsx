import NewsSectionClient from './NewsSectionClient'

interface NewsItem {
  id: number | string
  publishDate: string
  category?: string
  title: string
  tags?: string[]
}

async function getLatestNews() {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 100, orders: '-publishDate' },
      customRequestInit: {
        next: { revalidate: 3600 }
      }
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
