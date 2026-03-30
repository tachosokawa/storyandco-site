import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
}
import AboutSection from '@/components/AboutSection'
import ClientsSection from '@/components/ClientsSection'
import ServicesMarqueeSection from '@/components/ServicesMarqueeSection'
import ServicesSection from '@/components/ServicesSection'
import CreateYourOwnStorySection from '@/components/CreateYourOwnStorySection'
import SlideCardsSectionClient from '@/components/SlideCardsSectionClient'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
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

type NewsItem = {
  id: string
  publishedAt: string
  publishDate: string
  title: string
}

async function getLatestCases(): Promise<CaseItem[]> {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'cases',
      queries: { limit: 6, orders: '-publishDate' },
      customRequestInit: {
        cache: 'no-store'
      }
    })
    return data.contents
  } catch {
    return []
  }
}

async function getHeroNews(): Promise<NewsItem[]> {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.getList({
      endpoint: 'news',
      queries: { limit: 3, orders: '-publishDate' },
      customRequestInit: { next: { revalidate: 60 } }
    })
    return data.contents
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [cases, heroNews] = await Promise.all([getLatestCases(), getHeroNews()])
  return (
    <>
      <HeroSection initialNews={heroNews} />
      <AboutSection />
      <ClientsSection />
      <ServicesMarqueeSection />
      <ServicesSection />
      <CreateYourOwnStorySection />
      <section className="w-full overflow-hidden">
        <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap py-[31px] md:pt-[44px] md:pb-[36px]">
          {['Cases', 'Cases', 'Cases', 'Cases', 'Cases', 'Cases'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-[48px] md:text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
        <h2 className="border-y border-[#2d2a24] px-[20px] md:px-[40px] pt-[12px] md:pt-[17px] pb-[16px] md:pb-[19px] font-sans font-medium text-[12px] md:text-[16px] leading-[2] tracking-[0.04em] text-[#333]">事例のご紹介</h2>
      </section>
      <SlideCardsSectionClient slideCards={cases} linkHref="cases" linkText="事例をもっとみる" />
      <NewsSection />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}