'use client'

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
  const content = (
    <div className="flex w-full items-center transition-colors group transition-all justify-between font-bold">
      {linkText}
      <img src="/images/clients/arrow-long-right.svg" alt="arrow" className="rotate-90 group-hover:hidden" width={20} height={12} />
      <img src="/images/clients/arrow-long-right-white.svg" alt="arrow" className="rotate-90 hidden group-hover:block" width={20} height={12} />
    </div>
  )

  const interactiveClass = "group block px-[40px] pt-[28px] pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer"

  return (
    <div className={className}>
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
