'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type ClientLogo = {
  href: string
  src: string
}

const clientLogos: ClientLogo[] = [
  {
    href: 'https://www.andstory.co/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_4b6c0fda-09b7-4afa-87c9-aabe213364cc.svg'
  },
  {
    href: 'https://www.instagram.com/newmakelabo/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_7c7a7258-b924-4c57-a9b7-ec372dab4e89.svg'
  },
  {
    href: 'https://www.towernohour.andstory.co/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_d7f4958d-704f-45e9-82ce-7ffea5812f77.svg'
  },
  {
    href: 'https://www.crafco.andstory.co/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_f78102da-054d-4c80-b243-2602b9a9c8a1.svg'
  },
  {
    href: 'https://aeruosaka.com/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_96a46bd7-775e-461f-8f7b-16e0ab3bd9f8.svg'
  },
  {
    href: 'https://andstory.co/users/1370',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_1453165e-0420-4f22-ba2c-4a7169af36d8.svg'
  },
  {
    href: 'https://marubeni.andstory.co/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_cbda36ae-ac29-4dcb-9800-0efb01ec9d15.svg'
  },
  {
    href: 'https://aete.co.jp/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_f688e22d-f4fb-4b95-99b3-7d1b2a562383.svg'
  },
  {
    href: 'https://www.sdgs.andstory.co/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_5b39c0f9-d966-415d-a066-dd2cbebc6e3a.svg'
  },
  {
    href: 'https://storyandco.co/news/pr001',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_682ed816-72a0-4cbe-9f9d-3d6efa07034a.svg'
  },
  {
    href: 'https://www.instagram.com/shibuyamatsuri/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_cf265f8c-ffc3-49dc-8368-d0f006dcfc21.svg'
  },
  {
    href: 'https://www.instagram.com/zuborun/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_daa70db9-1cbd-424b-8e6a-f8f3d80179fa.svg'
  },
  {
    href: 'https://tokyo.andstory.co/',
    src: 'https://storage.googleapis.com/studio-design-asset-files/projects/V5a7NkzVqR/s-320x240_ee07fb3f-60fb-4064-9cc6-a015c3d4767f.svg'
  },
]

const COLUMNS_VISIBLE_DESKTOP = 5
const COLUMNS_VISIBLE_MOBILE = 2.5
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
  
  const [mounted, setMounted] = useState(false)
  const [columnsVisible, setColumnsVisible] = useState(COLUMNS_VISIBLE_DESKTOP)
  const [currentColumn, setCurrentColumn] = useState(originalColumnCount)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)
  const THUMB_WIDTH = 12 // Fixed thumb width in pixels

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

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if we're on mobile and set columns visible accordingly
  useEffect(() => {
    if (!mounted) return
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
  }, [mounted])

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
    <section className="w-full overflow-hidden md:p-[40px]">
      <div className="hidden md:flex items-center justify-end flex">
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
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden md:overflow-hidden pt-[40px] md:pt-[18px] pb-[20px] md:pb-[80px] scrollbar-hide-mobile"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          className={`flex ${isMobile ? '' : (isTransitioning ? 'transition-transform duration-1000 ease-in-out' : '')}`}
          style={isMobile ? {} : { transform: `translateX(-${currentColumn * (100 / columnsVisible)}%)` }}
        >
          {columns.map((columnLogos, columnIndex) => (
            <div
              key={columnIndex}
              className="shrink-0 flex items-center justify-center"
              style={{ width: `${100 / columnsVisible}%` }}
            >
              {columnLogos.map((logo, logoIndex) => (
                <div
                  key={`${logo.href}-${columnIndex}-${logoIndex}`}
                  className="w-[152px] md:w-full flex items-center justify-center min-h-[100px] max-h-[200px] md:py-[40px]"
                >
                  <Link href={logo.href} target='_blank'>
                    <img
                      src={logo.src}
                      alt={logo.href}
                      className="max-w-[112px] md:max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </Link>
                </div>
              ))}
            </div>
          ))}
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
