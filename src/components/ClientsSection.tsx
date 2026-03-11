'use client'

import { useState, useEffect, useRef } from 'react'

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

const ROWS = 3
const COLUMNS_VISIBLE = 5
const AUTO_SLIDE_INTERVAL = 3000 // 3 seconds

export default function ClientsSection() {
  // Organize original logos into columns first
  const originalColumns: (typeof clientLogos[number])[][] = []
  for (let i = 0; i < clientLogos.length; i += ROWS) {
    originalColumns.push(clientLogos.slice(i, i + ROWS))
  }
  const originalColumnCount = originalColumns.length
  
  // Duplicate columns for seamless infinite loop (need at least 2 sets)
  const columns = [...originalColumns, ...originalColumns, ...originalColumns]
  const totalColumns = columns.length
  
  const [currentColumn, setCurrentColumn] = useState(originalColumnCount)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  const handlePrev = () => {
    setCurrentColumn((prev) => {
      if (prev <= originalColumnCount) {
        // Jump to the end of the duplicate set (same content as start)
        return originalColumnCount * 2 - 1
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentColumn((prev) => {
      return prev + 1
    })
  }

  // Handle seamless reset when reaching the boundary
  useEffect(() => {
    if (currentColumn >= originalColumnCount * 2) {
      // We've scrolled past the second duplicate, reset to the first duplicate (same content)
      setIsTransitioning(false)
      const resetTimeout = setTimeout(() => {
        setCurrentColumn(originalColumnCount)
        setTimeout(() => {
          setIsTransitioning(true)
        }, 50)
      }, 50)
      return () => clearTimeout(resetTimeout)
    }
  }, [currentColumn, originalColumnCount])

  // Auto-slide functionality - move one column at a time with seamless loop
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrentColumn((prev) => {
        return prev + 1
      })
    }, AUTO_SLIDE_INTERVAL)

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current)
      }
    }
  }, [])

  const canGoPrev = true // Always allow prev for infinite loop
  const canGoNext = true // Always allow next for infinite loop

  return (
    <section className="border-b border-[#2d2d2d]">
      <div className="px-[40px] border-b border-[#2d2d2d] flex items-center justify-between h-[96px]">
        <div className='flex items-center pr-[40px] border-r border-[#2d2d2d] h-full'>
          <p className="text-[40px] text-[#333] font-semibold font-poppins tracking-[-0.04em] leading-[1]">Our clients</p>
        </div>
        <div className='flex items-center justify-end h-full'>
          <span className='flex mr-[40px] border border-[#2d2d2d] rounded-lg'>
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
          <div className='w-[1px] h-full bg-[#2d2d2d]'></div>
          <p className='text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] font-sans pl-[40px]'>お取引企業</p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentColumn * (100 / COLUMNS_VISIBLE)}%)` }}
        >
          {columns.map((columnLogos, columnIndex) => {
            return (
              <div 
                key={columnIndex}
                className="flex flex-col shrink-0"
                style={{ width: `${100 / COLUMNS_VISIBLE}%` }}
              >
                {Array.from({ length: ROWS }).map((_, rowIndex) => {
                  const logo = columnLogos[rowIndex]
                  const isFinalRow = rowIndex === ROWS - 1
                  const isFinalColumn = columnIndex % COLUMNS_VISIBLE === COLUMNS_VISIBLE - 1
                  const shouldRemoveClass = isFinalRow
                  
                  return (
                    <div
                      key={`${columnIndex}-${rowIndex}`}
                      className={`shrink-0 flex items-center justify-center h-[200px] relative ${shouldRemoveClass ? '' : 'client-logo-item'}`}
                    >
                      {logo && (
                        <img
                          src={`/images/clients/${logo.file}`}
                          alt={logo.name}
                          className="max-h-65 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
