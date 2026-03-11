import { client } from '@/lib/microcms'
import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import TabsSection from '@/components/TabsSection'


export const metadata: Metadata = {
  title: '事例のご紹介',
  description: 'STORY&Co.の事例紹介。コミュニティ開発・地域イベントプロデュース・SDGs推進支援などの実績をご紹介します。',
}

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
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学童保育なか...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_6eed2116-f66e-4a04-9882-5ebbe5b808dc_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人形「リカちゃん」（発売元：株式会社タカラトミー）用の衣装を制作する体験型ワークショップです。NewMakeが年齢に応じて設計したキットを用い、未就学児から大人まで幅広い層が参加できるプログラムとして、授業やSDGs研修、親子・地域イベントなど、さまざまな場面でご活用いただいています。"
      },
      {
        'id':2,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜遊びの創造ランド...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_376b678b-25c5-409a-a934-654ed44179b4_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人形「リカちゃん」（発売元：株式会社タカラトミー）用の衣装を制作する体験型ワークショップです。NewMakeが年齢に応じて設計したキットを用い、未就学児から大人まで幅広い層が参加できるプログラムとして、授業やSDGs研修、親子・地域イベントなど、さまざまな場面でご活用いただいています。"
      },
      {
        'id':3,
        'title': "【大阪・関西万博2025】経済産業省主催「サーキュラーエコノ...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1108x827_v-fs_webp_6d4de88d-87f1-47b5-8129-aa9354e15a3f_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "「循環型クリエイティブコミュニティ「NewMake」（株式会社STORY&Co.）は、2025年9月23日〜29日に大阪・関西万博会場 EXPOメッセ「WASSE」で開催された、経済産業省主催プログラム「サーキュラーエコノミー研究所」において、展示・ワークショップ・ファッションショーなど一連のコンテンツプロデュースを担当しました。"
      },
      {
        'id':4,
        'title': "BAYCREW’S STORE FUKUOKA 3rd An...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1334x889_v-fms_webp_70d94131-6cc0-4dbf-85ac-af2e6d1a9e25_small.webp"
        },
        'category': "地域・イベントプロデュース",
        'summary': "BAYCREW’S STORE FUKUOKAの3周年を記念し「地域・クリエイティブ・サステナブル」をテーマにしたアップサイクルイベントを企画しました。"
      },
      {
        'id':5,
        'title': "リカちゃんのアップサイクルアトリエ」について",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1334x889_v-fms_webp_9bfd5edd-0e0d-452f-bd6f-cc9d68f9e42c_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "東京おもちゃショー 2024 のタカラトミーブースで開催された「リカちゃんのアップサイクルアトリエ」のワークショップ体験についての事例紹介"
      },
      {
        'id':6,
        'title': "渋谷ワーカーのウェルビーイングを考えるコミュニティ型ワーカー...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1024x490_v-fs_webp_cefdcde8-d052-43d9-b67e-d42eada797c4_small.webp"
        },
        'category': "地域・イベントプロデュース",
        'summary': "「タワーのアワー」は渋谷のオフィスワーカー向けの新しいコミュニティ型ワーカーズラウンジで、ウェルビーイングに関連するイベントや最先端の健康機材を無料で利用できます。"
      },
      {
        'id':7,
        'title': "BAYCREW’S STORE FUKUOKA 3rd An...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-639x506_v-fs_webp_e1464ae0-8d22-4b75-974f-07dd6d42115d_small.webp"
        },
        'category': "地域・イベントプロデュース",
        'summary': "BAYCREW’S STORE FUKUOKAの3周年を記念し「地域・クリエイティブ・サステナブル」をテーマにしたアップサイクルイベントを企画しました。"
      },
      {
        'id':8,
        'title': "リカちゃんのアップサイクルアトリエ」について",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-2400x2400_v-frms_webp_5ab22f80-82cf-4a29-b4a4-49bef285d062_small.webp"
        },
        'category': "SDGs推進支援",
        'summary': "東京おもちゃショー 2024 のタカラトミーブースで開催された「リカちゃんのアップサイクルアトリエ」のワークショップ体験についての事例紹介"
      },
      {
        'id':9,
        'title': "渋谷ワーカーのウェルビーイングを考えるコミュニティ型ワーカー...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-2250x2250_v-frms_webp_76253fc7-897a-4aa1-b04d-8302471175bf_small.webp"
        },
        'category': "地域・イベントプロデュース",
        'summary': "「タワーのアワー」は渋谷のオフィスワーカー向けの新しいコミュニティ型ワーカーズラウンジで、ウェルビーイングに関連するイベントや最先端の健康機材を無料で利用できます。"
      },
      {
        'id':10,
        'title': "リカちゃんのアップサイクルアトリエ」について",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1024x654_v-fs_webp_3cbc7b60-8bb1-430a-a025-7a745d07eab9_small.webp"
        },
        'category': "コミュニティ開発",
        'summary': "東京おもちゃショー 2024 のタカラトミーブースで開催された「リカちゃんのアップサイクルアトリエ」のワークショップ体験についての事例紹介"
      },
      {
        'id':11,
        'title': "渋谷ワーカーのウェルビーイングを考えるコミュニティ型ワーカー...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1024x1024_v-fs_webp_6d51aba7-f612-4a15-a529-7f107be50e06_small.webp"
        },
        'category': "コミュニティ開発",
        'summary': "「タワーのアワー」は渋谷のオフィスワーカー向けの新しいコミュニティ型ワーカーズラウンジで、ウェルビーイングに関連するイベントや最先端の健康機材を無料で利用できます。"
      }
    ]
  }
}

const tabs = [
  { id: 'all', label: 'すべて', category: null },
  { id: 'community', label: 'コミュニティ開発', category: 'コミュニティ開発' },
  { id: 'regional', label: '地域・イベントプロデュース', category: '地域・イベントプロデュース' },
  { id: 'sdgs', label: 'SDGs推進支援', category: 'SDGs推進支援' },
]

export default async function CasesPage() {
  const cases = await getLatestCases()

  return (
    <>
      <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[296px] pb-12 sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-4 sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">C</span>
          <span id="mv-colorful2" className="tracking-[-0.03em]">a</span>
          <span id="mv-colorful3" className="tracking-[-0.04em]">s</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">e</span>
          <span id="mv-colorful5" className="tracking-[-0.06em]">s</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">事例のご紹介</p>
      </div>
      <TabsSection items={cases} tabs={tabs} itemLink={"/cases"} />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
