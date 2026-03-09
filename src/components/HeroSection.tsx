export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-[#00B8CC] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-[#8B5CF6] blur-3xl" />
      </div>
      <div className="relative w-full pt-16 md:pt-32 lg:pt-[224px] px-4 md:px-6 lg:px-[40px]">
        <p className="font-sans text-lg md:text-2xl lg:text-[32px] font-bold text-[#333] mb-2 md:mb-3 text-center md:text-right tracking-[0.04em]">体験を通じて、新しい物語を生み出す。</p>
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[188px] [-webkit-text-stroke:1px_#2d2a24] md:[-webkit-text-stroke:2px_#2d2a24] font-semibold leading-[100%] tracking-[-4%] text-center md:text-right">
          <span id="mv-colorful1">N</span>
          <span id="mv-colorful2">e</span>
          <span id="mv-colorful3">w </span>
          <span id="mv-colorful4">E</span>
          <span id="mv-colorful5">n</span>
          <span id="mv-colorful6">c</span>
          <span id="mv-colorful7">o</span>
          <span id="mv-colorful8">u</span>
          <span id="mv-colorful9">n</span>
          <span id="mv-colorful10">t</span>
          <span id="mv-colorful11">e</span>
          <span id="mv-colorful12">r</span>
          <span id="mv-colorful13">s</span>
          <span id="mv-colorful14">,</span>
          <br />
          <span id="mv-colorful15">N</span>
          <span id="mv-colorful16">e</span>
          <span id="mv-colorful17">w </span>
          <span id="mv-colorful18">S</span>
          <span id="mv-colorful19">t</span>
          <span id="mv-colorful20">o</span>
          <span id="mv-colorful21">r</span>
          <span id="mv-colorful22">i</span>
          <span id="mv-colorful23">e</span>
          <span id="mv-colorful24">s</span>
          <span id="mv-colorful25">.</span>
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-2 text-sm text-[#2d2a24] mt-8 md:mt-16 lg:mt-[165px] pb-8 md:pb-16 lg:pb-[120px] px-4 md:px-6 lg:px-0">
        <div className="inline-flex items-center gap-2 text-sm md:text-[16px] font-medium pl-0 md:pl-[40px] pt-4 md:pt-12">
          <svg className="w-5 h-5 md:w-6 md:h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v8m0 0l-3-3m3 3l3-3" />
          </svg>
          <span className="hidden md:inline">Scroll down to explore</span>
          <span className="md:hidden">Scroll</span>
        </div>
        <div className="inline-flex items-center border-l border-t border-b border-r md:border-r-0 border-[#2d2a24] rounded-lg md:rounded-tr-none md:rounded-br-none h-auto md:h-[74px] w-full md:w-[55%] ml-0 md:ml-auto py-2 md:py-0">
          <p className='px-3 md:px-[24px] font-bold text-sm md:text-[16px] whitespace-nowrap'>2026.01.07</p>
          <div className='border-r border-[#2d2a24] h-full hidden md:block'></div>
          <div className="flex-1 overflow-hidden">
            <p id="mv-news-loop-area" className='font-bold text-xs md:text-[16px] whitespace-nowrap'>重要なお知らせなどの最新ニュースが一件入ります。重要なお知らせなどの最新ニュースが一件入ります。重要なお知らせなどの最新ニュースが一件入ります。</p>
          </div>
        </div>
      </div>
    </section>
  )
}
