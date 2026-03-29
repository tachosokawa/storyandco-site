'use client'

import { useState } from 'react'
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
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="flex w-full items-center transition-colors group transition-all justify-between font-bold leading-[1] px-[20px] md:px-[40px] pt-[24px] md:pt-[28px] pb-[25px] md:pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer"
      >
        {linkText}
        <img src={isHovered ? "/images/clients/arrow-long-right-white.svg" : "/images/clients/arrow-long-right.svg"} alt="arrow" className='w-[16px] md:w-[20px]'/>
      </Link>
    </div>
  )
}
