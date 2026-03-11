import Image from 'next/image'
import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'

export const metadata: Metadata = {
  title: '会社のこと',
  description: 'STORY&Co.の会社情報。ミッション・ビジョン・バリュー、代表メッセージ、メンバー紹介、会社概要。',
}

const members = [
  { name: '瀧本 かれん', 
    role: '企画部プロジェクトマネージャー', 
    photo: '/images/member1.webp', 
    bio: 'アップサイクル専門のアパレル生産を経験。アップサイクルの認知向上に貢献したいという思いから入社。' 
  },
  { name: '大和田 洋子', 
    role: 'クリエイティブチームマネージャー', 
    photo: '/images/member2.webp', 
    bio: 'クリエイティブの力で誰かの役に立ちたい、世の中にちょっとでもいいことできたらなと考えています。' 
  },
  { name: '吉田 陽香', 
    role: 'タワーのアワーコミュニティマネージャー', 
    photo: '/images/member3.webp', 
    bio: '人と人とか繋がるきっかけづくりに関心があり、福祉業界から転職。学生時代から池袋のまちづくりや、地域の子ども向け運動プログラムの運営にボランティアとして携わる。ライブやカメラ、グラレコが趣味。' 
  },
  { name: '渡邉 栞菜', 
    role: '企画部プロジェクトマネージャー', 
    photo: '/images/member4.webp', 
    bio: '高校・短大で服飾を学び、アパレルのデザイナーとファッションスタイリストを経験。サステナブル×ファッションの活動に興味を持ち入社。' 
  },
  
]

