import Link from 'next/link'

export default function CompanyLink({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href="/company"
        className="group flex w-full items-center gap-2 text-[14px] md:text-[16px] font-medium tracking-[0.04em] leading-[1] md:leading-[2] font-sans hover:gap-4 transition-all justify-between pt-[23px] px-[20px] md:px-[40px] pb-[24px] hover:bg-[#18bed7] text-[#333] hover:text-[#fff] hover:cursor-pointer"
      >
        会社についてもっと知る
        <img className='w-[16px] md:w-[20px] group-hover:hidden' src="/images/clients/arrow-long-right.svg" alt="arrow" width={20} height={12}/>
        <img className='w-[16px] md:w-[20px] hidden group-hover:block' src="/images/clients/arrow-long-right-white.svg" alt="arrow" width={20} height={12}/>
      </Link>
    </div>
  )
}
