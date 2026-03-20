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
                {serviceData.logoImage && (
                  <img
                    src={serviceData.logoImage.url}
                    alt={serviceData.title}
                    className="max-w-[200px] h-auto"
                  />
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
