import type { Metadata } from 'next'
import CommonButton from '@/components/CommonButton'

export const metadata: Metadata = {
  title: '採用情報',
  description: 'STORY&Co.の採用情報。体験やコミュニティのデザインを通じて、新しい物語を一緒に生み出す仲間を募集しています。',
  alternates: { canonical: '/recruit' },
  openGraph: { url: '/recruit' },
}

export default function RecruitPage() {
  return (
    <>
      <div className="pt-[160px] pb-[96px] sm:pt-24 md:pt-32 lg:pt-[200px] xl:pt-[256px] sm:pb-16 md:pb-24 lg:pb-[150px] xl:pb-[200px] text-center border-b border-[#2d2a24] px-[20px] sm:px-6 md:px-8 lg:px-[40px]">
        <h1 className="font-poppins text-[48px] sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] text-center">
          <span id="mv-colorful1" className="tracking-[-0.04em]">R</span>
          <span id="mv-colorful2" className="tracking-[-0.03em]">e</span>
          <span id="mv-colorful3" className="tracking-[-0.04em]">c</span>
          <span id="mv-colorful4" className="tracking-[-0.04em]">r</span>
          <span id="mv-colorful5" className="tracking-[-0.04em]">u</span>
          <span id="mv-colorful6" className="tracking-[-0.06em]">i</span>
          <span id="mv-colorful7" className="tracking-[-0.04em]">t</span>
        </h1>
        <p className="mt-4 text-[18px] sm:text-lg md:text-xl lg:text-[20px] font-sans font-bold text-[#2d2a24] leading-[2] tracking-[0.04em]">採用情報</p>
      </div>

      <div className="max-w-[760px] mx-auto py-16 px-[20px]">
        <p className="font-sans font-medium text-[16px] md:text-base lg:text-[16px] leading-[2] tracking-[0.04em] text-[#2d2a24] mb-12">
          STORY&Co.は、体験やコミュニティのデザインを通じて、人の暮らしを豊かにしていく仲間を探しています。異なるバックグラウンドを持つメンバーが集まり、それぞれの「好き」や「得意」を活かしながら、新しい物語を一緒に生み出しています。少しでも興味をお持ちいただけましたら、ぜひご覧ください。
        </p>

        <a href="https://www.wantedly.com/companies/storyandco" target="_blank" rel="noopener noreferrer">
          <CommonButton
            buttonText="Wantedlyで募集を見る"
            className='px-[20px] pt-[26px] pb-[28px] md:px-[40px] md:pt-[28px] md:pb-[30px] border-y border-[#2d2a24] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[14px] md:text-[16px]'
          />
        </a>
      </div>
    </>
  )
}