export default function CompanyPage() {
  return (
    <>
      {/* Page header */}
      <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[296px] pb-12 sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-4 sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.06em]">C</span>
          <span id="mv-colorful2" className="tracking-[-0.06em]">o</span>
          <span id="mv-colorful3" className="tracking-[-0.08em]">m</span>
          <span id="mv-colorful4" className="tracking-[-0.03em]">p</span>
          <span id="mv-colorful5" className="tracking-[-0.06em]">a</span>
          <span id="mv-colorful6" className="tracking-[-0.05em]">n</span>
          <span id="mv-colorful7" className="tracking-[-0.04em]">y</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">会社のこと</p>
      </div>

      {/* はじめに物語あり */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-9">
          <div className='border-b md:border-b-0 md:border-r border-[#2d2a24] col-span-1 md:col-span-4 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-[120px]'>
            <h2 className="font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em] text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-center">はじめに物語あり</h2>
          </div>
          <div className="col-span-1 md:col-span-5 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-[120px] font-sans text-base sm:text-lg md:text-xl lg:text-[20px] leading-[2] tracking-[0.04em] font-medium text-[#2d2a24]">
            <p>どこに行けば良いとか、</p>
            <p>何をすれば良いとか、</p>
            <p>どんな風になれば良いとか、</p>
            <p>そんな地図がなくなった時代。</p>
            <br />
            <p>あなただけの物語を切り開くのは、</p>
            <p>あなたしかいないのだけれど、</p>
            <p>そんなふつうなことが、時々わからなくなる。</p>
            <br />
            <p>地図はないけど、コンパスなら持っている人たちがいる。</p>
            <p>自らの道で、困難に向き合い、越えてきた、そんな人たち。</p>
            <br />
            <p>そんな人たちとの出会いは、</p>
            <p>あなたの物語の行き先を、見つけだす手がかりとなる。</p>
            <br />
            <p>だれかにとって当たり前の日常は、</p>
            <p>あなたにとって特別な体験となる。</p>
            <br />
            <p>そんな出会いと体験が、</p>
            <p>あなたを次の物語へと導いてくれる。</p>
            <p>そしてその物語は、まだ見ぬ誰かの物語と繋がっている。</p>
            <br />
            <p>STORY&Co.</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Value */}
      <section className="border-y border-[#2d2a24]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              label: 'Mission',
              sub: 'ミッション',
              text: '出会いと変化の物語を生み出し、暮らしを豊かにする',
            },
            {
              label: 'Vision',
              sub: 'ビジョン',
              text: [
                '体験を通じて、人と人とが共感で繋がれる機会を紡ぐ',
                '個人がより幸せに、自己実現を図れる機会を提供する'
              ],
            },
            {
              label: 'Value',
              sub: 'バリュー',
              text: 'その一歩を、より良いものにするためにわたしたちは挑戦しつづける。',
            }
          ].map((item, index) => (
            <div key={item.label} className={`col-span-1 ${index < 2 ? 'border-b md:border-b-0 md:border-r border-[#2d2a24]' : ''}`}>
              <div className='p-4 sm:p-6 md:p-8 lg:p-[40px]'>
                <p className="font-poppins font-semibold text-[#2d2a24] leading-[1] tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-left">{item.label}</p>
              </div>
              <div className='border-y border-[#2d2a24] pt-[17px] pb-[19px] px-4 sm:px-6 md:px-8 lg:px-[40px]'>
                <p className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">{item.sub}</p>
              </div>
              <div className='py-8 sm:py-12 md:py-16 lg:py-[80px] px-4 sm:px-6 md:px-8 lg:px-[40px]'>
                <ul className="list-disc pl-4 sm:pl-5 md:pl-6">
                {Array.isArray(item.text) ? (
                  item.text.map((textItem, textIndex) => (
                    <li key={textIndex} className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">{textItem}</li>
                  ))
                ) : (
                  <li className="font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left">{item.text}</li>
                )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="w-full">
        <div className='border-b border-[#2d2a24] grid grid-cols-1 lg:grid-cols-9'>
          <div className='border-r-0 lg:border-r border-[#2d2a24] col-span-1 lg:col-span-4'>
            <div className='border-b border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
              <h2 className="text-4xl md:text-6xl lg:text-[32px] font-bold text-[#333] font-sans tracking-[-0.04em]" style={{ lineHeight: 2 }}>体験をデザインすることで人生に出会いと変化をもたらし、新しい物語を生み出す企業です。</h2>
            </div>
            <div className='py-8 md:py-12 lg:py-[80px] px-4 md:px-6 lg:px-[40px] text-[#333]'>
              <p className="text-sm md:text-base lg:text-[16px] font-medium text-[#333] tracking-[0.04em] flex justify-start font-sans" style={{ lineHeight: 2 }}>
              弊社のビジネスの根幹は、「人の心を動かすことで、行動を生み出す」ことにあります。「プラットフォーム事業」「コミュニティ事業」「ソリューション事業」の3つの事業分野がありますが、企業や自治体の課題･ニーズに応じて、オリジナルで面白い体験や居心地の良いコミュニティを提供することで人を動かすことが、弊社の提供価値です。また、1社のみでは解決できないことを、他企業や自治体を巻き込みながら新しい価値創造を手掛けるのも僕たちらしい解決策です。有形のモノ･無形のコト･受け継がれるモノガタリをこれからも生み出していきます。</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 md:p-6 lg:p-[40px] col-span-1 lg:col-span-5">
            <img className="max-w-full md:max-w-[100%]" src="/images/clients/about.webp" alt="About Us" height="auto"/>
          </div>
        </div>
      </section>

      {/* CEO message */}
      <section className="w-full">
        <div className='border-b border-[#2d2a24] grid grid-cols-1 lg:grid-cols-9'>
          <div className='border-r-0 lg:border-r border-[#2d2a24] col-span-1 lg:col-span-4'>
            <div className='p-4 md:p-6 lg:p-[40px]'>
              <img src="/images/ceo-hosokawa.webp" alt="代表取締役 細川拓" className='rounded-lg' />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-5">
            <div className='border-b border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
              <h2 className="text-4xl md:text-6xl lg:text-[32px] font-bold text-[#333] font-sans tracking-[-0.04em]" style={{ lineHeight: 2 }}>代表メッセージ</h2>
            </div>
            <div className='py-8 md:py-12 lg:py-[80px] px-4 md:px-6 lg:px-[40px] text-[#2d2a24]'>
              <p className="text-sm md:text-base lg:text-[16px] font-medium tracking-[0.04em] flex justify-start font-sans" style={{ lineHeight: 2 }}>
              インターネットの誕生以来、私たちの生活は飛躍的に豊かになりました。欲しいものがすぐに手に入り、どこでも好きなコンテンツを楽しむことができる。働き方、暮らし方、学び方、そのすべてが大きく変わりました。そして、AIの進化により、私たちの生活はさらに発展していくことでしょう。</p>
              <p className="mt-8 text-sm md:text-base lg:text-[16px] font-medium tracking-[0.04em] flex justify-start font-sans" style={{ lineHeight: 2 }}>
              しかし、私たちは肉体を持ち、五感を通じて豊かさや幸せを感じ取る生き物です。笑顔や涙がそのまま感情を表しているわけではありません。私たちは複雑でありながら、同時にシンプルな存在です。目に見えない「体験」というメディアは、さまざまな場所に存在します。家族との食事・初めてのレッスン・仲間との旅行・週末のデート。私たちはこうした日常のあらゆる体験をデザインし、インターネットやAI、そしてこれから発展するすべてのテクノロジーと共に、あなたの人生を豊かにすることに寄り添い続けます。</p>
              <p className="mt-8 text-sm md:text-base lg:text-[16px] font-medium tracking-[0.04em] flex justify-end font-sans" style={{ lineHeight: 2 }}>
              株式会社ストーリーアンドカンパニー</p>
              <p className="text-sm md:text-base lg:text-[16px] font-medium tracking-[0.04em] flex justify-end font-sans" style={{ lineHeight: 2 }}>
              代表取締役</p>
              <p className="text-sm md:text-base lg:text-[16px] font-medium tracking-[0.04em] flex justify-end font-sans" style={{ lineHeight: 2 }}>
              細川 拓</p>
            </div>
          </div>
        </div>
      </section>

      {/* Members strip */}
      <section className="border-b border-[#2d2a24] overflow-hidden">
        <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap pt-6 sm:pt-8 md:pt-10 lg:pt-[44px] pb-4 sm:pb-6 md:pb-8 lg:pb-[36px]">
          {['Members', 'Members', 'Members', 'Members', 'Members', 'Members'].map((t, i) => (
            <span key={i} className="font-poppins font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
          ))}
        </div>
      </section>

      {/* Members */}
      <section className="w-full border-b border-[#2d2a24]">
        <div className='border-b border-[#2d2a24] p-4 sm:p-[17px] pb-4 sm:pb-[19px] px-4 sm:px-6 md:px-8 lg:px-[40px]'>
          <p className="font-sans font-medium text-sm sm:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#333]">メンバー紹介</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, index) => (
            <div key={m.name} className={`flex flex-col items-center text-left p-4 sm:p-6 md:p-8 lg:p-[40px] ${
              index < members.length - 1 
                ? 'border-b sm:border-b-0 border-[#2d2a24]' 
                : ''
            } ${
              index % 2 === 0 && index < members.length - 1
                ? 'sm:border-r border-[#2d2a24]' 
                : ''
            } ${
              index < members.length - 1 && index % 4 !== 3
                ? 'lg:border-r border-[#2d2a24]' 
                : ''
            }`}>
              <div className="w-full">
                <img src={m.photo} alt={m.name} className="w-full h-auto"/>
              </div>
              <div className="mt-4 sm:mt-6 md:mt-[27px]">
                <p className="font-sans font-bold text-base sm:text-lg md:text-xl lg:text-[20px] leading-[2] tracking-[0.04em] text-[#2d2a24]">{m.name}</p>
                <p className="font-sans font-bold text-xs sm:text-sm md:text-[14px] leading-[2] tracking-[0.04em] text-[#2d2a24]">{m.role}</p>
                <p className="mt-2 sm:mt-3 md:mt-[15px] font-sans font-medium text-sm sm:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#2d2a24]">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company outline */}
      <section className="w-full">
        <div className="px-4 sm:px-6 md:px-8 lg:px-[40px] border-b border-[#2d2d2d] flex flex-col sm:flex-row items-center justify-between min-h-[96px] py-4 sm:py-0 sm:h-[96px]">
          <div className='flex items-center pr-0 sm:pr-6 md:pr-8 lg:pr-[40px] border-b sm:border-b-0 sm:border-r border-[#2d2d2d] h-full w-full sm:w-auto pb-4 sm:pb-0'>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#333] font-semibold font-poppins tracking-[-0.04em] leading-[1]">Outline</p>
          </div>
          <div className='flex items-center justify-end h-full w-full sm:w-auto pt-4 sm:pt-0'>
            <div className='hidden sm:block w-[1px] h-full bg-[#2d2d2d]'></div>
            <p className='text-sm sm:text-base lg:text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] font-sans pl-0 sm:pl-6 md:pl-8 lg:pl-[40px]'>会社概要</p>
          </div>
        </div>
        <div className='w-full py-8 sm:py-12 md:py-16 lg:py-[80px]'>
          {[
            { label: '企業名', value: '株式会社ストーリーアンドカンパニー' },
            { label: '設立', value: '2016年' },
            { label: '代表取締役', value: '細川 拓' },
            { label: '資本金', value: ['資本金3821万3586円', '資本準備金1515万1518円'] },
            { label: '本社', value: ['〒100-0005', '東京都千代田区丸の内一丁目1番3号', '日本生命丸の内ガーデンタワー3階'] },
          ].map((row) => (
            <div  key={row.label} className='grid grid-cols-1 sm:grid-cols-5 px-4 sm:px-6 md:px-8 lg:px-[40px] py-4 sm:py-6 md:py-8 lg:py-[32px] border-b border-[#2d2a24] max-w-[660px] mx-auto gap-2 sm:gap-0'>
              <p className='col-span-1 sm:col-span-2 font-sans font-bold text-sm sm:text-base lg:text-[16px] leading-[2] tracking-[0.08em] text-[#2d2a24]'>{row.label}</p>
              <p className='col-span-1 sm:col-span-3 font-sans font-medium text-sm sm:text-base lg:text-[16px] leading-[2] tracking-[0.08em] text-[#2d2a24]'>{Array.isArray(row.value) ? row.value.map((v, i) => <span key={i}>{v}<br /></span>) : row.value}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}
