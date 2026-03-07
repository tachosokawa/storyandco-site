'use client'

import Link from 'next/link'
import { useState } from 'react'

type CaseItem = {
  id: string | number
  title: string
  category?: string
  summary?: string
  thumbnail?: {
    url: string
  }
}

type CasesSectionProps = {
  cases: CaseItem[]
}

const CARD_SHIFT_PERCENT = 66.6667

export default function CasesSection({ cases }: CasesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(cases.length - 2, 0)

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  const handlePrev = () => {
    if (!canGoPrev) return
    setCurrentIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    if (!canGoNext) return
    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <section className="max-w-[1600px] mx-auto border-b border-[#2D2A24] overflow-hidden">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {['Cases', 'Cases', 'Cases', 'Cases', 'Cases', 'Cases'].map((t, i) => (
          <span key={i} className="font-poppins font-semibold text-[96px] leading-[100%] tracking-[-4%] shrink-0">{t} ·</span>
        ))}
      </div>

      <div className="grid grid-cols-8">
        <p className="col-span-8 border-y border-[#2D2A24] px-4 py-4">事例のご紹介</p>

        <div className="col-span-8 overflow-hidden border-b border-[#2D2A24]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * CARD_SHIFT_PERCENT}%)` }}
          >
            {cases.map((c) => (
              <div
                key={c.id}
                className="w-2/3 shrink-0 border-r border-[#2D2A24] overflow-hidden grid grid-cols-2"
              >
                <div className="col-span-1 px-4 py-10">
                  <p className="text-xs font-medium mb-2 font-bold text-[14px]">{c.category || 'コミュニティ開発'}</p>
                  <h3 className="mt-5 font-sans font-bold text-[24px] leading-[150%] tracking-[0.04em] line-clamp-2">{c.title}</h3>
                  <p className="mt-5 font-sans font-medium text-[16px] leading-[200%] tracking-[0.08em] text-[#2D2A24] line-clamp-3">{c.summary}</p>
                  <button className='mt-5 py-1 px-3 border border-[#2D2A24] rounded-lg font-["FOT-Cezanne_ProN"] font-semibold text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#2D2A24] hover:text-[#F5F0E8] transition-colors'>AND STORY</button>
                </div>
                {c.thumbnail && (
                  <div className="col-span-1 overflow-hidden py-10 pl-4 pr-10">
                    <img
                      src={c.thumbnail.url}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 px-4 py-4 border-r border-[#2D2A24]">
          <Link
            href="/cases"
            className="inline-flex w-full items-center gap-2 text-sm text-[#2D2A24] transition-all justify-between hover:text-[#00B8CC] transition-colors group"
          >
            事例をもっとみる
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div className="col-span-1 items-center justify-center flex">
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
      </div>
    </section>
  )
}
