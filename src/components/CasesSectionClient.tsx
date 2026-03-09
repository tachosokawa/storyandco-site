'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import CommonLink from './CommonLink'

type CaseItem = {
  id: string | number
  title: string
  category?: string
  summary?: string
  thumbnail?: {
    url: string
  }
}

const CARD_WIDTH_PERCENT = 66.6667 // Each card is w-2/3 (66.6667%)
const AUTO_SLIDE_INTERVAL = 4000 // 4 seconds

export default function CasesSectionClient({ cases }: { cases: CaseItem[] }) {
  // Duplicate cases for seamless infinite loop
  const allCases = [...cases, ...cases, ...cases]
  const originalCaseCount = cases.length
  
  const [currentIndex, setCurrentIndex] = useState(originalCaseCount)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= originalCaseCount) {
        // Jump to the end of the duplicate set (same content as start)
        return originalCaseCount * 2 - 1
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
    if (currentIndex >= originalCaseCount * 2) {
      // We've scrolled past the second duplicate, reset to the first duplicate (same content)
      setIsTransitioning(false)
      const resetTimeout = setTimeout(() => {
        setCurrentIndex(originalCaseCount)
        setTimeout(() => {
          setIsTransitioning(true)
        }, 50)
      }, 50)
      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, originalCaseCount])

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
    <section className="border-b border-[#2D2A24] overflow-hidden">
      <div className="flex gap-4 md:gap-6 lg:gap-8 animate-marquee whitespace-nowrap pt-[44px] pb-[36px]">
        {['Cases', 'Cases', 'Cases', 'Cases', 'Cases', 'Cases'].map((t, i) => (
          <span key={i} className="font-poppins font-semibold text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
        ))}
      </div>

      <div className="grid grid-cols-8">
        <h2 className="col-span-8 border-y border-[#2D2A24] px-[40px] pt-[17px] pb-[19px] font-sans font-medium text-[16px] leading-[2] tracking-[0.04em] text-[#333]">事例のご紹介</h2>

        <div className="col-span-8 overflow-hidden border-b border-[#2D2A24]">
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * CARD_WIDTH_PERCENT}%)` }}
          >
            {allCases.map((c, index) => (
              <div
                key={`${c.id}-${index}`}
                className="w-2/3 shrink-0 gap-14 border-r border-[#2D2A24] overflow-hidden grid grid-cols-2 px-[40px] py-[80px] hover:bg-[#f2f0ea]"
              >
                <div className="col-span-1 font-sans text-[#333]">
                  <Link href="/project" className="mb-2 font-bold text-[14px] hover:text-[#18bed7]">{c.category || 'コミュニティ開発'}</Link>
                  <Link href="/project">
                    <h3 className="mt-5 font-bold text-[24px] leading-[150%] tracking-[0.04em] line-clamp-2 text-[#2D2A24]">{c.title}</h3>
                    <p className="mt-5 font-medium text-[16px] leading-[200%] tracking-[0.08em] line-clamp-3">{c.summary}</p>
                  </Link>
                  <button className='mt-5 pt-[5px] pb-[7px] px-[12px] border border-[#2D2A24] rounded-lg font-["FOT-Cezanne_ProN"] font-semibold text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFFDF7] transition-colors'>NewMake</button>
                </div>
                {c.thumbnail && (
                  <div className="col-span-1 overflow-hidden">
                    <img
                      src={c.thumbnail.url}
                      alt={c.title}
                      className="w-full max-h-[240px] object-contain transition-transform duration-500 rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 border-r border-[#2D2A24]">
          <CommonLink linkText="事例をもっとみる" href="/project" className='px-[40px] pt-[28px] pb-[30px] hover:bg-[#18bed7] text-[#333] hover:text-[#FFF] hover:cursor-pointer text-[16px]'/>
        </div>
        <div className="col-span-1 items-center justify-end flex pr-[40px]">
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
