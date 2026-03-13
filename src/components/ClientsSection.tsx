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
const COLUMNS_VISIBLE_DESKTOP = 5
const COLUMNS_VISIBLE_MOBILE = 2.5
const AUTO_SLIDE_INTERVAL = 3000 // 3 seconds

export default function ClientsSection() {
  const [columnsVisible, setColumnsVisible] = useState(COLUMNS_VISIBLE_DESKTOP)
  const [isMobile, setIsMobile] = useState(false)

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)
  const THUMB_WIDTH = 12 // Fixed thumb width in pixels

  // Check if we're on mobile and set columns visible accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setColumnsVisible(mobile ? COLUMNS_VISIBLE_MOBILE : COLUMNS_VISIBLE_DESKTOP)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

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

  // Auto-slide functionality - move one column at a time with seamless loop (desktop only)
  useEffect(() => {
    if (isMobile) {
      return // Don't auto-slide on mobile
    }

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
  }, [isMobile])

  // Track scroll position for mobile scrollbar
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const updateScrollProgress = () => {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
      setScrollProgress(progress)
      
      // Update scrollbar width for thumb positioning
      if (scrollbarRef.current) {
        setScrollbarWidth(scrollbarRef.current.offsetWidth)
      }
      
      // Show scrollbar only if content is scrollable
      setShowScrollbar(scrollWidth > clientWidth)
    }

    container.addEventListener('scroll', updateScrollProgress)
    const resizeObserver = new ResizeObserver(updateScrollProgress)
    resizeObserver.observe(container)
    
    // Also observe scrollbar width changes
    let scrollbarResizeObserver: ResizeObserver | null = null
    if (scrollbarRef.current) {
      scrollbarResizeObserver = new ResizeObserver(updateScrollProgress)
      scrollbarResizeObserver.observe(scrollbarRef.current)
    }
    
    updateScrollProgress() // Initial calculation

    return () => {
      container.removeEventListener('scroll', updateScrollProgress)
      resizeObserver.disconnect()
      if (scrollbarResizeObserver) {
        scrollbarResizeObserver.disconnect()
      }
    }
  }, [isMobile])

  // Track scrollbar width when it becomes available
  useEffect(() => {
    if (!isMobile || !showScrollbar || !scrollbarRef.current) return

    const updateScrollbarWidth = () => {
      if (scrollbarRef.current) {
        setScrollbarWidth(scrollbarRef.current.offsetWidth)
      }
    }

    updateScrollbarWidth()
    const resizeObserver = new ResizeObserver(updateScrollbarWidth)
    resizeObserver.observe(scrollbarRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [isMobile, showScrollbar])

  // Handle scrollbar drag (mouse and touch)
  const handleScrollbarStart = (clientX: number) => {
    if (!isMobile || !scrollContainerRef.current || !scrollbarRef.current) return
    
    setIsDragging(true)
    const scrollbar = scrollbarRef.current
    const container = scrollContainerRef.current
    const scrollbarRect = scrollbar.getBoundingClientRect()
    const startX = clientX
    const startScrollLeft = container.scrollLeft
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    const maxScroll = scrollWidth - clientWidth
    const scrollbarWidth = scrollbarRect.width

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const deltaX = currentX - startX
      const scrollRatio = maxScroll / (scrollbarWidth - THUMB_WIDTH)
      const newScrollLeft = startScrollLeft + deltaX * scrollRatio
      container.scrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft))
    }

    const handleEnd = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMove as EventListener)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove as EventListener)
      document.removeEventListener('touchend', handleEnd)
    }

    document.addEventListener('mousemove', handleMove as EventListener)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove as EventListener, { passive: false })
    document.addEventListener('touchend', handleEnd)
  }

  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleScrollbarStart(e.clientX)
  }

  const handleScrollbarTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    handleScrollbarStart(e.touches[0].clientX)
  }

  const canGoPrev = true // Always allow prev for infinite loop
  const canGoNext = true // Always allow next for infinite loop

  return (
    <section className="border-b border-[#2d2a24]">
      <div className="border-b border-[#2d2a24] block md:flex items-center justify-between h-[96px]">
        <div className='px-[20px] md:px-[40px] flex items-center pr-[40px] border-r-0 md:border-r border-[#2d2a24] h-full'>
          <p className="text-[36px] md:text-[40px] text-[#333] font-semibold font-poppins tracking-[-0.04em] leading-[1]">Our clients</p>
        </div>
        <div className='px-[20px] md:px-[40px] pt-[12px] md:pt-0 pb-[16px] md:pb-0 flex items-center justify-start md:justify-end md:h-full border-b border-[#2d2a24] md:border-b-0'>
          <span className='hidden md:flex mr-[40px] border border-[#2d2a24] rounded-lg'>
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
          <div className='hidden md:block w-[1px] h-full bg-[#2d2a24]'></div>
          <p className='text-[12px] md:text-[16px] font-medium text-[#333] tracking-[0.04em] leading-[2] font-sans pl-0 md:pl-[40px]'>お取引企業</p>
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden md:overflow-hidden scrollbar-hide-mobile"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          className={`pt-[70px] pb-[20px] md:py-0 flex md:border-b-0 ${isMobile ? '' : (isTransitioning ? 'transition-transform duration-1000 ease-in-out' : '')}`}
          style={isMobile ? {} : { transform: `translateX(-${currentColumn * (100 / columnsVisible)}%)` }}
        >
          {columns.map((columnLogos, columnIndex) => {
            return (
              <div 
                key={columnIndex}
                className="flex flex-col shrink-0"
                style={{ width: `${100 / columnsVisible}%` }}
              >
                {Array.from({ length: ROWS }).map((_, rowIndex) => {
                  const logo = columnLogos[rowIndex]
                  const isFinalRow = rowIndex === ROWS - 1
                  const isFinalColumn = columnIndex % columnsVisible === columnsVisible - 1
                  const shouldRemoveClass = isFinalRow
                  
                  return (
                    <div
                      key={`${columnIndex}-${rowIndex}`}
                      className={`shrink-0 flex items-center justify-center h-[100px] md:h-[200px] w-[152px] relative ${shouldRemoveClass ? '' : 'client-logo-item'}`}
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
      {/* Custom scrollbar for mobile only */}
      {isMobile && showScrollbar && (
        <div className="md:hidden px-[20px] py-[34px] border-t border-[#2d2a24]">
          <div 
            ref={scrollbarRef}
            className="relative h-[1px] bg-[#2d2a24] rounded-full cursor-pointer select-none"
            onMouseDown={handleScrollbarMouseDown}
            onTouchStart={handleScrollbarTouchStart}
          >
            <div
              className={`absolute aspect-square bg-[#2d2a24] rounded-full ${isDragging ? '' : 'transition-all duration-100'}`}
              style={{
                top:'-5px',
                width: `${THUMB_WIDTH}px`,
                left: scrollbarWidth > 0 
                  ? `${scrollProgress * (scrollbarWidth - THUMB_WIDTH)}px`
                  : '0px',
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
