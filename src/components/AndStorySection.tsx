'use client'

import { useState, useEffect, useRef } from 'react'

type ClientLogo = {
  name: string
  file: string
}

const clientLogos: ClientLogo[] = [
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

const COLUMNS_VISIBLE = 5
const AUTO_SLIDE_INTERVAL = 3000 // 3 seconds

export default function AndStorySection() {
  // Duplicate logos for seamless infinite loop
  const allLogos = [...clientLogos, ...clientLogos, ...clientLogos]
  
  // Organize logos into columns (each column has 1 item)
  const columns: ClientLogo[][] = []
  for (let i = 0; i < allLogos.length; i++) {
    columns.push([allLogos[i]])
  }
  
  const originalColumnCount = clientLogos.length
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
    <section className="w-full overflow-hidden p-[40px]">
      <div className="items-center justify-end flex">
        <span className='flex border border-[#2d2a24] rounded-lg'>
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
      <div className="overflow-hidden pt-[18px] pb-[80px]">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentColumn * (100 / COLUMNS_VISIBLE)}%)` }}
        >
          {columns.map((columnLogos, columnIndex) => (
            <div
              key={columnIndex}
              className="shrink-0 flex items-center justify-center"
              style={{ width: `${100 / COLUMNS_VISIBLE}%` }}
            >
              {columnLogos.map((logo, logoIndex) => (
                <div
                  key={`${logo.name}-${columnIndex}-${logoIndex}`}
                  className="w-full flex items-center justify-center max-h-[200px] py-[40px]"
                >
                  <img
                    src={`/images/clients/${logo.file}`}
                    alt={logo.name}
                    className="max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
