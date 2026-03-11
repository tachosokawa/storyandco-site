import Link from 'next/link'
import CommonSquareLink from '@/components/CommonSquareLink'

export default function RecruitSection() {
  return (
    <section className="w-full overflow-hidden border-b border-[#2d2a24] px-4 md:px-6 lg:px-0">
      <Link href="/company">
        <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap pt-8 md:pt-12 lg:pt-[56px]">
          {['Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit', 'Recruit'].map((t, i) => (
            <span key={i} className="flex font-poppins font-semibold text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] leading-[100%] tracking-[-4%] shrink-0 text-[#2d2a24]">{t}&nbsp;<img src="/images/clients/recruit.svg" className='max-w-[64px] md:max-w-[96px] lg:max-w-[128px] mt-2 md:mt-3 lg:mt-[15px]' alt="Recruit"/></span>
          ))}
        </div>
      </Link>
      <Link href="/company" className="font-sans text-[#333]">
        <h2 className="font-sans font-bold text-base md:text-lg lg:text-[20px] leading-[2] tracking-[0.04em] text-center my-6 md:my-8 lg:my-10">採用情報</h2>
        <p className="font-sans font-medium text-sm md:text-base lg:text-[16px] leading-[2] tracking-[0.08em] max-w-[700px] mx-auto mb-8 md:mb-12 lg:mb-20 px-4 md:px-0">体験やコミュニティのデザインを通じて、人の暮らしを良くしていくことに興味がある方と一緒に働いていきたいので、想いのある方からのご応募をお待ちしております。</p>
      </Link>
      <CommonSquareLink linkText="採用情報" href="/company" />
    </section>
  )
}
