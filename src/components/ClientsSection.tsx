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
    <section className="max-w-[1600px] mx-auto border-b border-[#2D2A24]">
      <div className="px-4 border-b border-[#2D2A24] grid grid-cols-12 items-center">
        <div className='col-span-2 py-4'>
          <p className="text-[40px] font-medium text-[#2D2A24]">Our clients</p>
        </div>
        <div className='col-span-9 border-l border-r border-[#2D2A24] h-full flex items-center justify-end pr-4 py-4'>
          <span className='flex'>
            <button
              name='prev'
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`border-l border-t border-b border-[#2D2A24] rounded-lg px-4 py-1 hover:bg-[#2D2A24] hover:text-[#F5F0E8] rounded-tr-none rounded-br-none transition-all ${
                !canGoPrev ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              &lt;
            </button>
            <button
              name='next'
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
        <div className='col-span-1 items-center justify-center pl-4 py-4'>
          <p>お取引企業</p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="grid grid-cols-5 items-center justify-center">
          {displayedLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${startIndex + i}`}
              className="shrink-0 flex items-center justify-center col-span-1 h-[200px]"
            >
              <img
                src={`/images/clients/${logo.file}`}
                alt={logo.name}
                className="max-h-65 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
