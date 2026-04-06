import { client } from '@/lib/microcms'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SlideCardsSectionClient from '@/components/SlideCardsSectionClient'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import { processBodyHTML } from '@/lib/html-processor'
import Image from "next/image";
import { ArticleJsonLd } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params
    const data = await client.get({ 
      endpoint: 'cases', 
      contentId: id,
      customRequestInit: {
        next: { revalidate: 3600 }
      }
    })
    const description = data.summary
      || (data.content ? data.content.replace(/<[^>]*>/g, '').slice(0, 120) + '...' : '')
      || `STORY&Co.の事例: ${data.title}`
    return {
      title: data.title,
      description,
      alternates: { canonical: `/cases/${id}` },
      openGraph: {
        title: data.title,
        description,
        url: `/cases/${id}`,
        ...(data.thumbnail?.url ? { images: [{ url: data.thumbnail.url }] } : {}),
      },
    }
  } catch {
    return { title: '事例詳細' }
  }
}

type CaseItem = {
  id: string | number
  publishDate: string  //
  title: string
  category?: string[]
  serviceCategory?: string[]
  excerpt?: string
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
      queries: { limit: 20, orders: '-publishDate' },
      customRequestInit: {
        next: { revalidate: 3600 }
      }
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
    caseData = await client.get({ 
      endpoint: 'cases', 
      contentId: id,
      customRequestInit: {
        next: { revalidate: 3600 }
      }
    })
  } catch {
    notFound()
  }

  const caseDescription = caseData.summary
    || (caseData.body ? caseData.body.replace(/<[^>]*>/g, '').slice(0, 120) : '')
    || caseData.title

  return (
    <>
      <ArticleJsonLd
        title={caseData.title}
        description={caseDescription}
        url={`https://www.storyandco.co/cases/${id}`}
        datePublished={caseData.publishDate || caseData.publishedAt || caseData.createdAt}
        imageUrl={caseData.thumbnail?.url}
      />
      <section className="w-full mt-[96px] sm:mt-[80px] md:mt-[96px]">
        <div className="w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 border-b border-[#2d2a24] items-start">
            {/* Main content */}
            <div className="w-full md:col-span-2 md:border-r border-b-0 border-[#2d2a24] px-[20px] py-[40px] sm:px-6 md:px-[80px] sm:pt-12 md:pt-[80px] md:pb-[260px] font-sans text-[#333] text-sm sm:text-base md:text-[16px] leading-[1.4] order-2 md:order-1">
              {/* Hero image */}
              {caseData.thumbnail && (
                <Image
                  src={caseData.thumbnail.url}
                  alt={caseData.title}
                  width={1920}
                  height={1440}
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 66vw, 1200px"
                  priority
                  className="w-full rounded-lg mb-6 sm:mb-8" />
              )}
              {/* Rich text content - HTML rendered correctly */}
              {caseData.body && (
                <div
                  id="detail_body"
                  className="font-sans mt-10 md:mt-[80px]"
                  dangerouslySetInnerHTML={{ __html: processBodyHTML(caseData.body) }}
                />
              )}

            </div>

            {/* Sidebar */}
            <div className="w-full md:col-span-1 md:sticky md:top-[96px] self-start order-1 md:order-2">
              <div className="w-full px-[20px] pt-[20px] pb-[56px] sm:p-6 md:p-[80px] border-b border-[#2d2a24]">
                <Link href="/cases" className='font-sans text-xs sm:text-sm md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2] hover:text-[#18bed7]'>
                  {Array.isArray(caseData.serviceCategory) && caseData.serviceCategory.length > 0 
                    ? caseData.serviceCategory.join(' | ') 
                    : ''}
                </Link>
                <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em] mt-2 sm:mt-4 md:mt-[20px] mb-4 sm:mb-6 md:mb-[40px]">{caseData.title}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-8">
                  <p className="font-sans text-[12px] md:text-[14px] text-[#2d2a24] font-medium leading-[1]">
                    {(() => { const d = new Date(caseData.publishDate); return `${d.getUTCFullYear()}.${String(d.getUTCMonth()+1).padStart(2,'0')}.${String(d.getUTCDate()).padStart(2,'0')}`; })()}
                  </p>
                  <span className="inline">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                  {(caseData.tags && caseData.tags.length > 0 && caseData.tags.map((tag: string, tagIndex: number) => (
                    <Link 
                      key={tagIndex}
                      href={`/cases/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                      className='inline-block border border-[#2d2a24] px-2 md:px-[12px] py-1 md:py-[6px] rounded-lg font-poppins font-medium text-[12px] pt-[5px] pb-[7px] px-[12px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'
                    >
                      {tag}
                    </Link>
                  )))}
                </div>
              </div>
              <div className="w-full py-[40px] md:py-[40px] px-[20px] md:px-[80px] border-b border-[#2d2a24] md:border-b-0">
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
