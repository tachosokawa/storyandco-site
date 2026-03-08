import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/microcms'
import ClientsSection from '@/components/ClientsSection'
import CasesSection from '@/components/CasesSection'
import AndStorySection from '../components/AndStorySection'
import CompanyLink from '@/components/CompanyLink'
import CommonLink from '@/components/CommonLink'
import CommonSquareLink from '@/components/CommonSquareLink'

async function getLatestCases() {
  try {
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

async function getLatestNews() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 5, orders: '-publishedAt' },
    })
    return data.contents
  } catch {
    return [
      {
        'id':1,
        'publishedAt': "2026-03-06",
        'category': "プレスリリース",
        'title': "ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。"
      },
      {
        'id':2,
        'publishedAt': "2026-03-06",
        'category': "プレスリリース",
        'title': "ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。"
      },
      {
        'id':3,
        'publishedAt': "2026-03-06",
        'category': "プレスリリース",
        'title': "ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。"
      },
      {
        'id':4,
        'publishedAt': "2026-03-06",
        'category': "プレスリリース",
        'title': "ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。ニュースです。ニュースのタイトルが入ります。"
      }
    ]
  }
}

const clientLogos = [
  { name: 'adidas', file: 'adidas.svg' },
  { name: 'ADORE', file: 'adore.svg' },
  { name: 'allbirds', file: 'allbirds.svg' },
  { name: 'asahikawa', file: 'asahikawa.svg' },
  { name: 'ASICS', file: 'asics.svg' },
  { name: 'Brother', file: 'brother.svg' },
  { name: 'Coleman', file: 'coleman.svg' },
  { name: 'DESCENTE', file: 'descant.svg' },
  { name: 'kakimori', file: 'kakimori.svg' },
  { name: 'KEEN', file: 'keen.svg' },
  { name: 'KITAGAS', file: 'kitagus.svg' },
  { name: 'le coq sportif', file: 'lecoq.svg' },
  { name: 'Marubeni', file: 'marubeni.svg' },
  { name: 'MARGARET HOWELL', file: 'mh.svg' },
  { name: 'minne', file: 'minne.svg' },
  { name: 'NATURAL BEAUTY BASIC', file: 'naturalbasics.svg' },
  { name: 'New Balance', file: 'newbalance.svg' },
  { name: 'OLD ENGLAND', file: 'oldengland.svg' },
  { name: 'Osaka Metro Group', file: 'osakametro.svg' },
  { name: 'SMBC 三井住友カード', file: 'smbc.svg' },
  { name: 'Teva', file: 'teva.svg' },
  { name: '東京メトロ', file: 'tokyometro.svg' },
  { name: '東急不動産', file: 'tokyu.svg' },
  { name: 'WHOLE EARTH', file: 'wholeearth.svg' },
  { name: 'SUPER SPORTS XEBIO', file: 'xebio.svg' },
  { name: 'YKK', file: 'ykk.svg' },
]

