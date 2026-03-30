import Link from 'next/link'

interface CommonLinkProps {
  linkText: string
  href?: string
  className?: string
}

export default function CommonLink({
  linkText,
  href = '/company',
  className = 'border-t border-[#2d2a24] md:border-t-0 text-[14px] md:text-[16px]'
}: CommonLinkProps) {
  return (
    <div className={className}>
      <Link
        href={href}
        className="group flex w-full items-center transition-colors transition-all justify-between font-bold leading-[1] px-[20px] md:px-[40px] pt-[24px] md:pt-[28px] pb-[25px] md:pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer"
      >
        {linkText}
        <img src="/images/clients/arrow-long-right.svg" alt="" className='w-[16px] md:w-[20px] group-hover:hidden' loading="lazy" width={20} height={12} />
        <img src="/images/clients/arrow-long-right-white.svg" alt="" className='w-[16px] md:w-[20px] hidden group-hover:block' loading="lazy" width={20} height={12} />
      </Link>
    </div>
  )
}
