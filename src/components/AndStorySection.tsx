'use client'

import { useState } from 'react'

type ClientLogo = {
  name: string
  file: string
}

type AndStorySectionProps = {
  clientLogos: ClientLogo[]
}

const ITEMS_PER_PAGE = 5

export default function AndStorySection({ clientLogos }: AndStorySectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)
  const totalPages = Math.ceil(clientLogos.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const displayedLogos = clientLogos.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  const handlePrev = () => {
    if (!canGoPrev) return
    setCurrentPage((prev) => prev - 1)
  }

  const handleNext = () => {
    if (!canGoNext) return
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <section className="w-fulloverflow-hidden p-[40px]">
      <div className="items-center justify-end flex">
        <span className='flex border border-[#2D2A24] rounded-lg'>
            <button
              name='prev'
              onClick={handlePrev}
              disabled={!canGoPrev}
              onMouseEnter={() => setIsPrevHovered(true)}
              onMouseLeave={() => setIsPrevHovered(false)}
              className={`rounded-lg pl-[16px] pr-[20px] py-[16px] hover:bg-[#18bed7] hover:text-[#FFF] transition-all ${
                !canGoPrev ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img
                src={isPrevHovered ? "/images/clients/arrow-left-white.svg" : "/images/clients/arrow-right.svg"}
                className={!isPrevHovered ? 'translate-x-[1px] rotate-180' : ''}
              />
            </button>
            <button
              name='next'
              onClick={handleNext}
              disabled={!canGoNext}
              onMouseEnter={() => setIsNextHovered(true)}
              onMouseLeave={() => setIsNextHovered(false)}
              className={`rounded-lg hover:bg-[#18bed7] hover:text-[#FFF] pl-[20px] pr-[16px] py-[16px]   transition-all ${
                !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img
                src={isNextHovered ? "/images/clients/arrow-left-white.svg" : "/images/clients/arrow-right.svg"}
                className={isNextHovered ? 'translate-x-[1px] rotate-180' : ''}
              />
            </button>
        </span>
      </div>
      <div className="grid grid-cols-5 pt-[18px] pb-[80px]">
        {displayedLogos.map((logo, i) => (
          <div
            key={`${logo.name}-${startIndex + i}`}
            className="shrink-0 flex items-center justify-center col-span-1 max-h-[200px] py-[40px]"
          >
            <img
              src={`/images/clients/${logo.file}`}
              alt={logo.name}
              className="max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
