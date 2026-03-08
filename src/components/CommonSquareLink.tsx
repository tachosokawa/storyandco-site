'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CommonSquareLinkProps {
  linkText: string
  href?: string
  className?: string
}

export default function CommonSquareLink({ 
  linkText, 
  href = '/company',
  className = 'px-[40px] pt-[28px] pb-[30px] border-t border-[#2D2A24] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]'
}: CommonSquareLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="inline-flex w-full items-center transition-colors group transition-all justify-between font-bold"
      >
        {linkText}
        <img src={isHovered ? "/images/clients/arrow-square-white.svg" : "/images/clients/arrow-square.svg"} alt="arrow"/>
      </Link>
    </div>
  )
}
