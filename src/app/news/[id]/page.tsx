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
    const data = await client.get({ 
      endpoint: 'news', 
      contentId: id,
      customRequestInit: {
        cache: 'no-store'
      }
    })
    return { title: data.title }
  } catch {
    return { title: 'お知らせ' }
  }
}

interface NewsItem {
  id: number | string
  publishedAt: string
  category?: string[]
  serviceCategory?: string[]
  title: string
  excerpt?: string
  tags?: string[]
  thumbnail?: {
    url: string
  }
}

async function getLatestNews() {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 20, orders: '-publishedAt' },
      customRequestInit: {
        cache: 'no-store'
      }
    })
    return data.contents
  } catch {
    return []
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = await getLatestNews()
  let newsData: any = null
  try {
    newsData = await client.get({ 
      endpoint: 'news', 
      contentId: id,
      customRequestInit: {
        cache: 'no-store'
      }
    })
  } catch {
    return <div className="pt-[60px] p-24 text-center text-[#999]">記事が見つかりませんでした</div>
  }

  return (
    <>
      <section className="w-full mt-[96px] sm:mt-[80px] md:mt-[96px]">
        <div className="w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 border-b border-[#2d2a24] items-start">
            {/* Main content */}
            <div className="w-full md:col-span-2 md:border-r border-b md:border-b-0 border-[#2d2a24] px-[20px] py-[40px] sm:px-6 md:px-[80px] md:pt-[80px] md:pb-[260px] font-sans text-[#333] text-sm sm:text-base md:text-[16px] leading-[1.4] order-2 md:order-1">
              {/* Hero image */}
              {newsData.thumbnail && (
                <div className="aspect-[16/9] rounded-lg md:rounded-xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8">
                  <img src={newsData.thumbnail.url} alt={newsData.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-10 text-[14px] md:text-[16px] md:mt-[80px] text-[#2d2a24]">{newsData.excerpt}</p>

              {/* Rich text content - HTML rendered correctly */}
              {newsData.body && (
                <div
                  id="detail_body"
                  className="font-sans text-sm sm:text-base md:text-[16px] text-[#333]"
                  dangerouslySetInnerHTML={{ __html: processBodyHTML(newsData.body) }}
                />
              )}

            </div>

            {/* Sidebar */}
            <div className="w-full md:col-span-1 md:sticky md:top-[96px] self-start order-1 md:order-2">
              <div className="w-full px-[20px] pt-[20px] sm:p-6 md:p-[80px] border-b border-[#2d2a24] md:border-b-0">
                <Link href="/news" className='font-sans text-xs sm:text-sm md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2] hover:text-[#18bed7]'>
                  {Array.isArray(newsData.category) && newsData.category.length > 0 
                    ? newsData.category.join(' | ') 
                    : ''}
                </Link>
                <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em] mt-2 sm:mt-4 md:mt-[20px] mb-9 md:mb-[40px]">{newsData.title}</h2>
                <div className="flex flex-wrap items-center mb-10 gap-2">
                  <p className="font-sans text-[12px] sm:text-sm md:text-[14px] text-[#2d2a24] font-medium leading-[1]">
                    {new Date(newsData.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </p>
                  {newsData.tags && newsData.tags.length > 0 && (
                    <>
                      <span className="text-[#2d2a24]">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                      {newsData.tags.map((tag: string, tagIndex: number) => (
                    <Link 
                      key={tagIndex}
                      href={`/cases/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                      className='border border-[#2d2a24] md:px-[12px] md:py-[6px] rounded-lg font-poppins font-medium text-[12px] pt-[5px] pb-[7px] px-[12px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'
                    >
                        {tag}
                      </Link>
                    ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <h2 className="border-b border-[#2d2a24] px-[80px] pt-[38px] pb-[42px] font-sans font-bold text-[24px] leading-[2] tracking-[0.04em] text-[#2d2a24] text-center">関連記事</h2>
      </section>
      <SlideCardsSectionClient slideCards={news} linkHref="news" linkText="すべての事例を見る" />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
