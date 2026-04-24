import Link from 'next/link'
import { client } from '@/lib/microcms'
import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import TabsSection from '@/components/TabsSection'


export const metadata: Metadata = {
  title: 'インフォメーション',
  description: 'STORY&Co.のインフォメーション・プレスリリース・イベント情報。',
  alternates: { canonical: '/news' },
  openGraph: { url: '/news' },
}

const tabs = [
  { id: 'all', label: 'すべて', category: null, minWidth: '86.6px' },
  { id: 'informations', label: 'インフォメーション', category: 'お知らせ', minWidth: '166px' },
  { id: 'reports', label: 'プレスリリース', category: 'プレスリリース', minWidth: '140px' },
  { id: 'medias', label: 'メディア掲載', category: 'メディア掲載', minWidth: '126px' },
  { id: 'events', label: 'イベント', category: 'イベント', minWidth: '100px' },
]

async function getNews() {
  try {
    const data = await client.getList({
      endpoint: 'news',
      queries: { limit: 100, orders: '-publishDate' },
      customRequestInit: {
        next: { revalidate: 300 }
      }
    })
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
      <div className="pt-[180px] pb-[120px] sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[296px] sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-[20px] sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-[56px] sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">N</span>
          <span id="mv-colorful3" className="tracking-[-0.03em]">e</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">w</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">s</span>
        </h1>
        <p className="mt-5 text-[18px] sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">インフォメーション</p>
      </div>
      <TabsSection items={news} tabs={tabs} itemLink="/news"/>
      <ContactSection />
      <RecruitSection />
      <AndStorySection />

    </>
  )
}
