import CasesSectionClient from './CasesSectionClient'

type CaseItem = {
  id: string | number
  title: string
  category?: string
  summary?: string
  thumbnail?: {
    url: string
  }
}

async function getLatestCases(): Promise<CaseItem[]> {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'cases',
      queries: { limit: 6, orders: '-publishedAt' },
    })
    return data.contents
  } catch {
    return [
      {
        'id':1,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_6eed2116-f66e-4a04-9882-5ebbe5b808dc_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人..."
      },
      {
        'id':2,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_376b678b-25c5-409a-a934-654ed44179b4_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人..."
      },
      {
        'id':3,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1108x827_v-fs_webp_6d4de88d-87f1-47b5-8129-aa9354e15a3f_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人..."
      }
    ]
  }
}

export default async function CasesSection() {
  const cases = await getLatestCases()
  return <CasesSectionClient cases={cases} />
}