export default async function HomePage() {
  const [cases, news] = await Promise.all([getLatestCases(), getLatestNews()])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00B8CC] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#8B5CF6] blur-3xl" />
        </div>
        <div className="relative w-full pt-[224px] px-[40px]">
          <p className="font-sans text-[32px] font-bold text-[#333] mb-3 text-right tracking-[0.04em]">体験を通じて、新しい物語を生み出す。</p>
          <h1 className="font-poppins text-[188px] [-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-right">
            <span id="mv-colorful1">N</span>
            <span id="mv-colorful2">e</span>
            <span id="mv-colorful3">w </span>
            <span id="mv-colorful4">E</span>
            <span id="mv-colorful5">n</span>
            <span id="mv-colorful6">c</span>
            <span id="mv-colorful7">o</span>
            <span id="mv-colorful8">u</span>
            <span id="mv-colorful9">n</span>
            <span id="mv-colorful10">t</span>
            <span id="mv-colorful11">e</span>
            <span id="mv-colorful12">r</span>
            <span id="mv-colorful13">s</span>
            <span id="mv-colorful14">,</span>
            <br />
            <span id="mv-colorful15">N</span>
            <span id="mv-colorful16">e</span>
            <span id="mv-colorful17">w </span>
            <span id="mv-colorful18">S</span>
            <span id="mv-colorful19">t</span>
            <span id="mv-colorful20">o</span>
            <span id="mv-colorful21">r</span>
            <span id="mv-colorful22">i</span>
            <span id="mv-colorful23">e</span>
            <span id="mv-colorful24">s</span>
            <span id="mv-colorful25">.</span>
          </h1>
        </div>
        <div className="w-full flex items-center gap-2 text-sm text-[#2d2a24] mt-[165px] pb-[120px]">
          <div className="inline-flex items-center gap-2 text-[16px] font-medium pl-[40px] pt-12">
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v8m0 0l-3-3m3 3l3-3" />
            </svg>
            Scroll down to explore
          </div>
          <div className="inline-flex items-center border-l border-t border-b border-[#2d2a24] rounded-lg rounded-tr-none rounded-br-none h-[74px] w-[55%] ml-auto">
            <p className='px-[24px] font-bold text-[16px]'>2026.01.07</p>
            <div className='border-r border-[#2d2a24] h-full'></div>
            <div className="flex-1 overflow-hidden">
              <p id="mv-news-loop-area" className='font-bold text-[16px] whitespace-nowrap'>重要なお知らせなどの最新ニュースが一件入ります。重要なお知らせなどの最新ニュースが一件入ります。重要なお知らせなどの最新ニュースが一件入ります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full">
        <div className='border-t border-b border-[#2d2a24] grid grid-cols-9'>
          <div className='border-r border-[#2d2a24] col-span-4'>
            <div className='border-b border-[#2d2a24] p-[40px]'>
              <h2 className="text-[96px] font-semibold text-[#333] font-poppins leading-[1] tracking-[-0.04em] flex justify-start">About our business</h2>
            </div>
            <div className='border-b border-[#2d2a24] pt-[17px] pb-[19px] px-[40px]'>
              <p className="text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] flex justify-start font-sans">会社のこと</p>
            </div>
            <div className='border-b border-[#2d2a24] py-[80px] px-[40px] text-[#333]'>
              <p className="text-[24px] font-bold leading-relaxed mb-8">
                体験をデザインすることで人生に出会いと変化をもたらし、新しい物語を生み出す企業です。
              </p>
              <p className="text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] flex justify-start font-sans">
                情報が飽和し、結果的に近しい人たちの口コミやSNSでのリアルな情報が信じられるようになった時代。従来のマーケティング手法では集客や興味喚起が困難となり、また買ってもらって終わりではなく、そこから始まるファン化・コミュニティ化の道のりが見えない。そんな課題に対して、従来の「モノ(商品)」と「コト(体験)」に加え、STORY&Co.は「プラットフォーム事業」「コミュニティ事業」「ソリューション事業」の3分野から、企業と顧客の新しいストーリーが生まれる体験を提供。楽しそうじゃない「モノゴト」も、自分が体験すると「物語」になる。出会いと変化の物語をこれからも作り続けます。</p>
            </div>
            <CompanyLink />
          </div>
          <div className="flex items-center justify-center p-[40px] col-span-5">
            <img className="max-w-[78%]" src="/images/clients/about.webp" alt="About Us" height="auto"/>
          </div>

        </div>
      </section>

      {/* Our Clients - with real logos */}
      <ClientsSection />

      {/* Services marquee strip */}
      <section className="w-full border-b border-[#2d2a24] overflow-hidden pt-[44px] pb-[36px]">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {['Our Services', 'Our Services', 'Our Services', 'Our Services', 'Our Services', 'Our Services'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="w-full">
        <div className='grid grid-cols-5'>
          <div className='col-span-5 border-b border-[#2d2a24] pt-[17px] pb-[19px] px-[40px]'>
            <p className="text-[16px] font-sans font-medium text-[#2d2a24] leading-[2]">事業のこと</p>
          </div>
          <div className='col-span-2 border-b border-r border-[#2d2a24] p-[40px]'>
            <p className='font-poppins text-[14px] font-medium text-[#333] leading-[1]'>( 01 )</p>
            <div className='pl-[120px] pt-[80px] pb-[80px] pr-[80px] font-sans leading-[2]'>
              <h3 className='pb-4 font-bold text-[32px] tracking-[0.04em]'>プラットフォーム事業</h3>
              <p className='pt-0 font-medium text-[16px] text-[#333]'>STORY &Co.で運営</p>
              <p className='py-10 font-medium text-[16px] text-[#333]'>Webの出会いとリアルの販売・お直しをつなぐ、価値創造型プラットフォーム。企業・個人・クリエイターが対等につながり、価値実現を支援します。</p>
            </div>
          </div>
          <div className='col-span-3 border-b border-[#2d2a24]'>
            <div className='p-[120px]'>
              <img className="w-[206px]" src="/images/clients/patchplay.webp"/>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>PATCH&PLAYは、“すき”の気持ちをきっかけに、身のまわりのモノを、もう一度遊ぶようにたのしむ「ワッペンとお直しのお店」です。</p>
            </div>
            <CommonLink linkText="PATCH&PLAYについて知る" href="/company" />
            <div className='p-[120px] border-t border-[#2d2a24]'>
              <img className="w-[300px] h-[72px]" src="/images/clients/and_story.webp"/>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>目には見えないけれど価値がある「体験」や「コミュニティ」と出会えるwebプラットフォームです。</p>
            </div>
            <CommonLink linkText="AND STORYについて知る" href="/company" />
          </div>
          <div className='col-span-2 border-b border-r border-[#2d2a24] p-[40px]'>
            <p className='font-poppins text-[14px] font-medium text-[#333] leading-[1]'>( 02 )</p>
            <div className='pl-[120px] pt-[80px] pb-[80px] pr-[80px] font-sans leading-[2]'>
              <h3 className='pb-4 font-bold text-[32px] tracking-[0.04em]'>コミュニティ事業</h3>
              <p className='pt-0 font-medium text-[16px] text-[#333]'>STORY &Co.で運営</p>
              <p className='py-10 font-medium text-[16px] text-[#333]'>企業と個人の共創の場づくりを通じて、社会課題の新たなソリューションを生み出しています。</p>
            </div>
          </div>
          <div className='col-span-3 border-b border-[#2d2a24]'>
            <div className='p-[120px]'>
              <img className="w-[300px]" src="/images/clients/newmake.svg"/>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>クリエイティブの力で社会課題を解決するコミュニティです。</p>
            </div>
            <CommonLink linkText="NewMakeについて知る" href="/company" />
            <div className='p-[120px] border-t border-[#2d2a24]'>
              <img className="w-[300px]" src="/images/clients/hour_of_tower.svg"/>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>こころとからだの健康に触れる機会を創出し、ウェルビーイングの実現をサポートするコミュニティです。</p>
            </div>
            <CommonLink linkText="タワーのアワーについて知る" href="/company" />
          </div>
          <div className='col-span-2 border-b border-r border-[#2d2a24] p-[40px]'>
            <p className='font-poppins text-[14px] font-medium text-[#333] leading-[1]'>( 03 )</p>
            <div className='pl-[120px] pt-[80px] pb-[80px] pr-[80px] font-sans leading-[2]'>
              <h3 className='pb-4 font-bold text-[32px] tracking-[0.04em]'>ソリューション事業</h3>
              <p className='pt-0 font-medium text-[16px] text-[#333]'>課題解決を提供</p>
              <p className='py-10 font-medium text-[16px] text-[#333]'>企業の課題やニーズに応じて、最適な体験・コミュニティづくりをデザインしています。</p>
            </div>
          </div>
          <div className='col-span-3 border-b border-[#2d2a24]'>
            <div className='p-[120px]'>
              <p className='font-sans text-[24px] font-bold leading-[2] text-[#333]'>コミュニティ開発</p>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>ブランド･サービスの認知からファン化までを行うコミュニティづくりをデザインしています。</p>
            </div>
            <CommonLink linkText="コミュニティ開発について知る" href="/company" />
            <div className='p-[120px] border-t border-[#2d2a24]'>
              <p className='font-sans text-[24px] font-bold leading-[2] text-[#333]'>地域・イベントプロデュース</p>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>地域資源を活かし、街と人が繋がる、その街ならではの唯一無二の出会いと交流の場を創出します。</p>
            </div>
            <CommonLink linkText="地域・イベントプロデュースについて知る" href="/company" />
            <div className='p-[120px] border-t border-[#2d2a24]'>
              <p className='font-sans text-[24px] font-bold leading-[2] text-[#333]'>SDGs推進支援</p>
              <p className='pt-10 font-sans text-[20px] font-medium leading-[2] text-[#333]'>やらなくてはいけないからではなく、ビジネスにも社会にも良いSDGs活動をデザインしています。</p>
            </div>
            <CommonLink linkText="SDGs推進支援について知る" href="/company" />
          </div>
        </div>
      </section>

      {/* Create your own story */}
      <section className="pt-[200px] pb-[240px] w-full text-center border-b border-[#2d2a24]">
        <p className='font-sans font-bold text-[32px] leading-[200%] tracking-[0.04em] text-center leading-[2] text-[#333]'>あなただけの物語を。</p>
        <h1 className="mt-8 font-poppins text-[160px] [-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center">
          <span id="create-colorful1">C</span>
          <span id="create-colorful2">r</span>
          <span id="create-colorful3">e</span>
          <span id="create-colorful4">a</span>
          <span id="create-colorful5">t</span>
          <span id="create-colorful6">e </span>
          <span id="create-colorful7">y</span>
          <span id="create-colorful8">o</span>
          <span id="create-colorful9">u</span>
          <span id="create-colorful11">r</span>
          <br />
          <span id="create-colorful12">o</span>
          <span id="create-colorful13">w</span>
          <span id="create-colorful14">n </span>
          <span id="create-colorful15">s</span>
          <span id="create-colorful16">t</span>
          <span id="create-colorful17">o</span>
          <span id="create-colorful18">r</span>
          <span id="create-colorful19">y.</span>
        </h1>
      </section>

      <CasesSection cases={cases} />
      {/* News strip */}
      <section className="w-full border-[#2d2a24] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap pt-[44px] pb-[36px]">
          {['News', 'News', 'News', 'News', 'News', 'News'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
        <div className='grid grid-cols-9 border-t border-b border-[#2d2a24] px-[40px] font-sans text-[16px] font-medium text-[#333] leading-[2]'>
          <div className='col-span-4 border-r border-[#2d2a24] pt-[17px] pb-[19px]'><p>お知らせ</p></div>
          <div className='col-span-1 border-r border-[#2d2a24] pt-[17px] pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>すべて</p></div>
          <div className='col-span-1 border-r border-[#2d2a24] pt-[17px] pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>お知らせ</p></div>
          <div className='col-span-1 border-r border-[#2d2a24] pt-[17px] pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>プレスリリース</p></div>
          <div className='col-span-1 border-r border-[#2d2a24] pt-[17px] pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>メディア掲載</p></div>
          <div className='col-span-1 border-r border-[#2d2a24] pt-[17px] pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFFDF7] transition-colors'><p>イベント</p></div>
        </div>

        {/* News */}
        {news.length > 0 && (
            <div>
              {news.map((n: any) => (
                <div key={n.id} className='grid grid-cols-9 border-b border-[#2d2a24] hover:bg-[#f2f0ea] text-[#333]'>
                  <div className='col-span-3 border-r border-[#2d2a24] items-center justify-center flex px-[40px] pt-[78px] pb-[82px]'>
                    <span className="font-poppins font-medium text-[14px] text-[#2d2a24] shrink-0">
                      {new Date(n.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                    </span>&emsp;|&emsp;
                    <Link href="/news" className="font-sans font-bold text-[14px] leading-[100%] tracking-[0.08em] py-0.5 shrink-0 h-fit hover:text-[#18bed7]">{n.category || 'お知らせ'}</Link>&emsp;|&emsp;
                    <Link href="/category/newmake" className='border border-[#2d2a24] px-[12px] py-[6px] rounded font-poppins font-medium text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'>AND STORY</Link>
                  </div>
                  <Link href="/news" className='col-span-6 px-[40px] pt-[78px] pb-[82px]'>
                    <h3 className='font-sans font-bold text-[24px] leading-[2] tracking-[0.04em]'>{n.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
        )}
        <CommonLink linkText='お知らせをもっとみる' href="/news"  className='px-[40px] pt-[28px] pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]'/>
      </section>

      {/* Contact */}
      <section className="w-full text-center border-t border-b border-[#2d2a24]">
        <Link href="/contact">
          <div className="my-[160px]">
            <h1 className="font-poppins text-[160px] [-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center">
              <span id="contact-colorful1">C</span>
              <span id="contact-colorful2">o</span>
              <span id="contact-colorful3">n</span>
              <span id="contact-colorful4">t</span>
              <span id="contact-colorful5">a</span>
              <span id="contact-colorful6">c</span>
              <span id="contact-colorful7">t</span>
            </h1>
            <h2 className="font-sans font-bold text-[20px] leading-[2] tracking-[0.04em] text-center mt-5 text-[#333]">お気軽にお問い合わせください</h2>
            <p className="font-sans font-medium text-[16px] leading-[2] tracking-[0.04em] text-[#333] max-w-[700px] mt-5 text-left mx-auto">
            少しでもご興味持っていただけましたら、何ができるかもこちらで考えてみますので、まずはお問い合わせいただけると幸いです。
            </p>
          </div>
        </Link>
        <CommonLink linkText="お問い合わせ" href="/contact"/>
      </section>

      {/* Recruit strip */}
      <section className="w-full overflow-hidden border-b border-[#2d2a24]">
        <Link href="/companies">
          <div className="flex gap-8 animate-marquee whitespace-nowrap pt-[56px]">
            {['Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit'].map((t, i) => (
              <span key={i} className="flex font-poppins font-semibold text-[160px] leading-[100%] tracking-[-4%] shrink-0 text-[#2d2a24]">{t}&nbsp;<img src="/images/clients/recruit.svg" className='max-w-[128px] mt-[15px]'/></span>
            ))}
          </div>
        </Link>
        <Link href="/companies" className="font-sans text-[#333]">
          <h2 className="font-sans font-bold text-[20px] leading-[200%] tracking-[0.04em] text-center my-10">採用情報</h2>
          <p className="font-sans font-medium text-[16px] leading-[200%] tracking-[0.08em] max-w-[700px] mx-auto mb-20">体験やコミュニティのデザインを通じて、人の暮らしを良くしていくことに興味がある方と一緒に働いていきたいので、想いのある方からのご応募をお待ちしております。</p>
        </Link>
        <CommonSquareLink linkText="採用情報" href="/companies" />

      </section>

      {/* And Story */}
      <AndStorySection clientLogos={clientLogos} />
    </>
  )
}
