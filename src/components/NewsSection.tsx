import Link from 'next/link'
import CommonLink from '@/components/CommonLink'

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

export default async function NewsSection() {
  const news = await getLatestNews()
  return (
    <section className="w-full border-t border-[#2d2d2d] overflow-hidden">
      <div className="flex gap-4 md:gap-6 lg:gap-8  animate-marquee whitespace-nowrap pt-6 md:pt-8 lg:pt-[44px] pb-4 md:pb-6 lg:pb-[36px]">
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
          {news.map((n: { id: number|string, publishedAt: string, category?: string, title: string }) => (
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
  )
}
