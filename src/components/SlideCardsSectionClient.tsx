'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import CommonLink from './CommonLink'

type SlideCardItem = {
  id: string | number
  title: string
  category?: string[]
  serviceCategory?: string[]
  summary?: string
  tags?: string[]
  thumbnail?: {
    url: string
  }
}

const CARD_WIDTH_PERCENT = 55.38 // Each card is w-3/5 (60%)
const AUTO_SLIDE_INTERVAL = 4000 // 4 seconds

export default function SlideCardsSectionClient({ slideCards, linkHref, linkText }: { slideCards: SlideCardItem[], linkHref: string, linkText: string }) {
  // Duplicate slideCards for seamless infinite loop
  const allSlideCards = [...slideCards, ...slideCards, ...slideCards]
  const originalSlideCardCount = slideCards.length
  
  const [currentIndex, setCurrentIndex] = useState(originalSlideCardCount)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)
  const THUMB_WIDTH = 12 // Fixed thumb width in pixels

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= originalSlideCardCount) {
        // Jump to the end of the duplicate set (same content as start)
        return originalSlideCardCount * 2 - 1
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      return prev + 1
    })
  }

  // Handle seamless reset when reaching the boundary
  useEffect(() => {
    if (currentIndex >= originalSlideCardCount * 2) {
      // We've scrolled past the second duplicate, reset to the first duplicate (same content)
      setIsTransitioning(false)
      const resetTimeout = setTimeout(() => {
        setCurrentIndex(originalSlideCardCount)
        setTimeout(() => {
          setIsTransitioning(true)
        }, 50)
      }, 50)
      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, originalSlideCardCount])

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if we're on mobile
  useEffect(() => {
    if (!mounted) return
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [mounted])

  // Auto-slide functionality - move one card at a time with seamless loop (desktop only)
  useEffect(() => {
    if (isMobile) {
      return // Don't auto-slide on mobile
    }

    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
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
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-9">
        <div 
          ref={scrollContainerRef}
          className="col-span-9 overflow-x-auto overflow-y-hidden md:overflow-hidden border-b border-[#2d2a24] scrollbar-hide-mobile"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div
            className={`flex ${isMobile ? '' : (isTransitioning ? 'transition-transform duration-500 ease-out' : '')}`}
            style={isMobile ? {} : { transform: `translateX(-${currentIndex * CARD_WIDTH_PERCENT}%)` }}
          >
            {allSlideCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className={`flex md:w-[55.38%] w-[672px] min-w-[572px] shrink-0 gap-[48px] border-r border-[#2d2a24] overflow-hidden px-[20px] md:px-[40px] py-[56px] md:py-[80px] hover:bg-[#f2f0ea] items-start justify-items-between`}
              >
                <div className="font-sans text-[#333] min-w-[250px] items-start justify-items-start">
                  <Link href={'/'+linkHref+'/'+card.id} target="_blank" rel="noopener noreferrer" className="mb-2 font-bold text-[14px] hover:text-[#18bed7]">
                    {(() => {
                      const categories = linkHref === 'cases' ? card.serviceCategory : card.category
                      return Array.isArray(categories) && categories.length > 0 ? categories.join(' | ') : ''
                    })()}
                  </Link>
                  <Link href={'/'+linkHref+'/'+card.id} target="_blank" rel="noopener noreferrer">
                    <h3 className="mt-5 font-bold text-[24px] leading-[150%] tracking-[0.04em] line-clamp-2 text-[#2d2a24]">{card.title}</h3>
                    <p className="mt-5 font-medium text-[16px] leading-[200%] tracking-[0.08em] line-clamp-3">{card.summary}</p>
                  </Link>
                  {card.tags && card.tags.length > 0 && card.tags.map((tag, tagIndex) => (
                    <Link 
                      key={tagIndex}
                      href={`/${linkHref}/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                      className='mt-5 pt-[3px] pb-[5px] px-[12px] mr-[15px] border border-[#2d2a24] rounded-lg font-["FOT-Cezanne_ProN"] font-semibold text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFFDF7] transition-colors'
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                {card.thumbnail && (
                  <div className="overflow-hidden items-start justify-items-start flex-shrink-0">
                    <Link href={'/'+linkHref+'/'+card.id} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={`${card.thumbnail.url}?w=560&fm=webp`}
                        alt={card.title}
                        width={420}
                        height={240}
                        className="max-h-[180px] md:max-h-[240px] h-auto w-auto object-contain transition-transform duration-500 rounded-lg"
                        sizes="(max-width: 768px) 180px, 240px"
                      />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Custom scrollbar for mobile only */}
        {isMobile && showScrollbar && (
          <div className="col-span-9 md:hidden px-[20px] py-[34px]">
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

        <div className="col-span-9 md:col-span-8 md:border-r md:border-[#2d2a24]">
          <CommonLink linkText={linkText} href={'/'+linkHref}/>
        </div>
        <div className="hidden md:flex col-span-1 items-center justify-end flex pr-[40px]">
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
                width={20}
                height={20}
                alt="前へ"
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
                width={20}
                height={20}
                alt="次へ"
              />
            </button>
          </span>
        </div>
      </div>
    </section>
  )
}
