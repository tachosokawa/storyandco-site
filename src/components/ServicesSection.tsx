import Image from 'next/image'
import CommonLink from '@/components/CommonLink'

export default function ServicesSection() {
  return (
    <section className="w-full">
      <div className='grid grid-cols-1 lg:grid-cols-5'>
        <div className='col-span-1 lg:col-span-5 border-b border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] px-4 md:px-6 lg:px-[40px]'>
          <p className="text-sm md:text-base lg:text-[16px] font-sans font-medium text-[#2d2a24]" style={{ lineHeight: '2' }}>事業のこと</p>
        </div>
        <div className='col-span-1 lg:col-span-2 border-b lg:border-r border-[#2d2a24] pt-[64px] pb-[80px] md:pt-6 lg:pt-[40px] md:pb-6 lg:pb-[40px] px-4 md:px-6 lg:px-[40px]'>
          <p className='font-poppins text-xs md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 01 )</p>
          <div className='pl-0 md:pl-8 lg:pl-[95px] pt-6 md:pt-10 lg:pt-[80px] md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans' style={{ lineHeight: '2' }}>
            <h3 className='md:pb-3 lg:pb-4 font-bold text-[22px] md:text-2xl lg:text-[32px] tracking-[0.04em]'>プラットフォーム事業</h3>
            <p className='pt-4 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>STORY &Co.で運営</p>
            <p className='pt-8 md:py-6 lg:py-10 font-medium text-sm md:text-base lg:text-[16px] text-[#333]' style={{ lineHeight: '2' }}>オンラインとリアルをつなぎ、「体験」と「コミュニティ」を通じた出会いの場を運営。つくる人、届ける人、届く人が自然と出会い、そこから新しい物語が生まれる場をつくっています。</p>
          </div>
        </div>
        <div className='col-span-1 lg:col-span-3 border-b border-[#2d2a24]'>
          <div className='pt-[40px] pb-[56px] px-[20px] md:p-12 lg:p-[120px] md:border-b border-[#2d2a24]'>
            <Image className="md:w-full w-[120px] md:w-[206px] md:max-w-[206px] h-auto" src="https://images.microcms-assets.io/assets/b7173caec40641b9b66105a1a9e7dc30/6d4125664d4942dea31391f598898daf/P%26P_emblem_rgb.png" alt="PATCH&PLAY" width={206} height={227} sizes="(max-width: 768px) 120px, 206px" />
            <p className='pt-6 md:pt-6 lg:pt-10 font-sans text-[12px] md:text-lg lg:text-[20px] font-medium text-[#333]' style={{ lineHeight: '2' }}>PATCH&PLAYは、"すき"の気持ちをきっかけに、身のまわりのモノを、もう一度遊ぶようにたのしむ「ワッペンとお直しのお店」です。</p>
          </div>
          <CommonLink linkText="PATCH&PLAYについて知る" href="/service/patchandplay" />
          <div className='pt-[40px] pb-[56px] px-[20px] md:p-12 lg:p-[120px] border-t md:border-b border-[#2d2a24]'>
            <Image className="md:w-full w-[150px] md:w-[300px] md:max-w-[300px] h-auto" src="/images/clients/and_story.webp" alt="AND STORY" width={300} height={72} sizes="(max-width: 768px) 150px, 300px" />
            <p className='pt-6 md:pt-6 lg:pt-10 font-sans text-[12px] md:text-lg lg:text-[20px] font-medium text-[#333]' style={{ lineHeight: '2' }}>目には見えないけれど価値がある「体験」や「コミュニティ」と出会えるWebプラットフォームです。</p>
          </div>
          <CommonLink linkText="AND STORYについて知る" href="/service/andstory" />
        </div>
        <div className='col-span-1 lg:col-span-2 border-b lg:border-r md:border-b border-[#2d2a24] pt-[64px] pb-[80px] md:pt-6 lg:pt-[40px] px-[20px] md:px-[40px] lg:px-[40px]'>
          <p className='font-poppins text-[14px] md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 02 )</p>
          <div className='pl-0 md:pl-8 lg:pl-[95px] pt-6 md:pt-10 lg:pt-[80px] md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans' style={{ lineHeight: '2' }}>
            <h3 className='pb-1 md:pb-3 lg:pb-4 font-bold text-[22px] md:text-2xl lg:text-[32px] tracking-[0.04em]'>コミュニティ事業</h3>
            <p className='pt-4 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>STORY &Co.で運営</p>
            <p className='pt-10 md:py-6 lg:py-10 font-medium text-sm md:text-base lg:text-[16px] text-[#333]' style={{ lineHeight: '2' }}>企業と個人の共創の場をつくり、クリエイティブの力で社会課題に向き合うコミュニティを育てています。</p>
          </div>
        </div>
        <div className='col-span-1 lg:col-span-3 border-b border-[#2d2a24] flex flex-col'>
          <div className='pt-[40px] pb-[56px] px-[20px] md:p-12 lg:p-[120px] md:border-b border-[#2d2a24] flex-1'>
            <Image className="md:w-full w-[150px] md:w-[300px] md:max-w-[300px] h-auto" src="/images/clients/newmake.svg" alt="NewMake" width={300} height={72} sizes="(max-width: 768px) 150px, 300px" />
            <p className='pt-6 md:pt-6 lg:pt-10 font-sans text-[12px] md:text-lg lg:text-[20px] font-medium text-[#333]' style={{ lineHeight: '2' }}>クリエイティブの力で社会課題を解決するコミュニティです。</p>
          </div>
          <div className='mt-auto'>
            <CommonLink linkText="NewMakeについて知る" href="/service/newmake" />
          </div>
        </div>
        <div className='col-span-1 lg:col-span-2 border-b lg:border-r border-[#2d2a24] pt-[64px] pb-[80px] md:pt-6 lg:pt-[40px] px-[20px] md:px-[40px] lg:px-[40px]'>
          <p className='font-poppins text-[14px] md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 03 )</p>
          <div className='pl-0 md:pl-8 lg:pl-[95px] pt-6 md:pt-10 lg:pt-[80px] md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans' style={{ lineHeight: '2' }}>
            <h3 className='md:pb-3 lg:pb-4 font-bold text-[22px] md:text-2xl lg:text-[32px] tracking-[0.04em]'>ソリューション事業</h3>
            <p className='pt-5 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>課題解決を提供</p>
            <p className='pt-9 md:py-6 lg:py-10 font-medium text-sm md:text-base lg:text-[16px] text-[#333]' style={{ lineHeight: '2' }}>企業や自治体の課題に応じて、人の心を動かす体験やコミュニティをデザインしています。</p>
          </div>
        </div>
        <div className='col-span-1 lg:col-span-3 border-b border-[#2d2a24]'>
          <div className='pt-[40px] pb-[56px] px-[20px] md:p-12 lg:p-[120px] md:border-b border-[#2d2a24]'>
            <p className='font-sans text-[18px] md:text-xl lg:text-[24px] font-bold text-[#333]' style={{ lineHeight: '2' }}>コミュニティ開発</p>
            <p className='pt-6 md:pt-6 lg:pt-10 font-sans text-[12px] md:text-lg lg:text-[20px] font-medium text-[#333]' style={{ lineHeight: '2' }}>ブランド・サービスの認知からファン化までを行うコミュニティづくりをデザインしています。</p>
          </div>
          <CommonLink linkText="コミュニティ開発について知る" href="/service/community" />
          <div className='pt-[40px] pb-[56px] px-[20px] md:p-12 lg:p-[120px] border-t md:border-b border-[#2d2a24]'>
            <p className='font-sans text-[18px] md:text-xl lg:text-[24px] font-bold text-[#333]' style={{ lineHeight: '2' }}>地域・イベントプロデュース</p>
            <p className='pt-6 md:pt-6 lg:pt-10 font-sans text-[12px] md:text-lg lg:text-[20px] font-medium text-[#333]' style={{ lineHeight: '2' }}>地域資源を活かし、街と人が繋がる、その街ならではの唯一無二の出会いと交流の場を創出します。</p>
          </div>
          <CommonLink linkText="地域・イベントプロデュースについて知る" href="/service/event" />
          <div className='pt-[40px] pb-[56px] px-[20px] md:p-12 lg:p-[120px] border-t border-[#2d2a24] md:border-b'>
            <p className='font-sans text-[18px] md:text-xl lg:text-[24px] font-bold text-[#333]' style={{ lineHeight: '2' }}>SDGs推進支援</p>
            <p className='pt-6 md:pt-6 lg:pt-10 font-sans text-[12px] md:text-lg lg:text-[20px] font-medium text-[#333]' style={{ lineHeight: '2' }}>やらなくてはいけないからではなく、ビジネスにも社会にも良いSDGs活動をデザインしています。</p>
          </div>
          <CommonLink linkText="SDGs推進支援について知る" href="/service/sdgs" />
        </div>
      </div>
    </section>
  )
}
