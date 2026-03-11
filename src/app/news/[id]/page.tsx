import { client } from '@/lib/microcms'
import Link from 'next/link'
import type { Metadata } from 'next'
import SlideCardsSectionClient from '@/components/SlideCardsSectionClient'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params
    const data = await client.get({ endpoint: 'news', contentId: id })
    return { title: data.title }
  } catch {
    return { title: 'お知らせ' }
  }
}

interface NewsItem {
  id: number
  publishedAt: string
  category?: string
  title: string
}

async function getLatestNews() {
  try {
    const { client } = await import('@/lib/microcms')
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 5, orders: '-publishedAt' },
    })
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

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = await getLatestNews()
  let newsData: any = null
  try {
    newsData = await client.get({ endpoint: 'news', contentId: id })
  } catch {
    //return <div className="pt-[60px] p-24 text-center text-[#999]">記事が見つかりませんでした</div>
    newsData = {
      'id':1,
      'title': "東京都主催「捨てない!甦る!江戸東京 衣の循環の知恵」に NewMakeが出展 ",
      "serviceCategory":"NewMake",
      "body":"body test",
      "client":"展示・ワークショップを通して学ぶ衣の循環|1月24・25日 玉川髙島屋S.C.で開催",
      "serviceSlug":"NewMake",
      'thumbnail':{
        'url':"https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_c16d5381-bc3b-47c6-b86f-0cf3ece81232_middle.webp"
      },
      'category': "プレスリリース",
      'summary': "循環型クリエイティブコミュニティ「NewMake」(運営:株式会社STORY&Co.)は、2026年1月24日(土)・25日(日)に玉川髙島屋S.C.で開催されるイベント「捨てない!甦る!江戸東京 衣の循環の知恵~みんなではじめよう!服のセカンドライフ」(主催:東京都環境局)に展示およびワークショップの企画を担当し、出展いたします。",
      "publishedAt":"2026-03-10",
    }
  }
  
  return (
    <>
      <section className="w-full mt-[96px] sm:mt-[80px] md:mt-[96px]">
        <div className="w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 border-b border-[#2d2d2d] items-start">
            {/* Main content */}
            <div className="w-full md:col-span-2 md:border-r border-b md:border-b-0 border-[#2d2d2d] px-4 sm:px-6 md:px-[80px] pt-8 sm:pt-12 md:pt-[80px] pb-12 sm:pb-16 md:pb-[260px] font-sans text-[#333] text-sm sm:text-base md:text-[16px] leading-[1.4]">
              {/* Hero image */}
              {newsData.thumbnail && (
                <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8">
                  <img src={newsData.thumbnail.url} alt={newsData.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-8 sm:mt-12 md:mt-[80px]">展示・ワークショップを通して学ぶ衣の循環|1月24・25日 玉川髙島屋S.C.で開催</p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-8 sm:mt-12 md:mt-[80px]">{newsData.summary}</p>

              {/* Rich text content - HTML rendered correctly */}
              {newsData.body && (
                <div
                  className="font-sans text-sm sm:text-base md:text-[16px] text-[#333]"
                  dangerouslySetInnerHTML={{ __html: newsData.body }}
                />
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">本イベントは、江戸東京の「もったいない」精神を現代につなぎ、衣類のリユース・リペア・アップサイクルを通じて、循環型社会への理解を深めることを目的とした体験型イベントです。トラウデン直美さんによるトークショーをはじめ、親子で楽しめるワークショップや展示など、多彩なコンテンツが展開されます。</p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">東京都では、脱炭素化とサーキュラーエコノミーへの移行を重要な柱と位置付け、素材や製品の特性を踏まえたライフサイクル全体で、資源循環を推進しています。</p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">環境省の推計によると、国内で新たに供給される衣料は年間約82万トン。そのうち約7割にあたる56万トン(うち家庭由来は約51万トン)が手放され、焼却等で処理されています。こうした衣類廃棄を減らし、新たな価値を与えて、甦らせることは、循環型社会の実現において重要な取り組みです。</p>
            
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■ STORY&Co./NewMakeによる企画参加について</h2>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">本イベントの一部企画として、NewMakeは、衣類アップサイクルを「体験」と「表現」の両面から伝える、以下の企画・クリエイティブ制作を担当しています。</p>

              <ul className="list-disc mt-6 sm:mt-8 md:mt-[40px] pl-4 sm:pl-5 md:pl-6">
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">「リカちゃんのアップサイクルアトリエ」ワークショップの企画・運営</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-8 sm:pt-4 md:pt-[16px]">NewMakeクリエイターによるアップサイクル作品展示</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-8 sm:pt-4 md:pt-[16px]">キービジュアルおよびワッペンの制作(PATCH&PLAY)</li>
              </ul>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■「リカちゃんのアップサイクルアトリエ」ワークショップ(事前予約制)</h2>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">「NewMake」と、着せ替え人形「リカちゃん」(発売元:株式会社タカラトミー)による体験型ワークショップです。企業が廃棄予定だったレースやリボン、生地などを活用し、リカちゃん用の洋服等をつくることを通して、子どもから大人まで幅広い世代が遊びながら「つくる楽しさ」と「ものを大切にする気持ち」に触れられます。</p>
              <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-[40px]">
                <img src="https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_c6fe6e5d-3e35-452e-ae22-027e5d5c1f38_middle.webp" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■ NewMakeアップサイクル作品展示</h2>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>NewMakeクリエイターによるアップサイクル作品を展示します。</p>
              
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">役目を終えた素材をもとに、クリエイターそれぞれの視点で制作された作品展示です。</p>
              
              <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-[40px]">
                <img src="https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_6e51172f-2381-4104-97ce-5803cf7f6547_middle.webp" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■ 結果・反響</h2>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>ワークショップ後、参加者にはさまざまな変化が見られました。</p>
              <ul className="list-disc mt-6 sm:mt-8 md:mt-[40px] pl-4 sm:pl-5 md:pl-6">
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">チラシの反響は普段のイベントよりも高く、小学6年生の男の子からも参加希望があった</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">全体満足度は参加者全員が最高評価（5段階中5）を記録</li>

                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">「家でも作ってみたい」という声が多数。体験後の行動変容につながる手応え</li>
                  
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">「リサイクル→アップサイクルの流れになっていることを知られてよかった」など、ものの活かし方に目を向ける声が生まれた</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">「意外と難しくて楽しかった」「集中して作れた」など、ものづくりを通じた手先の鍛錬や達成感を実感する声が大人からも寄せられた</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">「玄関に飾ります！」──完成品を持ち帰り、家庭でも楽しむ姿が見られた</li>
              </ul>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>対象： 小学生を中心とした子どもと保護者</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>形式： 少人数制ワークショップ（参加人数16名：大人2名、小学生12名、未就学児2名）</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>体験が一過性で終わらず、家庭での会話や気づきへとつながっている点が大きな特徴です。</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>中山学童保育なかよしの家様では、常設型プログラムとして、今後も継続的に開催されていく予定です。</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'> 
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfcrKQ7hru6xk745iyzTd5XhwlK1G1cKcYKoQWH1OVlShrJAw/viewform" className='font-medium leading-[2] tracking-[0.08em] text-[#18bed7]'><u>お問い合わせフォーム</u></Link>
              </p>
              <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-[40px]">
                <img src="https://storage.googleapis.com/studio-cms-assets/projects/V5a7NkzVqR/s-1080x1080_v-fs_webp_20f6ecb0-ff81-46bf-9beb-470dcfe9a660.webp" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■「リカちゃんのアップサイクルアトリエ」に関するお問い合わせ</h2>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>ご導入をご検討中の方、まずは話を聞いてみたい方は、下記フォームよりお気軽にお問い合わせください。</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'> 
                <Link href="https://prtimes.jp/main/html/searchrlp/company_id/28449" className='font-medium leading-[2] tracking-[0.08em] text-[#18bed7]'>https://prtimes.jp/main/html/searchrlp/company_id/28449</Link>
              </p>

            </div>

            {/* Sidebar */}
            <div className="w-full md:col-span-1 md:sticky md:top-[96px] self-start">
              <div className="w-full p-4 sm:p-6 md:p-[80px]">
                <Link href="/news" className='font-sans text-xs sm:text-sm md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2] hover:text-[#18bed7]'>{newsData.category}</Link>
                <h2 className="font-sans font-bold text-lg md:text-[28px] text-[#2d2d2d] leading-[2] tracking-[0.04em] mt-3 sm:mt-4 md:mt-[20px] mb-4 sm:mb-6 md:mb-[40px]">{newsData.title}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <p className="font-sans text-xs sm:text-sm md:text-[14px] text-[#2d2d2d] font-medium leading-[1]">
                    {new Date(newsData.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </p>
                  <span className="hidden sm:inline">|</span>
                  <Link href="/category/newmake" className='border border-[#2d2a24] px-2 md:px-[12px] py-1 md:py-[6px] rounded-lg font-poppins font-medium text-[10px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'>{newsData.serviceCategory || 'AND STORY'}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <h2 className="border-b border-[#2d2d2d] px-[80px] pt-[38px] pb-[42px] font-sans font-bold text-[24px] leading-[2] tracking-[0.04em] text-[#2d2d2d] text-center">関連記事</h2>
      </section>
      <SlideCardsSectionClient slideCards={news} linkHref="/news" linkText="すべての事例を見る" />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
