import Link from 'next/link'
import { client } from '@/lib/microcms'
import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'
import TabsSection from '@/components/TabsSection'


export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'STORY&Co.のお知らせ・プレスリリース・イベント情報。',
}

const tabs = [
  { id: 'all', label: 'すべて', category: null },
  { id: 'informations', label: 'インフォメーション', category: 'インフォメーション' },
  { id: 'reports', label: 'プレスリリース', category: 'プレスリリース' },
  { id: 'medias', label: 'メディア掲載', category: 'メディア掲載' },
  { id: 'events', label: 'イベント', category: 'イベント' },
]

async function getNews() {
  try {
    const data = await client.get({ endpoint: 'news', queries: { limit: 50, orders: '-publishedAt' } })
    return data.contents
  } catch {
    return [
      {
        'id':1,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学童保育なか...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_c16d5381-bc3b-47c6-b86f-0cf3ece81232_small.webp"
        },
        'category': "プレスリリース",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人形「リカちゃん」（発売元：株式会社タカラトミー）用の衣装を制作する体験型ワークショップです。NewMakeが年齢に応じて設計したキットを用い、未就学児から大人まで幅広い層が参加できるプログラムとして、授業やSDGs研修、親子・地域イベントなど、さまざまな場面でご活用いただいています。"
      },
      {
        'id':2,
        'title': "リカちゃんのアップサイクルアトリエ導入事例｜遊びの創造ランド...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-2738x1038_v-frms_webp_54981f57-57f9-43f3-a5b1-f35e1caaba18_small.webp"
        },
        'category': "メディア掲載",
        'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人形「リカちゃん」（発売元：株式会社タカラトミー）用の衣装を制作する体験型ワークショップです。NewMakeが年齢に応じて設計したキットを用い、未就学児から大人まで幅広い層が参加できるプログラムとして、授業やSDGs研修、親子・地域イベントなど、さまざまな場面でご活用いただいています。"
      },
      {
        'id':3,
        'title': "【大阪・関西万博2025】経済産業省主催「サーキュラーエコノ...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-2048x1152_v-frms_webp_f1d9ac4a-c53f-49c6-80a5-7486d9aab5a4_small.webp"
        },
        'category': "メディア掲載",
        'summary': "「循環型クリエイティブコミュニティ「NewMake」（株式会社STORY&Co.）は、2025年9月23日〜29日に大阪・関西万博会場 EXPOメッセ「WASSE」で開催された、経済産業省主催プログラム「サーキュラーエコノミー研究所」において、展示・ワークショップ・ファッションショーなど一連のコンテンツプロデュースを担当しました。"
      },
      {
        'id':4,
        'title': "BAYCREW’S STORE FUKUOKA 3rd An...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-730x310_v-fs_webp_f9033d05-dcf7-4be4-b747-e94101ed4dcc_small.webp"
        },
        'category': "メディア掲載",
        'summary': "BAYCREW’S STORE FUKUOKAの3周年を記念し「地域・クリエイティブ・サステナブル」をテーマにしたアップサイクルイベントを企画しました。"
      },
      {
        'id':5,
        'title': "リカちゃんのアップサイクルアトリエ」について",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-2048x1089_v-frms_webp_607e40b4-1536-4ece-9133-47080d34f096_small.webp"
        },
        'category': "メディア掲載",
        'summary': "東京おもちゃショー 2024 のタカラトミーブースで開催された「リカちゃんのアップサイクルアトリエ」のワークショップ体験についての事例紹介"
      },
      {
        'id':6,
        'title': "渋谷ワーカーのウェルビーイングを考えるコミュニティ型ワーカー...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_f0954a4b-b837-417d-b47c-c664a14e013e_small.webp"
        },
        'category': "プレスリリース",
        'summary': "「タワーのアワー」は渋谷のオフィスワーカー向けの新しいコミュニティ型ワーカーズラウンジで、ウェルビーイングに関連するイベントや最先端の健康機材を無料で利用できます。"
      },
      {
        'id':7,
        'title': "BAYCREW’S STORE FUKUOKA 3rd An...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-3840x2160_v-frms_webp_fc7463b3-19b3-483a-a0fc-eb36dd431628_small.webp"
        },
        'category': "プレスリリース",
        'summary': "BAYCREW’S STORE FUKUOKAの3周年を記念し「地域・クリエイティブ・サステナブル」をテーマにしたアップサイクルイベントを企画しました。"
      },
      {
        'id':8,
        'title': "リカちゃんのアップサイクルアトリエ」について",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1140x1542_v-fms_webp_be8f6a2e-2d86-40d9-838d-bf7719ba461a_middle.webp"
        },
        'category': "インフォメーション",
        'summary': "東京おもちゃショー 2024 のタカラトミーブースで開催された「リカちゃんのアップサイクルアトリエ」のワークショップ体験についての事例紹介"
      },
      {
        'id':9,
        'title': "渋谷ワーカーのウェルビーイングを考えるコミュニティ型ワーカー...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-4024x4090_v-frms_webp_e9dd19c0-50d5-4ec1-ae08-e6fd868cf88d_small.webp"
        },
        'category': "インフォメーション",
        'summary': "「タワーのアワー」は渋谷のオフィスワーカー向けの新しいコミュニティ型ワーカーズラウンジで、ウェルビーイングに関連するイベントや最先端の健康機材を無料で利用できます。"
      },
      {
        'id':10,
        'title': "リカちゃんのアップサイクルアトリエ」について",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_d48c1939-140f-4b3c-993b-ebea320db3a4_small.webp"
        },
        'category': "イベント",
        'summary': "東京おもちゃショー 2024 のタカラトミーブースで開催された「リカちゃんのアップサイクルアトリエ」のワークショップ体験についての事例紹介"
      },
      {
        'id':11,
        'title': "渋谷ワーカーのウェルビーイングを考えるコミュニティ型ワーカー...",
        'thumbnail':{
          'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_adcbec02-67cf-4dc2-ad68-78ca97c35421_small.webp"
        },
        'category': "イベント",
        'summary': "「タワーのアワー」は渋谷のオフィスワーカー向けの新しいコミュニティ型ワーカーズラウンジで、ウェルビーイングに関連するイベントや最先端の健康機材を無料で利用できます。"
      }
    ]
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <>
      <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[296px] pb-12 sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-4 sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">N</span>
          <span id="mv-colorful3" className="tracking-[-0.03em]">e</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">w</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">s</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">お知らせ</p>
      </div>
      <TabsSection items={news} tabs={tabs} itemLink="/news"/>
      <ContactSection />
      <RecruitSection />
      <AndStorySection />

    </>
  )
}
