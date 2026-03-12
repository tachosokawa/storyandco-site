import { client } from '@/lib/microcms'
import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import TabsSection from '@/components/TabsSection'


export const metadata: Metadata = {
  title: '事例のご紹介',
  description: 'STORY&Co.の事例紹介。コミュニティ開発・地域イベントプロデュース・SDGs推進支援などの実績をご紹介します。',
}

type CaseItem = {
  id: string | number
  title: string
  category?: string[]
  serviceCategory?: string[]
  summary?: string
  tags?: string[]
  thumbnail?: {
    url: string
  }
}

async function getLatestCases(): Promise<CaseItem[]> {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'cases',
      queries: { limit: 20, orders: '-publishedAt' },
    })
    return data.contents
  } catch {
    return []
  }
}

const tabs = [
  { id: 'all', label: 'すべて', category: null },
  { id: 'community', label: 'コミュニティ開発', category: 'コミュニティ開発' },
  { id: 'regional', label: '地域・イベント', category: '地域・イベント' },
  { id: 'sdgs', label: 'SDGs推進支援', category: 'SDGs推進支援' },
]

export default async function CasesPage() {
  const cases = await getLatestCases()

  return (
    <>
      <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[296px] pb-12 sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-4 sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">C</span>
          <span id="mv-colorful2" className="tracking-[-0.03em]">a</span>
          <span id="mv-colorful3" className="tracking-[-0.04em]">s</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">e</span>
          <span id="mv-colorful5" className="tracking-[-0.06em]">s</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">事例のご紹介</p>
      </div>
      <TabsSection items={cases} tabs={tabs} itemLink={"cases"} />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
