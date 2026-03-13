import { client } from '@/lib/microcms'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await client.getList({
      endpoint: 'news',
      queries: { limit: 3, orders: '-publishDate' },
      customRequestInit: { next: { revalidate: 60 } }
    })
    return NextResponse.json(data.contents)
  } catch {
    return NextResponse.json([])
  }
}
