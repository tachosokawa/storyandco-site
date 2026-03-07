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
    <section className="py-4 max-w-[1600px] mx-auto overflow-hidden">
      <div className="items-center justify-end flex">
        <span className="flex">
          <button
            name="prev"
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`border-l border-t border-b border-[#2D2A24] rounded-lg px-4 py-1 hover:bg-[#2D2A24] hover:text-[#F5F0E8] rounded-tr-none rounded-br-none transition-all ${
              !canGoPrev ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &lt;
          </button>
          <button
            name="next"
            onClick={handleNext}
            disabled={!canGoNext}
            className={`border-r border-t border-b border-[#2D2A24] rounded-lg px-4 py-1 hover:bg-[#2D2A24] hover:text-[#F5F0E8] rounded-tl-none rounded-bl-none transition-all ${
              !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &gt;
          </button>
        </span>
      </div>
      <div className="grid grid-cols-5 pt-10 pb-20">
        {displayedLogos.map((logo, i) => (
          <div
            key={`${logo.name}-${startIndex + i}`}
            className="shrink-0 flex items-center justify-center col-span-1"
          >
            <img
              src={`/images/clients/${logo.file}`}
              alt={logo.name}
              className="max-h-65 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
