'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LoadMoreLinkProps {
  linkText: string
  href?: string
  className?: string
  onClick?: () => void
}

export default function LoadMoreLink({ 
  linkText, 
  href = '/company',
  className = 'px-[40px] pt-[28px] pb-[30px] border-t border-[#2d2a24] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]',
  onClick
}: LoadMoreLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const content = (
    <div className="inline-flex w-full items-center transition-colors group transition-all justify-between font-bold">
      {linkText}
      <img src={isHovered ? "/images/clients/arrow-long-right-white.svg" : "/images/clients/arrow-long-right.svg"} alt="arrow" className="rotate-90"/>
    </div>
  )
  
  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {onClick ? (
        <div className="cursor-pointer">
          {content}
        </div>
      ) : (
        <Link href={href}>
          {content}
        </Link>
      )}
    </div>
  )
}
