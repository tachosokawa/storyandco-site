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
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-[#00B8CC] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-[#8B5CF6] blur-3xl" />
        </div>
        <div className="relative w-full pt-16 md:pt-32 lg:pt-[224px] px-4 md:px-6 lg:px-[40px]">
          <p className="font-sans text-lg md:text-2xl lg:text-[32px] font-bold text-[#333] mb-2 md:mb-3 text-center md:text-right tracking-[0.04em]">体験を通じて、新しい物語を生み出す。</p>
          <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[188px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center md:text-right">
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
        <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-2 text-sm text-[#2d2a24] mt-8 md:mt-16 lg:mt-[165px] pb-8 md:pb-16 lg:pb-[120px] px-4 md:px-6 lg:px-0">
          <div className="inline-flex items-center gap-2 text-sm md:text-[16px] font-medium pl-0 md:pl-[40px] pt-4 md:pt-12">
            <svg className="w-5 h-5 md:w-6 md:h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v8m0 0l-3-3m3 3l3-3" />
            </svg>
            <span className="hidden md:inline">Scroll down to explore</span>
            <span className="md:hidden">Scroll</span>
          </div>
          <div className="inline-flex items-center border-l border-t border-b border-r md:border-r-0 border-[#2d2a24] rounded-lg md:rounded-tr-none md:rounded-br-none h-auto md:h-[74px] w-full md:w-[55%] ml-0 md:ml-auto py-2 md:py-0">
            <p className='px-3 md:px-[24px] font-bold text-sm md:text-[16px] whitespace-nowrap'>2026.01.07</p>
            <div className='border-r border-[#2d2a24] h-full hidden md:block'></div>
            <div className="flex-1 overflow-hidden">
              <p id="mv-news-loop-area" className='font-bold text-xs md:text-[16px] whitespace-nowrap'>重要なお知らせなどの最新ニュースが一件入ります。重要なお知らせなどの最新ニュースが一件入ります。重要なお知らせなどの最新ニュースが一件入ります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full">
        <div className='border-t border-b border-[#2d2a24] grid grid-cols-1 lg:grid-cols-9'>
          <div className='border-r-0 lg:border-r border-[#2d2a24] col-span-1 lg:col-span-4'>
            <div className='border-b border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
              <h2 className="text-4xl md:text-6xl lg:text-[96px] font-semibold text-[#333] font-poppins leading-[1] tracking-[-0.04em] flex justify-start">About our business</h2>
            </div>
            <div className='border-b border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] px-4 md:px-6 lg:px-[40px]'>
              <p className="text-sm md:text-base lg:text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] flex justify-start font-sans">会社のこと</p>
            </div>
            <div className='border-b border-[#2d2a24] py-8 md:py-12 lg:py-[80px] px-4 md:px-6 lg:px-[40px] text-[#333]'>
              <p className="text-lg md:text-xl lg:text-[24px] font-bold leading-relaxed mb-4 md:mb-6 lg:mb-8">
                体験をデザインすることで人生に出会いと変化をもたらし、新しい物語を生み出す企業です。
              </p>
              <p className="text-sm md:text-base lg:text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] flex justify-start font-sans">
                情報が飽和し、結果的に近しい人たちの口コミやSNSでのリアルな情報が信じられるようになった時代。従来のマーケティング手法では集客や興味喚起が困難となり、また買ってもらって終わりではなく、そこから始まるファン化・コミュニティ化の道のりが見えない。そんな課題に対して、従来の「モノ(商品)」と「コト(体験)」に加え、STORY&Co.は「プラットフォーム事業」「コミュニティ事業」「ソリューション事業」の3分野から、企業と顧客の新しいストーリーが生まれる体験を提供。楽しそうじゃない「モノゴト」も、自分が体験すると「物語」になる。出会いと変化の物語をこれからも作り続けます。</p>
            </div>
            <CompanyLink />
          </div>
          <div className="flex items-center justify-center p-4 md:p-6 lg:p-[40px] col-span-1 lg:col-span-5">
            <img className="max-w-full md:max-w-[78%]" src="/images/clients/about.webp" alt="About Us" height="auto"/>
          </div>

        </div>
      </section>

      {/* Our Clients - with real logos */}
      <ClientsSection />

      {/* Services marquee strip */}
      <section className="w-full border-b border-[#2d2a24] overflow-hidden pt-6 md:pt-8 lg:pt-[44px] pb-4 md:pb-6 lg:pb-[36px]">
        <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap">
          {['Our Services', 'Our Services', 'Our Services', 'Our Services', 'Our Services', 'Our Services'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-4xl md:text-6xl lg:text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="w-full">
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='col-span-1 lg:col-span-5 border-b border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] px-4 md:px-6 lg:px-[40px]'>
            <p className="text-sm md:text-base lg:text-[16px] font-sans font-medium text-[#2d2a24] leading-[2]">事業のこと</p>
          </div>
          <div className='col-span-1 lg:col-span-2 border-b lg:border-r border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
            <p className='font-poppins text-xs md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 01 )</p>
            <div className='pl-0 md:pl-8 lg:pl-[120px] pt-6 md:pt-10 lg:pt-[80px] pb-6 md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans leading-[2]'>
              <h3 className='pb-2 md:pb-3 lg:pb-4 font-bold text-xl md:text-2xl lg:text-[32px] tracking-[0.04em]'>プラットフォーム事業</h3>
              <p className='pt-0 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>STORY &Co.で運営</p>
              <p className='py-4 md:py-6 lg:py-10 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>Webの出会いとリアルの販売・お直しをつなぐ、価値創造型プラットフォーム。企業・個人・クリエイターが対等につながり、価値実現を支援します。</p>
            </div>
          </div>
          <div className='col-span-1 lg:col-span-3 border-b border-[#2d2a24]'>
            <div className='p-6 md:p-12 lg:p-[120px]'>
              <img className="w-full max-w-[206px]" src="/images/clients/patchplay.webp" alt="PATCH&PLAY"/>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>PATCH&PLAYは、"すき"の気持ちをきっかけに、身のまわりのモノを、もう一度遊ぶようにたのしむ「ワッペンとお直しのお店」です。</p>
            </div>
            <CommonLink linkText="PATCH&PLAYについて知る" href="/company" />
            <div className='p-6 md:p-12 lg:p-[120px] border-t border-[#2d2a24]'>
              <img className="w-full max-w-[300px] h-auto" src="/images/clients/and_story.webp" alt="AND STORY"/>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>目には見えないけれど価値がある「体験」や「コミュニティ」と出会えるWebプラットフォームです。</p>
            </div>
            <CommonLink linkText="AND STORYについて知る" href="/company" />
          </div>
          <div className='col-span-1 lg:col-span-2 border-b lg:border-r border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
            <p className='font-poppins text-xs md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 02 )</p>
            <div className='pl-0 md:pl-8 lg:pl-[120px] pt-6 md:pt-10 lg:pt-[80px] pb-6 md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans leading-[2]'>
              <h3 className='pb-2 md:pb-3 lg:pb-4 font-bold text-xl md:text-2xl lg:text-[32px] tracking-[0.04em]'>コミュニティ事業</h3>
              <p className='pt-0 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>STORY &Co.で運営</p>
              <p className='py-4 md:py-6 lg:py-10 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>企業と個人の共創の場づくりを通じて、社会課題の新たなソリューションを生み出しています。</p>
            </div>
          </div>
          <div className='col-span-1 lg:col-span-3 border-b border-[#2d2a24]'>
            <div className='p-6 md:p-12 lg:p-[120px]'>
              <img className="w-full max-w-[300px]" src="/images/clients/newmake.svg" alt="NewMake"/>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>クリエイティブの力で社会課題を解決するコミュニティです。</p>
            </div>
            <CommonLink linkText="NewMakeについて知る" href="/company" />
            <div className='p-6 md:p-12 lg:p-[120px] border-t border-[#2d2a24]'>
              <img className="w-full max-w-[300px]" src="/images/clients/hour_of_tower.svg" alt="タワーのアワー"/>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>こころとからだの健康に触れる機会を創出し、ウェルビーイングの実現をサポートするコミュニティです。</p>
            </div>
            <CommonLink linkText="タワーのアワーについて知る" href="/company" />
          </div>
          <div className='col-span-1 lg:col-span-2 border-b lg:border-r border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
            <p className='font-poppins text-xs md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 03 )</p>
            <div className='pl-0 md:pl-8 lg:pl-[120px] pt-6 md:pt-10 lg:pt-[80px] pb-6 md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans leading-[2]'>
              <h3 className='pb-2 md:pb-3 lg:pb-4 font-bold text-xl md:text-2xl lg:text-[32px] tracking-[0.04em]'>ソリューション事業</h3>
              <p className='pt-0 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>課題解決を提供</p>
              <p className='py-4 md:py-6 lg:py-10 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>企業の課題やニーズに応じて、最適な体験・コミュニティづくりをデザインしています。</p>
            </div>
          </div>
          <div className='col-span-1 lg:col-span-3 border-b border-[#2d2a24]'>
            <div className='p-6 md:p-12 lg:p-[120px]'>
              <p className='font-sans text-lg md:text-xl lg:text-[24px] font-bold leading-[2] text-[#333]'>コミュニティ開発</p>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>ブランド・サービスの認知からファン化までを行うコミュニティづくりをデザインしています。</p>
            </div>
            <CommonLink linkText="コミュニティ開発について知る" href="/company" />
            <div className='p-6 md:p-12 lg:p-[120px] border-t border-[#2d2a24]'>
              <p className='font-sans text-lg md:text-xl lg:text-[24px] font-bold leading-[2] text-[#333]'>地域・イベントプロデュース</p>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>地域資源を活かし、街と人が繋がる、その街ならではの唯一無二の出会いと交流の場を創出します。</p>
            </div>
            <CommonLink linkText="地域・イベントプロデュースについて知る" href="/company" />
            <div className='p-6 md:p-12 lg:p-[120px] border-t border-[#2d2a24]'>
              <p className='font-sans text-lg md:text-xl lg:text-[24px] font-bold leading-[2] text-[#333]'>SDGs推進支援</p>
              <p className='pt-4 md:pt-6 lg:pt-10 font-sans text-base md:text-lg lg:text-[20px] font-medium leading-[2] text-[#333]'>やらなくてはいけないからではなく、ビジネスにも社会にも良いSDGs活動をデザインしています。</p>
            </div>
            <CommonLink linkText="SDGs推進支援について知る" href="/company" />
          </div>
        </div>
      </section>

      {/* Create your own story */}
      <section className="pt-16 md:pt-24 lg:pt-[200px] pb-16 md:pb-24 lg:pb-[240px] w-full text-center border-b border-[#2d2a24] px-4 md:px-6 lg:px-0">
        <p className='font-sans font-bold text-xl md:text-2xl lg:text-[32px] leading-[2] tracking-[0.04em] text-center text-[#333]'>あなただけの物語を。</p>
        <h1 className="mt-4 md:mt-6 lg:mt-8 font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center">
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
        <div className="flex animate-marquee whitespace-nowrap pt-6 md:pt-8 lg:pt-[44px] pb-4 md:pb-6 lg:pb-[36px]">
          {['News', 'News', 'News', 'News', 'News', 'News'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-4xl md:text-6xl lg:text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 border-t border-b border-[#2d2a24] px-4 md:px-6 lg:px-[40px] font-sans text-xs md:text-sm lg:text-[16px] font-medium text-[#333] leading-[2]'>
          <div className='col-span-2 md:col-span-1 lg:col-span-4 border-r border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px]'><p>お知らせ</p></div>
          <div className='col-span-1 border-r border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>すべて</p></div>
          <div className='col-span-1 border-r border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>お知らせ</p></div>
          <div className='col-span-1 border-r border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p className="text-xs">プレス</p></div>
          <div className='col-span-1 border-r border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p className="text-xs md:text-sm lg:text-base">メディア</p></div>
          <div className='col-span-1 border-r border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] active:bg-[#18BED7] [&.active]:bg-[#18BED7] hover:text-[#FFF] active:text-[#FFF] [&.active]:text-[#FFF] transition-colors'><p>イベント</p></div>
        </div>

        {/* News */}
        {news.length > 0 && (
            <div>
              {news.map((n: any) => (
                <div key={n.id} className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 border-b border-[#2d2a24] hover:bg-[#f2f0ea] text-[#333]'>
                  <div className='col-span-1 md:col-span-1 lg:col-span-3 border-r-0 md:border-r lg:border-r border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] items-center justify-center flex flex-col md:flex-row gap-2 md:gap-0 px-4 md:px-6 lg:px-[40px] pt-6 md:pt-10 lg:pt-[78px] pb-6 md:pb-10 lg:pb-[82px]'>
                    <span className="font-poppins font-medium text-xs md:text-sm lg:text-[14px] text-[#2d2a24] shrink-0">
                      {new Date(n.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                    </span>
                    <span className="hidden md:inline">&emsp;|&emsp;</span>
                    <Link href="/news" className="font-sans font-bold text-xs md:text-sm lg:text-[14px] leading-[100%] tracking-[0.08em] py-0.5 shrink-0 h-fit hover:text-[#18bed7]">{n.category || 'お知らせ'}</Link>
                    <span className="hidden md:inline">&emsp;|&emsp;</span>
                    <Link href="/category/newmake" className='border border-[#2d2a24] px-2 md:px-[12px] py-1 md:py-[6px] rounded font-poppins font-medium text-[10px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'>AND STORY</Link>
                  </div>
                  <Link href="/news" className='col-span-1 md:col-span-2 lg:col-span-6 px-4 md:px-6 lg:px-[40px] pt-4 md:pt-10 lg:pt-[78px] pb-4 md:pb-10 lg:pb-[82px]'>
                    <h3 className='font-sans font-bold text-base md:text-xl lg:text-[24px] leading-[2] tracking-[0.04em]'>{n.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
        )}
        <CommonLink linkText='お知らせをもっとみる' href="/news"  className='px-4 md:px-6 lg:px-[40px] pt-4 md:pt-6 lg:pt-[28px] pb-4 md:pb-6 lg:pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-sm md:text-base lg:text-[16px]'/>
      </section>

      {/* Contact */}
      <section className="w-full text-center border-t border-b border-[#2d2a24] px-4 md:px-6 lg:px-0">
        <Link href="/contact">
          <div className="my-12 md:my-20 lg:my-[160px]">
            <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center">
              <span id="contact-colorful1">C</span>
              <span id="contact-colorful2">o</span>
              <span id="contact-colorful3">n</span>
              <span id="contact-colorful4">t</span>
              <span id="contact-colorful5">a</span>
              <span id="contact-colorful6">c</span>
              <span id="contact-colorful7">t</span>
            </h1>
            <h2 className="font-sans font-bold text-base md:text-lg lg:text-[20px] leading-[2] tracking-[0.04em] text-center mt-4 md:mt-5 text-[#333]">お気軽にお問い合わせください</h2>
            <p className="font-sans font-medium text-sm md:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#333] max-w-[700px] mt-4 md:mt-5 text-left mx-auto px-4 md:px-0">
            少しでもご興味を持っていただけましたら、何ができるかもこちらで考えてみますので、まずはお問い合わせいただけると幸いです。
            </p>
          </div>
        </Link>
        <CommonLink linkText="お問い合わせ" href="/contact"/>
      </section>

      {/* Recruit strip */}
      <section className="w-full overflow-hidden border-b border-[#2d2a24] px-4 md:px-6 lg:px-0">
        <Link href="/companies">
          <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap pt-8 md:pt-12 lg:pt-[56px]">
            {['Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit'].map((t, i) => (
              <span key={i} className="flex font-poppins font-semibold text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] leading-[100%] tracking-[-4%] shrink-0 text-[#2d2a24]">{t}&nbsp;<img src="/images/clients/recruit.svg" className='max-w-[64px] md:max-w-[96px] lg:max-w-[128px] mt-2 md:mt-3 lg:mt-[15px]' alt="Recruit"/></span>
            ))}
          </div>
        </Link>
        <Link href="/companies" className="font-sans text-[#333]">
          <h2 className="font-sans font-bold text-base md:text-lg lg:text-[20px] leading-[2] tracking-[0.04em] text-center my-6 md:my-8 lg:my-10">採用情報</h2>
          <p className="font-sans font-medium text-sm md:text-base lg:text-[16px] leading-[2] tracking-[0.08em] max-w-[700px] mx-auto mb-8 md:mb-12 lg:mb-20 px-4 md:px-0">体験やコミュニティのデザインを通じて、人の暮らしを良くしていくことに興味がある方と一緒に働いていきたいので、想いのある方からのご応募をお待ちしております。</p>
        </Link>
        <CommonSquareLink linkText="採用情報" href="/companies" />

      </section>

      {/* And Story */}
      <AndStorySection clientLogos={clientLogos} />
    </>
  )
}
