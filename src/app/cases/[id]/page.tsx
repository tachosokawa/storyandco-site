import { client } from '@/lib/microcms'
import Link from 'next/link'
import type { Metadata } from 'next'
import SlideCardsSectionClient from '@/components/SlideCardsSectionClient'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import { processBodyHTML } from '@/lib/html-processor'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params
    const data = await client.get({ endpoint: 'cases', contentId: id })
    return { title: data.title, description: data.summary }
  } catch {
    return { title: '事例詳細' }
  }
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


export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cases = await getLatestCases()
  const { id } = await params
  let caseData: any = null
  try {
    caseData = await client.get({ endpoint: 'cases', contentId: id })
  } catch {
    return <div className="pt-[60px] p-24 text-center text-[#999]">事例が見つかりませんでした</div>
  }
  console.log("caseData", caseData);
  return (
    <>
      <section className="w-full mt-[96px] sm:mt-[80px] md:mt-[96px]">
        <div className="w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 border-b border-[#2d2a24] items-start">
            {/* Main content */}
            <div className="w-full md:col-span-2 md:border-r border-b md:border-b-0 border-[#2d2a24] px-4 sm:px-6 md:px-[80px] pt-8 sm:pt-12 md:pt-[80px] pb-12 sm:pb-16 md:pb-[260px] font-sans text-[#333] text-sm sm:text-base md:text-[16px] leading-[1.4]">
              {/* Hero image */}
              {caseData.thumbnail && (
                <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8">
                  <img src={caseData.thumbnail.url} alt={caseData.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-8 sm:mt-12 md:mt-[80px]">{caseData.summary}</p>

              {/* Rich text content - HTML rendered correctly */}
              {caseData.body && (
                <div
                  id="detail_body"
                  className="font-sans"
                  dangerouslySetInnerHTML={{ __html: processBodyHTML(caseData.body) }}
                />
              )}

            </div>

            {/* Sidebar */}
            <div className="w-full md:col-span-1 md:sticky md:top-[96px] self-start">
              <div className="w-full p-4 sm:p-6 md:p-[80px] border-b border-[#2d2a24]">
                <Link href="/cases" className='font-sans text-xs sm:text-sm md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2] hover:text-[#18bed7]'>
                  {Array.isArray(caseData.serviceCategory) && caseData.serviceCategory.length > 0 
                    ? caseData.serviceCategory.join(' | ') 
                    : ''}
                </Link>
                <h2 className="font-sans font-bold text-lg md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em] mt-3 sm:mt-4 md:mt-[20px] mb-4 sm:mb-6 md:mb-[40px]">{caseData.title}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <p className="font-sans text-xs sm:text-sm md:text-[14px] text-[#2d2a24] font-medium leading-[1]">
                    {new Date(caseData.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </p>
                  <span className="hidden sm:inline">|</span>
                  {(caseData.tags && caseData.tags.length > 0 && caseData.tags.map((tag: string, tagIndex: number) => (
                    <Link 
                      key={tagIndex}
                      href={`/cases/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                      className='border border-[#2d2a24] px-2 md:px-[12px] py-1 md:py-[6px] rounded-lg font-poppins font-medium text-[10px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'
                    >
                      {tag}
                    </Link>
                  )))}
                </div>
              </div>
              <div className="w-full py-6 sm:py-8 md:py-[40px] px-4 sm:px-6 md:px-[80px]">
                <p className="font-sans text-xs sm:text-sm md:text-[12px] text-[#333] font-bold leading-[2] tracking-[0.08em]">{caseData.clientName || '—'}</p>
                <p className="font-sans text-xs sm:text-sm md:text-[12px] text-[#2d2a24] font-medium leading-[2] tracking-[0.08em]">{caseData.slug || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <h2 className="border-b border-[#2d2a24] px-[80px] pt-[38px] pb-[42px] font-sans font-bold text-[24px] leading-[2] tracking-[0.04em] text-[#2d2a24] text-center">関連記事</h2>
      </section>
      <SlideCardsSectionClient slideCards={cases} linkHref="cases" linkText="すべての事例を見る" />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
