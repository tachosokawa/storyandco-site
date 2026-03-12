import Link from 'next/link'
import { client } from '@/lib/microcms'
import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import TabsSection from '@/components/TabsSection'


export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'STORY&Co.のお知らせ・プレスリリース・イベント情報。',
}

const tabs = [
  { id: 'all', label: 'すべて', category: null },
  { id: 'informations', label: 'インフォメーション', category: 'インフォメーション' },
  { id: 'reports', label: 'プレスリリース', category: 'プレスリリース' },
  { id: 'medias', label: 'メディア掲載', category: 'メディア掲載' },
  { id: 'events', label: 'イベント', category: 'イベント' },
]

async function getNews() {
  try {
    const data = await client.getList({ endpoint: 'news', queries: { limit: 20, orders: '-publishedAt' } })
    return data.contents
  } catch (error) {
    console.error('Failed to fetch news from microCMS:', error)
    return []
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <>
      <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[296px] pb-12 sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-4 sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">N</span>
          <span id="mv-colorful3" className="tracking-[-0.03em]">e</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">w</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">s</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">お知らせ</p>
      </div>
      <TabsSection items={news} tabs={tabs} itemLink="/news"/>
      <ContactSection />
      <RecruitSection />
      <AndStorySection />

    </>
  )
}
