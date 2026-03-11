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
    const data = await client.get({ endpoint: 'cases', contentId: id })
    return { title: data.title, description: data.summary }
  } catch {
    return { title: '事例詳細' }
  }
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


export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cases = await getLatestCases()
  const { id } = await params
  let caseData: any = null
  try {
    caseData = await client.get({ endpoint: 'cases', contentId: id })
  } catch {
    ///return <div className="pt-[60px] p-24 text-center text-[#999]">事例が見つかりませんでした</div>
    caseData = {
      'id':1,
      'title': "リカちゃんのアップサイクルアトリエ導入事例｜中山学童保育なかよしの家（横浜）",
      "serviceCategory":"NewMake",
      "body":"body test",
      "client":"株式会社タカラトミ",
      "serviceSlug":"STORY&Co. / NewMake チーム",
      'thumbnail':{
        'url':"https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_6eed2116-f66e-4a04-9882-5ebbe5b808dc_small.webp"
      },
      'category': "SDGs推進支援",
      'summary': "「リカちゃんのアップサイクルアトリエ」は、企業よりご提供いただいた廃棄予定のレースやリボン、生地などを活用し、着せ替え人形「リカちゃん」（発売元：株式会社タカラトミー）用の衣装を制作する体験型ワークショップです。NewMakeが年齢に応じて設計したキットを用い、未就学児から大人まで幅広い層が参加できるプログラムとして、授業やSDGs研修、親子・地域イベントなど、さまざまな場面でご活用いただいています。",
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
              {caseData.thumbnail && (
                <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8">
                  <img src={caseData.thumbnail.url} alt={caseData.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-8 sm:mt-12 md:mt-[80px]">{caseData.summary}</p>

              {/* Rich text content - HTML rendered correctly */}
              {caseData.body && (
                <div
                  className="font-sans text-sm sm:text-base md:text-[16px] text-[#333]"
                  dangerouslySetInnerHTML={{ __html: caseData.body }}
                />
              )}
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">今回は、神奈川県横浜市緑区の学童保育施設「中山学童保育なかよしの家」にて、2026年1月に常設型プログラムとして導入・実施しました。</p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">プロジェクト名：リカちゃんのアップサイクルアトリエ</p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">実施場所：中山学童保育なかよしの家（神奈川県横浜市緑区寺山町115-1 遠藤ビル103） </p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">実施期間：2026年1月31日（土）〜（常設型として継続実施予定）</p>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">「リカちゃんのアップサイクルアトリエ」がご提供：</p>
              <ul className="list-disc mt-6 sm:mt-8 md:mt-[40px] pl-4 sm:pl-5 md:pl-6">
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">ワークショップが簡単におこなえるキットのご提供</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">運営マニュアル、告知ツールのご提供</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">実施に向けた準備・運用サポート</li>
              </ul>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">※株式会社タカラトミー様監修</p>
              <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-[40px]">
                <img src="https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_06473635-a4e6-449c-a217-8dad053b860e_middle.webp" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■ 背景と課題 ── 学童保育の「体験の場」をどう広げるか</h2>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>中山学童保育なかよしの家様では、土曜日を中心にさまざまなイベントを実施し、子どもたちの居場所づくりに取り組んでこられました。その中で、以下のような課題が共有されていました。</p>
              <ul className="list-disc mt-6 sm:mt-8 md:mt-[40px] pl-4 sm:pl-5 md:pl-6">
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">通常の保育時間以外にも、先生と子どもがじっくりコミュニケーションを取れる機会を設けたい</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">子どもたちが自分の手を動かし、細かな作業に取り組めるアクティビティを増やしていきたい</li>
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left pt-3 sm:pt-4 md:pt-[16px]">一般的な工作材料だけでなく、さまざまな素材を使ったものづくりの体験を通して、子どもたちのイメージの世界を大きく広げてほしい</li>
              </ul>
              <p className="font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]">本事例は、過去に「100MyLicca」プロジェクトに参加いただいたクリエイターさんからの紹介をきっかけに実現しました。コミュニティから地域の児童施設へとプログラムが広がった、初めての事例です。</p>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■ 設計のポイント ──「かわいい」「やってみたい」が入口</h2>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>「本プログラムでは、サステナブルという言葉を前面に出さず、「かわいい」「楽しそう」「やってみたい」という直感的な感情を入口にして設計しています。</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>廃棄予定の生地やリボンを使った専用キットで衣装を制作する過程で、子どもたちは素材の手触りを感じ、色を選び、手を動かすことに没頭していきます。「リカちゃん」というときめきに満ちた世界観も相まって、アップサイクルの意義は言葉で教えるのではなく、夢中になる体験そのものを通じて伝わっていく──そんなプログラム設計を行いました。</p>
              <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-[40px]">
                <img src="https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_295b76da-c1ea-4ac7-85c7-b5bd11cfb5db_middle.webp" className="w-full h-full object-cover" />
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
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>▶︎ 
                <Link href="https://n-nakayoshi.com/" className='font-medium leading-[2] tracking-[0.08em] text-[#18bed7]'><u>中山学童保育なかよしの家</u></Link>
              </p>
              <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E5DFD4] mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-[40px]">
                <img src="https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-1920x1080_v-frms_webp_b570f41c-00d1-4c49-91dc-b35cad170232_middle.webp" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]">■「リカちゃんのアップサイクルアトリエ」に関するお問い合わせ</h2>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>ご導入をご検討中の方、まずは話を聞いてみたい方は、下記フォームよりお気軽にお問い合わせください。</p>
              <p className='font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'>▶︎ 
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfcrKQ7hru6xk745iyzTd5XhwlK1G1cKcYKoQWH1OVlShrJAw/viewform" className='font-medium leading-[2] tracking-[0.08em] text-[#18bed7]'><u>導入問い合わせフォーム</u></Link>
              </p>

            </div>

            {/* Sidebar */}
            <div className="w-full md:col-span-1 md:sticky md:top-[96px] self-start">
              <div className="w-full p-4 sm:p-6 md:p-[80px] border-b border-[#2d2d2d]">
                <Link href="/cases" className='font-sans text-xs sm:text-sm md:text-[14px] text-[#333] font-bold tracking-[0.08em] leading-[2] hover:text-[#18bed7]'>{caseData.category}</Link>
                <h2 className="font-sans font-bold text-lg md:text-[28px] text-[#2d2d2d] leading-[2] tracking-[0.04em] mt-3 sm:mt-4 md:mt-[20px] mb-4 sm:mb-6 md:mb-[40px]">{caseData.title}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <p className="font-sans text-xs sm:text-sm md:text-[14px] text-[#2d2d2d] font-medium leading-[1]">
                    {new Date(caseData.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </p>
                  <span className="hidden sm:inline">|</span>
                  <Link href="/category/newmake" className='border border-[#2d2a24] px-2 md:px-[12px] py-1 md:py-[6px] rounded-lg font-poppins font-medium text-[10px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'>{caseData.serviceCategory || 'AND STORY'}</Link>
                </div>
              </div>
              <div className="w-full py-6 sm:py-8 md:py-[40px] px-4 sm:px-6 md:px-[80px]">
                <p className="font-sans text-xs sm:text-sm md:text-[12px] text-[#333] font-bold leading-[2] tracking-[0.08em]">{caseData.client || '—'}</p>
                <p className="font-sans text-xs sm:text-sm md:text-[12px] text-[#2d2d2d] font-medium leading-[2] tracking-[0.08em]">{caseData.serviceSlug || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <h2 className="border-b border-[#2d2d2d] px-[80px] pt-[38px] pb-[42px] font-sans font-bold text-[24px] leading-[2] tracking-[0.04em] text-[#2d2d2d] text-center">関連記事</h2>
      </section>
      <SlideCardsSectionClient slideCards={cases} linkHref="/cases" linkText="すべての事例を見る" />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
