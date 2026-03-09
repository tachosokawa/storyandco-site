export default function ServicesMarqueeSection() {
  return (
    <section className="w-full border-b border-[#2d2a24] overflow-hidden pt-6 md:pt-8 lg:pt-[44px] pb-4 md:pb-6 lg:pb-[36px]">
      <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap">
        {['Our Services', 'Our Services', 'Our Services', 'Our Services', 'Our Services', 'Our Services'].map((t, i) => (
          <span key={i} className="font-poppins font-semibold text-4xl md:text-6xl lg:text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
        ))}
      </div>
    </section>
  )
}
