import CommonLink from '@/components/CommonLink'

export default function ServicesSection() {
  return (
    <section className="w-full">
      <div className='grid grid-cols-1 lg:grid-cols-5'>
        <div className='col-span-1 lg:col-span-5 border-b border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] px-4 md:px-6 lg:px-[40px]'>
          <p className="text-sm md:text-base lg:text-[16px] font-sans font-medium text-[#2d2a24] leading-[2]">事業のこと</p>
        </div>
        <div className='col-span-1 lg:col-span-2 border-b lg:border-r border-[#2d2a24] p-4 md:p-6 lg:p-[40px]'>
          <p className='font-poppins text-xs md:text-sm lg:text-[14px] font-medium text-[#333] leading-[1]'>( 01 )</p>
          <div className='pl-0 md:pl-8 lg:pl-[120px] pt-6 md:pt-10 lg:pt-[80px] pb-6 md:pb-10 lg:pb-[80px] pr-0 md:pr-8 lg:pr-[80px] font-sans leading-[2]'>
            <h3 className='pb-2 md:pb-3 lg:pb-4 font-bold text-xl md:text-2xl lg:text-[32px] tracking-[0.04em]'>プラットフォーム事業</h3>
            <p className='pt-4 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>STORY &Co.で運営</p>
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
            <p className='pt-4 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>STORY &Co.で運営</p>
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
            <p className='pt-4 font-medium text-sm md:text-base lg:text-[16px] text-[#333]'>課題解決を提供</p>
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
  )
}
