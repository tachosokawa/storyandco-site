import { client } from '@/lib/microcms'
import { notFound } from 'next/navigation'
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
        next: { revalidate: 3600 }
      }
    })
    const service = data.contents[0]
    if (!service) return { title: 'サービス詳細' }
    return {
      title: service.title,
      description: service.description,
      alternates: { canonical: `/service/${slug}` },
      openGraph: { url: `/service/${slug}` },
    }
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
        next: { revalidate: 3600 }
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
        next: { revalidate: 3600 }
      }
    })
    serviceData = data.contents[0]
  } catch {
    notFound()
  }

  if (!serviceData) {
    notFound()
  }

  const relatedCases = await getRelatedCases(serviceData.tags)

  return (
    <>
      {/* Hero: left info + right main visual */}
      <section className="w-full mt-[96px] sm:mt-[80px] md:mt-[96px]">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#2d2a24]">
          {/* Left column: category → logo/title → description → SNS */}
          <div className="md:border-r border-b md:border-b-0 border-[#2d2a24] px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px] font-sans flex flex-col justify-center">
            <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
              {serviceData.category || ''}
            </p>
            {serviceData.logo ? (
              <img
                src={serviceData.logo.url}
                alt={serviceData.title}
                className="mt-6 md:mt-[40px] max-w-[200px] md:max-w-[300px] h-auto"
              />
            ) : (
              <h2 className="font-sans font-bold text-[30px] md:text-[48px] text-[#2d2a24] leading-[1.4] tracking-[0.04em] mt-6 md:mt-[40px]">{serviceData.title}</h2>
            )}
            {serviceData.description && (
              <p className="font-sans text-[12px] md:text-[16px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-6 md:mt-[40px]">{serviceData.description}</p>
            )}
            {serviceData.catchcopy && (
              <p className="font-sans text-[12px] md:text-[16px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4 md:mt-[20px]">{serviceData.catchcopy}</p>
            )}
            {(slug === 'patchandplay' || slug === 'newmake') && (
              <div className="mt-8 md:mt-[60px]">
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
                className="mt-6 md:mt-[40px] inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
              >
                外部サイトを見る →
              </a>
            )}
          </div>

          {/* Right column: main visual (card with padding) */}
          <div className="flex items-center justify-center p-8 md:p-12">
            {serviceData.mainImage && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={`${serviceData.mainImage.url}?w=1200&q=80`}
                  alt={serviceData.title}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority

                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body content: full width */}
      {serviceData.body && (
        <section className="w-full border-b border-[#2d2a24]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-2 px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px] font-sans text-[#333] text-sm sm:text-base md:text-[16px] leading-[1.4]">
              <div
                id="detail_body"
                className="font-sans max-w-none"
                dangerouslySetInnerHTML={{ __html: processBodyHTML(serviceData.body) }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Two images section */}
      {(serviceData.image1 || serviceData.image2) && (
        <section className="w-full border-t border-b border-[#2d2a24]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {serviceData.image1 && (
              <div className="p-6 md:p-12 bg-[#FAF9F5] border-r border-[#2d2a24]">
                <div className="relative aspect-square">
                  <Image
                    src={`${serviceData.image1.url}?w=1200&q=85`}
                    alt={serviceData.image1.alt || serviceData.title}
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
  
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            {serviceData.image2 && (
              <div className="p-6 md:p-12 bg-[#FAF9F5]">
                <div className="relative aspect-square">
                  <Image
                    src={`${serviceData.image2.url}?w=1200&q=85`}
                    alt={serviceData.image2.alt || serviceData.title}
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
  
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Collaboration section (patchandplay only) */}
      {slug === 'patchandplay' && (
        <section className="w-full border-b border-[#2d2a24]">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            {/* Left column: text */}
            <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px] flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#2d2a24]">
              <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                コラボレーションをご検討中の企業ご担当者さまへ
              </p>
              <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em] mt-4 md:mt-6">
                企業・ブランドとのコラボレーション
              </h2>
              <p className="font-sans text-[12px] md:text-[16px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-6 md:mt-[40px]">
                PATCH&PLAYでは、企業・ブランド・自治体の皆さまと共に、サステナビリティやアップサイクル文化を発信するコラボレーション企画を提供しています。限定パッチや刺繡アイテムの共同制作、POP-UP・展示の共同開催、ブランドやイベントテーマに合わせたデザイン提案など、世界観や素材を生かした多様なプロモーションが可能です。CSRキャンペーンとの連動や商業施設での展示など、企画内容や展開方法を目的に合わせた最適なかたちでご提案します。さらに、NewMakeとの連動によって、企業が伝えたいメッセージをより創造的に届ける設計も可能です。
              </p>
            </div>
            {/* Right column: image */}
            <div className="py-8 md:py-12 px-[20px] sm:px-6 md:px-[40px]">
              <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-lg">
                <Image
                  src="/collab.webp"
                  alt="企業・ブランドとのコラボレーション"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"

                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Collaboration section (newmake only) */}
      {slug === 'newmake' && (
        <section className="w-full border-b border-[#2d2a24]">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-stretch">
            {/* Left column (mobile: bottom): image */}
            <div className="py-8 md:py-12 px-[20px] sm:px-6 md:px-[40px] md:border-r border-[#2d2a24]">
              <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-lg">
                <Image
                  src="/newmake-collab.webp"
                  alt="コラボレーション企業を募集中！"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"

                  className="object-cover"
                />
              </div>
            </div>
            {/* Right column (mobile: top): text */}
            <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px] flex flex-col justify-center border-b md:border-b-0">
              <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                コラボレーションをご検討中の企業ご担当者さまへ
              </p>
              <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em] mt-4 md:mt-6">
                コラボレーション企業を募集中！
              </h2>
              <p className="font-sans text-[12px] md:text-[16px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-6 md:mt-[40px]">
                NewMakeでは、企業とクリエイターが共に社会課題を解決する新たな価値創造の場を提供しています。初めてのコラボレーションでもご安心ください。私たちの専門チームが企画から実施までを全面的にサポートし、貴社のビジョンに最適なプランをご提案します。まずはお気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Success case section (sdgs only) */}
      {slug === 'sdgs' && (
        <>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px]">
              <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em]">
                成功事例の紹介
              </h2>
            </div>
          </section>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Card 1: Poster image */}
              <div className="bg-[#FAF9F5] border-b md:border-b-0 md:border-r border-[#2d2a24] p-8 md:p-14">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/sdgs-case-poster.webp"
                    alt="100 My Licca"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 33vw"
  
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Card 2: Background */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[40px] md:py-[60px] border-b md:border-b-0 md:border-r border-[#2d2a24]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  プロジェクト名
                </p>
                <h3 className="font-sans font-bold text-[20px] md:text-[24px] text-[#2d2a24] leading-[1.6] tracking-[0.04em] mt-4">
                  100 My Licca
                </h3>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  ご自宅に眠っているお洋服でリカちゃんのお洋服づくりを体験
                </p>
                <a
                  href="https://www.andstory.co/communities/7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                >
                  サービスサイトへ →
                </a>
                <div className="mt-6">
                  <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                    プロジェクトの背景
                  </p>
                  <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                    着なくなった服でも想い出がこもっていて捨てられない。そんな服をリカちゃんのお洋服として仕立て直すことで、ずっと大切に置いておける存在とするプロジェクト
                  </p>
                </div>
              </div>
              {/* Card 3: Challenge */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[40px] md:py-[60px]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  課題
                </p>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  新しい商品を作って売るというPRだけでなく、これまで培ってきた歴史やブランドを活かして双方向型のプロモーションを展開したい
                </p>
              </div>
            </div>
          </section>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Result */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[60px] border-b md:border-b-0 md:border-r border-[#2d2a24]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  実施結果
                </p>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  100名の枠は即日完売し、東京開催でありながらも地方からも参加いただく熱量の高いプロジェクトに。また2回の展覧会では合計5500名の方々にご来場いただきました。
                </p>
                <a
                  href="/cases/imz-wknv49"
                  className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                >
                  事例詳細を見る →
                </a>
              </div>
              {/* Right: Result image */}
              <div className="p-8 md:p-14">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/sdgs-case-result.webp"
                    alt="100 My Licca 実施結果"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
  
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Success case section (event only) */}
      {slug === 'event' && (
        <>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px]">
              <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em]">
                成功事例の紹介
              </h2>
            </div>
          </section>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Card 1: Poster image */}
              <div className="bg-[#FAF9F5] border-b md:border-b-0 md:border-r border-[#2d2a24] p-8 md:p-14">
                <div className="relative aspect-square">
                  <Image
                    src="/event-case-poster.webp"
                    alt="しぶやさくらまつり 2024"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 33vw"
  
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Card 2: Project + Background */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[40px] md:py-[60px] border-b md:border-b-0 md:border-r border-[#2d2a24]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  プロジェクト名
                </p>
                <h3 className="font-sans font-bold text-[20px] md:text-[24px] text-[#2d2a24] leading-[1.6] tracking-[0.04em] mt-4">
                  しぶやさくらまつり 2024
                </h3>
                <a
                  href="https://www.sakura.andstory.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                >
                  サービスサイトへ →
                </a>
                <div className="mt-6">
                  <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                    プロジェクトの背景
                  </p>
                  <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                    Shibuya Sakura Stageの「多様性が活きる」という思想に基づき、地域・テナント・クリエイター・メディアを巻き込み、施設全体を使った新しい祭りを実施。イベントスペースや広場、デジタルサイネージなどを活用し、「しぶや」へ集う人々の多様な「好き」で彩りを演出いたしました。
                  </p>
                </div>
              </div>
              {/* Card 3: Challenge */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[40px] md:py-[60px]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  課題
                </p>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  歩行者ネットワークが整備され、回遊性とアクセスが向上した渋谷区桜丘エリア。変化するからこそ、渋谷での巡り合いを楽しんでもらいたいという想いからプロジェクトが始まりました。地元の方々が大切にしてきた華やかな桜のもと、桜丘エリアならではの多様な「好き」が集まるカルチャーを守りつつも次世代に継承する企画をお届けするべく、弊社のリソースを活かしたコンテンツ制作を実施する運びとなりました。
                </p>
              </div>
            </div>
          </section>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Result */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[60px] border-b md:border-b-0 md:border-r border-[#2d2a24]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  実施結果
                </p>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  コンテンツの1つ「なんかちょっと、の招待状（インスタレーション・アート）」では、招待状の設置から2-3日で在庫切れとなり、計8640枚が配布されました。また、訪れる人々に「めぐり歩いて楽しい」体験を提供し、従来の物販中心の購買型から、体験型・滞在型の新しい施設を生み出すことに寄与。ファンのコミュニティを形成することで、街全体の持続的なにぎわいを創出いたしました。
                </p>
                <a
                  href="https://www.tokyu-land.co.jp/news/2024/001172.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                >
                  事例詳細を見る →
                </a>
              </div>
              {/* Right: Result image */}
              <div className="p-8 md:p-14">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/event-case-result.webp"
                    alt="しぶやさくらまつり 2024 実施結果"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
  
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Success case section (community only) */}
      {slug === 'community' && (
        <>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[80px]">
              <h2 className="font-sans font-bold text-[20px] md:text-[28px] text-[#2d2a24] leading-[2] tracking-[0.04em]">
                成功事例の紹介
              </h2>
            </div>
          </section>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Card 1: Poster image */}
              <div className="bg-[#FAF9F5] border-b md:border-b-0 md:border-r border-[#2d2a24] p-8 md:p-14">
                <div className="relative aspect-[3/2]">
                  <Image
                    src="/community-case-poster.webp"
                    alt="クラフコ"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 33vw"
  
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Card 2: Project + Background */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[40px] md:py-[60px] border-b md:border-b-0 md:border-r border-[#2d2a24]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  プロジェクト名
                </p>
                <h3 className="font-sans font-bold text-[20px] md:text-[24px] text-[#2d2a24] leading-[1.6] tracking-[0.04em] mt-4">
                  クラフコ
                </h3>
                <a
                  href="https://www.crafco.andstory.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                >
                  サービスサイトへ →
                </a>
                <div className="mt-6">
                  <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                    プロジェクトの背景
                  </p>
                  <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                    Craft×Communityを由来とし、コスプレ服を作りたい、服をオシャレにメイクしたい、子ども服を作りたいなど、様々なものづくりのニーズを抱えた人たちが、交流しながらものづくりに挑戦できる場所を無料で提供。新たにものづくりに挑戦する人を支援することで、さらなるものづくり市場の拡大に貢献するプロジェクトです。
                  </p>
                </div>
              </div>
              {/* Card 3: Challenge */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[40px] md:py-[60px]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  課題
                </p>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  現代社会において、地域コミュニティの衰退や情報格差が広がる中、消費者が「繋がり」を感じることがますます難しくなっています。クラフコは新たな町おこし・地域活性化を目指し、物作りを楽しむ人たちが互いに繋がり合える場所を提供することで、コミュニティを創生し、地方社会の活性化や課題解決に貢献することを目指しています。
                </p>
              </div>
            </div>
          </section>
          <section className="w-full border-b border-[#2d2a24]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Result */}
              <div className="px-[20px] py-[40px] sm:px-6 md:px-[80px] md:py-[60px] border-b md:border-b-0 md:border-r border-[#2d2a24]">
                <p className="font-sans text-[12px] md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2]">
                  実施結果
                </p>
                <p className="font-sans text-[12px] md:text-[14px] font-medium text-[#333] leading-[2] tracking-[0.08em] mt-4">
                  プロジェクト開始から1年で会員数150名を突破。「幼稚園のバザー制作など、気軽に集まって一緒に教え合いながら作れてありがたい」「家で1人でYouTubeを見ながら作っていたけど、みんなと作れて楽しい」など、コミュニティの繋がりを感じる温かなお声をいただいております。2024年4月からは全国6店舗への拡大を実施し、今後もさらに増加予定です。
                </p>
                <a
                  href="https://www.crafco.andstory.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-sans text-[12px] md:text-[14px] text-[#18bed7] font-medium leading-[2] tracking-[0.08em] hover:underline"
                >
                  サービスサイトへ →
                </a>
              </div>
              {/* Right: Result image */}
              <div className="p-8 md:p-14">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/community-case-result.webp"
                    alt="クラフコ 実施結果"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
  
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

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
