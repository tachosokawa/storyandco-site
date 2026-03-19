import CompanyLink from '@/components/CompanyLink'

export default function AboutSection() {
  return (
    <section className="w-full">
      <div className='border-t border-b border-[#2d2a24] grid grid-cols-1 lg:grid-cols-9'>
        <div className='border-r-0 lg:border-r border-[#2d2a24] col-span-1 lg:col-span-4'>
          <div className='border-b border-[#2d2a24] py-[28px] px-4 md:p-6 lg:p-[40px]'>
            <h2 className="text-[48px] md:text-6xl lg:text-[96px] font-semibold text-[#333] font-poppins leading-[1] tracking-[-0.04em] flex justify-start">About our business</h2>
          </div>
          <div className='border-b border-[#2d2a24] pt-3 md:pt-[17px] pb-3 md:pb-[19px] px-4 md:px-[40px] lg:px-[40px]'>
            <p className="text-sm md:text-base lg:text-[16px] font-medium text-[#333] tracking-[0.04em] font-sans" style={{ lineHeight: '2' }}>会社のこと</p>
          </div>
          <div className='border-b border-[#2d2a24] py-8 md:py-12 lg:py-[115px] px-4 md:px-6 lg:px-[40px] text-[#333]'>
            <p className="text-lg md:text-xl lg:text-[24px] font-bold mb-4 md:mb-6 lg:mb-8" style={{ lineHeight: '2' }}>
              体験をデザインすることで人生に出会いと変化をもたらし、新しい物語を生み出す企業です。
            </p>
            <p className="text-sm md:text-base lg:text-[16px] font-medium text-[#333] tracking-[0.04em] font-sans" style={{ lineHeight: '2' }}>
              情報が飽和し、結果的に近しい人たちの口コミやSNSでのリアルな情報が信じられるようになった時代。従来のマーケティング手法では集客や興味喚起が困難となり、また買ってもらって終わりではなく、そこから始まるファン化・コミュニティ化の道のりが見えない。そんな課題に対して、従来の「モノ(商品)」と「コト(体験)」に加え、STORY&Co.は「プラットフォーム事業」「コミュニティ事業」「ソリューション事業」の3分野から、企業と顧客の新しいストーリーが生まれる体験を提供。楽しそうじゃない「モノゴト」も、自分が体験すると「物語」になる。出会いと変化の物語をこれからも作り続けます。</p>
          </div>
          <CompanyLink className='border-b border-[#2d2a24] md:border-b-0'/>
        </div>
        <div className="flex items-center justify-center py-[80px] px-[20px] md:p-[40px] lg:p-[40px] col-span-1 lg:col-span-5 md:col-span-5">
          <img src="/images/clients/about.webp" alt="About Us" className='md:w-[846px] w-full' height="auto"/>
        </div>
      </div>
    </section>
  )
}
