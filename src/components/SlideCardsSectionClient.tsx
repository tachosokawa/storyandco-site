'use client'

import Link from 'next/link'
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

  // Auto-slide functionality - move one card at a time with seamless loop
  useEffect(() => {
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
  }, [])

  const canGoPrev = true // Always allow prev for infinite loop
  const canGoNext = true // Always allow next for infinite loop

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-9">
        <div className="col-span-9 overflow-hidden border-b border-[#2d2d2d]">
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * CARD_WIDTH_PERCENT}%)` }}
          >
            {allSlideCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className={`w-[55.38%] flex shrink-0 gap-[48px] border-r border-[#2d2d2d] overflow-hidden px-[40px] py-[80px] hover:bg-[#f2f0ea] items-start justify-items-between`}
              >
                <div className="font-sans text-[#333] items-start justify-items-start">
                  <Link href={'/'+linkHref+'/'+card.id} className="mb-2 font-bold text-[14px] hover:text-[#18bed7]">
                    {(() => {
                      const categories = linkHref === 'cases' ? card.serviceCategory : card.category
                      return Array.isArray(categories) && categories.length > 0 ? categories.join(' | ') : ''
                    })()}
                  </Link>
                  <Link href={'/'+linkHref+'/'+card.id}>
                    <h3 className="mt-5 font-bold text-[24px] leading-[150%] tracking-[0.04em] line-clamp-2 text-[#2d2d2d]">{card.title}</h3>
                    <p className="mt-5 font-medium text-[16px] leading-[200%] tracking-[0.08em] line-clamp-3">{card.summary}</p>
                  </Link>
                  {card.tags && card.tags.length > 0 && card.tags.map((tag, tagIndex) => (
                    <Link 
                      key={tagIndex}
                      href={`/${linkHref}/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                      className='mt-5 pt-[3px] pb-[5px] px-[12px] mr-[15px] border border-[#2d2d2d] rounded-lg font-["FOT-Cezanne_ProN"] font-semibold text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFFDF7] transition-colors'
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                {card.thumbnail && (
                  <div className="overflow-hidden items-start justify-items-start flex-shrink-0">
                    <Link href={'/'+linkHref+'/'+card.id}>
                      <img
                        src={card.thumbnail.url}
                        alt={card.title}
                        className="max-h-[240px] h-auto w-auto object-contain transition-transform duration-500 rounded-lg"
                      />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-8 border-r border-[#2d2d2d]">
          <CommonLink linkText={linkText} href={'/'+linkHref} className='px-[40px] pt-[28px] pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]'/>
        </div>
        <div className="col-span-1 items-center justify-end flex pr-[40px]">
          <span className='flex border border-[#2d2d2d] rounded-lg'>
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
        </div>
      </div>
    </section>
  )
}
