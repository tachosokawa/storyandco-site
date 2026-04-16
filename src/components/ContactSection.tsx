import Link from 'next/link'
import CommonLink from '@/components/CommonLink'

export default function ContactSection() {
  return (
    <section className="w-full text-center border-t border-b border-[#2d2a24] md:px-6 lg:px-0">
      <Link href="/contact">
        <div className="py-[120px] md:py-20 lg:py-[160px] px-[20px] md:px-0 md:border-b border-[#2d2a24]">
          <h2 className="font-poppins text-[56px] sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[160px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center">
            <span id="contact-colorful1">C</span>
            <span id="contact-colorful2">o</span>
            <span id="contact-colorful3">n</span>
            <span id="contact-colorful4">t</span>
            <span id="contact-colorful5">a</span>
            <span id="contact-colorful6">c</span>
            <span id="contact-colorful7">t</span>
          </h2>
          <h2 className="font-sans font-bold text-[16px] md:text-lg lg:text-[20px] tracking-[0.04em] text-center mt-4 md:mt-5 text-[#333]" style={{ lineHeight: '2' }}>お気軽にお問い合わせください</h2>
          <p className="font-sans font-medium text-sm md:text-base lg:text-[16px] tracking-[0.04em] text-[#333] mt-4 md:mt-10 text-left md:mx-auto md:max-w-[700px]" style={{ lineHeight: '2' }}>
          少しでもご興味を持っていただけましたら、何ができるかもこちらで考えてみますので、まずはお問い合わせいただけると幸いです。
          </p>
        </div>
      </Link>
      <CommonLink linkText="お問い合わせ" href="/contact"/>
    </section>
  )
}
