'use client'

import Link from 'next/link'

interface CommonSquareLinkProps {
  linkText: string
  href?: string
  className?: string
}

export default function CommonSquareLink({
  linkText,
  href = '/company',
  className = 'border-t border-[#2d2a24] text-[14px] md:text-[16px]'
}: CommonSquareLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === '/recruit') {
      e.preventDefault()
      window.location.href = 'https://www.wantedly.com/companies/storyandco'
    }
  }

  return (
    <div className={className}>
      <Link
        href={href}
        onClick={handleClick}
        className="group flex w-full items-center transition-colors transition-all justify-between font-bold px-[20px] md:px-[40px] pt-[24px] md:pt-[28px] pb-[25px] md:pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer"
      >
        {linkText}
        <img src="/images/clients/arrow-square.svg" alt="" className='group-hover:hidden' loading="lazy" />
        <img src="/images/clients/arrow-square-white.svg" alt="" className='hidden group-hover:block' loading="lazy" />
      </Link>
    </div>
  )
}
