'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CompanyLink() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div 
      className='pt-[23px] px-[40px] pb-[24px] hover:bg-[#18bed7] text-[#333] hover:text-[#fff] hover:cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href="/company"
        className="inline-flex w-full items-center gap-2 text-[16px] font-medium tracking-[0.04em] leading-[2] flex justify-start font-sans hover:gap-4 transition-all justify-between"
      >
        会社についてもっと知る
        <img src={isHovered ? "/images/clients/arrow-long-right-white.svg" : "/images/clients/arrow-long-right.svg"} alt="arrow"/>
      </Link>
    </div>
  )
}
