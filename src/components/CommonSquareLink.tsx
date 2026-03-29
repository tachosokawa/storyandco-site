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
  className = 'border-t border-[#2d2a24] text-[14px] md:text-[16px]'
}: CommonSquareLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === '/recruit') {
      e.preventDefault()
      window.location.href = 'https://www.wantedly.com/companies/storyandco'
    }
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="flex w-full items-center transition-colors group transition-all justify-between font-bold px-[20px] md:px-[40px] pt-[24px] md:pt-[28px] pb-[25px] md:pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer"
      >
        {linkText}
        <img src={isHovered ? "/images/clients/arrow-square-white.svg" : "/images/clients/arrow-square.svg"} alt="arrow"/>
      </Link>
    </div>
  )
}
