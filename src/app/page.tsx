import HeroSection from '@/components/HeroSection'
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
  category?: string
  summary?: string
  thumbnail?: {
    url: string
  }
}

async function getLatestCases(): Promise<CaseItem[]> {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'cases',
      queries: { limit: 6, orders: '-publishedAt' },
    })
    return data.contents
  } catch {
    return [
      {
        'id':1,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_6eed2116-f66e-4a04-9882-5ebbe5b808dc_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人..."
      },
      {
        'id':2,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_376b678b-25c5-409a-a934-654ed44179b4_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人..."
      },
      {
        'id':3,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1108x827_v-fs_webp_6d4de88d-87f1-47b5-8129-aa9354e15a3f_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人..."
      }
    ]
  }
}

export default async function HomePage() {
  const cases = await getLatestCases()
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ClientsSection />
      <ServicesMarqueeSection />
      <ServicesSection />
      <CreateYourOwnStorySection />
      <section className="w-full overflow-hidden">
        <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap pt-[44px] pb-[36px]">
          {['Cases', 'Cases', 'Cases', 'Cases', 'Cases', 'Cases'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
        <h2 className="border-y border-[#2d2d2d] px-[40px] pt-[17px] pb-[19px] font-sans font-medium text-[16px] leading-[2] tracking-[0.04em] text-[#333]">事例のご紹介</h2>
      </section>
      <SlideCardsSectionClient slideCards={cases} linkHref="/cases" linkText="事例をもっとみる" />
      <NewsSection />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}