'use client'

import { useState } from 'react'

interface CommonButtonProps {
  buttonText: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function CommonButton({
  buttonText,
  type,
  className = 'px-[40px] pt-[28px] pb-[30px] border-t border-[#2d2a24] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]'
}: CommonButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <button
      type={type || 'button'}
      className={`${className} inline-flex w-full items-center transition-all justify-between font-bold`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {buttonText}
      <img src={isHovered ? "/images/clients/arrow-long-right-white.svg" : "/images/clients/arrow-long-right.svg"} alt="arrow" className='w-[16px] md:w-[20px]'/>
    </button>
  )
}
