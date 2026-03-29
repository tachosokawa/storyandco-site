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
  className = 'border-t border-[#2d2a24] text-[16px]',
  onClick
}: LoadMoreLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div className="flex w-full items-center transition-colors group transition-all justify-between font-bold">
      {linkText}
      <img src={isHovered ? "/images/clients/arrow-long-right-white.svg" : "/images/clients/arrow-long-right.svg"} alt="arrow" className="rotate-90"/>
    </div>
  )

  const interactiveClass = "block px-[40px] pt-[28px] pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer"

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {onClick ? (
        <div className={interactiveClass} onClick={onClick}>
          {content}
        </div>
      ) : (
        <Link href={href} className={interactiveClass}>
          {content}
        </Link>
      )}
    </div>
  )
}
