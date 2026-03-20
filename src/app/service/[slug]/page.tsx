import { client } from '@/lib/microcms'
import type { Metadata } from 'next'
import Image from 'next/image'
import SlideCardsSectionClient from '@/components/SlideCardsSectionClient'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import { processBodyHTML } from '@/lib/html-processor'

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const data = await client.get({
      endpoint: 'services',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
      customRequestInit: {
        next: { revalidate: 60 }
      }
    })
    const service = data.contents[0]
    if (!service) return { title: 'サービス詳細' }
    return { title: service.title, description: service.description }
  } catch {
    return { title: 'サービス詳細' }
  }
}

async function getRelatedCases(tags: string[]): Promise<CaseItem[]> {
  if (!tags || tags.length === 0) return []
  try {
    const filters = tags.map(tag => `tags[contains]${tag}`).join('[or]')
    const data = await client.get({
      endpoint: 'cases',
      queries: { filters, limit: 20, orders: '-publishDate' },
      customRequestInit: {
        next: { revalidate: 60 }
      }
    })
    return data.contents
  } catch {
    return []
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let serviceData: any = null
  try {
    const data = await client.get({
      endpoint: 'services',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
      customRequestInit: {
        next: { revalidate: 60 }
      }
    })
    serviceData = data.contents[0]
  } catch {
    return <div className="pt-[60px] p-24 text-center text-[#999]">サービスが見つかりませんでした</div>
  }

  if (!serviceData) {
    return <div className="pt-[60px] p-24 text-center text-[#999]">サービスが見つかりませんでした</div>
  }

  const relatedCases = await getRelatedCases(serviceData.tags)

  return (
    <>
      <section className="w-full mt-[96px] sm:mt-[80px] md:mt-[96px]">
        <div className="w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 border-b border-[#2d2a24] items-start">
            {/* Main content */}
            <div className="w-full md:col-span-2 md:border-r border-b-0 border-[#2d2a24] px-[20px] py-[40px] sm:px-6 md:px-[80px] sm:pt-12 md:pt-[80px] md:pb-[260px] font-sans text-[#333] text-sm sm:text-base md:text-[16px] leading-[1.4] order-2 md:order-1">
              {/* Hero image */}
              {serviceData.mainImage && (
                <Image
                  src={`${serviceData.mainImage.url}?w=1920&q=100`}
                  alt={serviceData.title}
                  width={1920}
                  height={1440}
                  quality={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 66vw, 1200px"
                  priority
                  unoptimized={true}
                  className="w-full rounded-lg mb-6 sm:mb-8"
                />
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-10 text-[14px] md:text-[16px] md:mt-[80px] text-[#2d2a24]">{serviceData.catchcopy}</p>

              {/* Rich text content */}
              {serviceData.body && (
                <div
                  id="detail_body"
                  className="font-sans"
                  dangerouslySetInnerHTML={{ __html: processBodyHTML(serviceData.body) }}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full md:col-span-1 md:sticky md:top-[96px] self-start order-1 md:order-2">
              <div className="w-full px-[20px] pt-[20px] pb-[56px] sm:p-6 md:p-[80px] border-b border-[#2d2a24]">
                <p className="font-sans text-xs sm:text-sm md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  {serviceData.category || ''}
                </p>
                <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em] mt-2 sm:mt-4 md:mt-[20px] mb-4 sm:mb-6 md:mb-[40px]">{serviceData.title}</h2>
                {serviceData.description && (
                  <p className="font-sans text-[12px] md:text-[14px] text-[#2d2a24] font-medium leading-[2] tracking-[0.08em]">{serviceData.description}</p>
                )}
              </div>
              <div className="w-full py-[40px] md:py-[40px] px-[20px] md:px-[80px] border-b border-[#2d2a24] md:border-b-0">
                {serviceData.logo && (
                  <img
                    src={serviceData.logo.url}
                    alt={serviceData.title}
                    className="max-w-[200px] h-auto"
                  />
                )}
                {(slug === 'patchandplay' || slug === 'newmake') && (
                  <div className="mt-6">
                    <p className="font-sans text-[12px] md:text-[14px] text-[#2d2a24] font-bold tracking-[0.08em] leading-[2]">公式SNS</p>
                    <div className="flex items-center gap-4 mt-2">
                      {slug === 'patchandplay' && (
                        <>
                          <a href="https://www.instagram.com/patchandplay_tokyo/" target="_blank" rel="noopener noreferrer" className="text-[#2d2a24] hover:text-[#18bed7] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.47.96c.458.458.779.921.96 1.47.163.46.349 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.241 1.97-.404 2.43a4.088 4.088 0 01-.96 1.47 4.088 4.088 0 01-1.47.96c-.46.163-1.26.349-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.241-2.43-.404a4.088 4.088 0 01-1.47-.96 4.088 4.088 0 01-.96-1.47c-.163-.46-.349-1.26-.404-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.055-1.17.241-1.97.404-2.43a4.088 4.088 0 01.96-1.47 4.088 4.088 0 011.47-.96c.46-.163 1.26-.349 2.43-.404C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.903.333 4.14.63a5.876 5.876 0 00-2.126 1.384A5.876 5.876 0 00.63 4.14C.333 4.903.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.15.558 2.913a5.876 5.876 0 001.384 2.126A5.876 5.876 0 004.14 23.37c.763.297 1.635.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.15-.261 2.913-.558a5.876 5.876 0 002.126-1.384 5.876 5.876 0 001.384-2.126c.297-.763.499-1.635.558-2.913C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.059-1.278-.261-2.15-.558-2.913a5.876 5.876 0 00-1.384-2.126A5.876 5.876 0 0019.86.63C19.097.333 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
                            </svg>
                          </a>
                          <a href="https://www.tiktok.com/@patchandplay_tokyo" target="_blank" rel="noopener noreferrer" className="text-[#2d2a24] hover:text-[#18bed7] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 004.76 1.52V7.48a4.85 4.85 0 01-1-.79z" fill="currentColor"/>
                            </svg>
                          </a>
                        </>
                      )}
                      {slug === 'newmake' && (
                        <a href="https://www.instagram.com/newmakelabo/" target="_blank" rel="noopener noreferrer" className="text-[#2d2a24] hover:text-[#18bed7] transition-colors">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.47.96c.458.458.779.921.96 1.47.163.46.349 1.26.404 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.241 1.97-.404 2.43a4.088 4.088 0 01-.96 1.47 4.088 4.088 0 01-1.47.96c-.46.163-1.26.349-2.43.404-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.241-2.43-.404a4.088 4.088 0 01-1.47-.96 4.088 4.088 0 01-.96-1.47c-.163-.46-.349-1.26-.404-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.055-1.17.241-1.97.404-2.43a4.088 4.088 0 01.96-1.47 4.088 4.088 0 011.47-.96c.46-.163 1.26-.349 2.43-.404C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.903.333 4.14.63a5.876 5.876 0 00-2.126 1.384A5.876 5.876 0 00.63 4.14C.333 4.903.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.15.558 2.913a5.876 5.876 0 001.384 2.126A5.876 5.876 0 004.14 23.37c.763.297 1.635.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.15-.261 2.913-.558a5.876 5.876 0 002.126-1.384 5.876 5.876 0 001.384-2.126c.297-.763.499-1.635.558-2.913C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.059-1.278-.261-2.15-.558-2.913a5.876 5.876 0 00-1.384-2.126A5.876 5.876 0 0019.86.63C19.097.333 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
                {serviceData.externalUrl && (
                  <a
                    href={serviceData.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                  >
                    外部サイトを見る →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <>
          <section className="w-full overflow-hidden">
            <h2 className="border-b border-[#2d2a24] px-[80px] pt-[38px] pb-[42px] font-sans font-bold text-[24px] leading-[2] tracking-[0.04em] text-[#2d2a24] text-center">関連事例</h2>
          </section>
          <SlideCardsSectionClient slideCards={relatedCases} linkHref="cases" linkText="すべての事例を見る" />
        </>
      )}

      <ContactSection />
      <RecruitSection />
    </>
  )
}
