'use client'

import Link from 'next/link'
import CommonSquareLink from '@/components/CommonSquareLink'

export default function RecruitSection() {
  const handleRecruitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = 'https://www.wantedly.com/companies/storyandco'
  }

  return (
    <section className="w-full overflow-hidden border-b border-[#2d2a24] md:px-6 lg:px-0">
      <Link href="/recruit" onClick={handleRecruitClick}>
        <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap pt-[32px] md:pt-12 lg:pt-[56px]">
          {['Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit'].map((t, i) => (
            <span key={i} className="flex font-poppins font-semibold text-[48px] sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] tracking-[-4%] shrink-0 text-[#2d2a24]" style={{ lineHeight: '100%' }}>{t}&nbsp;<img src="/images/clients/recruit.svg" className='max-w-[38.5px] md:max-w-[96px] lg:max-w-[128px] mt-2 md:mt-3 lg:mt-[15px]' alt="Recruit" width={128} height={128}/></span>
          ))}
        </div>
      </Link>
      <Link href="/recruit" onClick={handleRecruitClick} className="font-sans text-[#333] md:border-b border-[#2d2a24] md:px-0">
        <h2 className="font-sans font-bold text-[16px] md:text-lg lg:text-[20px] tracking-[0.04em] text-center my-6 md:my-8 lg:my-10" style={{ lineHeight: '2' }}>採用情報</h2>
        <p className="font-sans font-medium text-sm md:text-base lg:text-[16px] tracking-[0.08em] md:max-w-[700px] pb-[40px] px-[20px] md:mb-[40px] lg:mb-[40px] md:px-0 mx-auto" style={{ lineHeight: '2' }}>体験やコミュニティのデザインを通じて、人の暮らしを良くしていくことに興味がある方と一緒に働いていきたいので、想いのある方からのご応募をお待ちしております。</p>
      </Link>
      <CommonSquareLink linkText="採用情報" href="/recruit" />
    </section>
  )
}
