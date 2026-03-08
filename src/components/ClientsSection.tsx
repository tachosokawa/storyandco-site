'use client'

import { useState } from 'react'

const clientLogos = [
  { name: 'adidas', file: 'adidas.svg' },
  { name: 'ADORE', file: 'adore.svg' },
  { name: 'allbirds', file: 'allbirds.svg' },
  { name: 'asahikawa', file: 'asahikawa.svg' },
  { name: 'ASICS', file: 'asics.svg' },
  { name: 'Brother', file: 'brother.svg' },
  { name: 'Coleman', file: 'coleman.svg' },
  { name: 'DESCENTE', file: 'descant.svg' },
  { name: 'kakimori', file: 'kakimori.svg' },
  { name: 'KEEN', file: 'keen.svg' },
  { name: 'KITAGAS', file: 'kitagus.svg' },
  { name: 'le coq sportif', file: 'lecoq.svg' },
  { name: 'Marubeni', file: 'marubeni.svg' },
  { name: 'MARGARET HOWELL', file: 'mh.svg' },
  { name: 'minne', file: 'minne.svg' },
  { name: 'NATURAL BEAUTY BASIC', file: 'naturalbasics.svg' },
  { name: 'New Balance', file: 'newbalance.svg' },
  { name: 'OLD ENGLAND', file: 'oldengland.svg' },
  { name: 'Osaka Metro Group', file: 'osakametro.svg' },
  { name: 'SMBC 三井住友カード', file: 'smbc.svg' },
  { name: 'Teva', file: 'teva.svg' },
  { name: '東京メトロ', file: 'tokyometro.svg' },
  { name: '東急不動産', file: 'tokyu.svg' },
  { name: 'WHOLE EARTH', file: 'wholeearth.svg' },
  { name: 'SUPER SPORTS XEBIO', file: 'xebio.svg' },
  { name: 'YKK', file: 'ykk.svg' },
]

const ITEMS_PER_PAGE = 15

export default function ClientsSection() {
  const allLogos = [...clientLogos, ...clientLogos]
  const totalPages = Math.ceil(allLogos.length / ITEMS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const displayedLogos = allLogos.slice(startIndex, endIndex)

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  return (
    <section className="border-b border-[#2D2A24]">
      <div className="px-[40px] border-b border-[#2D2A24] flex items-center justify-between h-[96px]">
        <div className='flex items-center pr-[40px] border-r border-[#2D2A24] h-full'>
          <p className="text-[40px] text-[#333] font-semibold font-poppins tracking-[-0.04em] leading-[1]">Our clients</p>
        </div>
        <div className='flex items-center justify-end h-full'>
          <span className='flex mr-[40px] border border-[#2D2A24] rounded-lg'>
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
              className={`rounded-lg hover:bg-[#18bed7] hover:text-[#FFFDF7] pl-[20px] pr-[16px] py-[16px]   transition-all ${
                !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img
                src={isNextHovered ? "/images/clients/arrow-left-white.svg" : "/images/clients/arrow-right.svg"}
                className={isNextHovered ? 'translate-x-[1px] rotate-180' : ''}
              />
            </button>
          </span>
          <div className='w-[1px] h-full bg-[#2D2A24]'></div>
          <p className='text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] font-sans pl-[40px]'>お取引企業</p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="grid grid-cols-5 items-center justify-center">
          {displayedLogos.map((logo, i) => {
            const isFinalRow = i >= displayedLogos.length - 5
            const isFinalColumn = i % 5 === 4
            const shouldRemoveClass = isFinalRow || isFinalColumn
            return (
            <div
              key={`${logo.name}-${startIndex + i}`}
              className={`shrink-0 flex items-center justify-center col-span-1 h-[200px] relative ${shouldRemoveClass ? '' : 'client-logo-item'}`}
            >
              <img
                src={`/images/clients/${logo.file}`}
                alt={logo.name}
                className="max-h-65 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
