'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoadMoreLink from './LoadMoreLink'

type TabItem = {
  id: string
  label: string
  category: string | null
}

type DisplayItem = {
  id: string | number
  title: string
  category?: string
  summary?: string
  thumbnail?: {
    url: string
  }
}

type TabsSectionProps = {
  tabs: TabItem[]
  items: DisplayItem[]
  loadMoreText?: string
  itemsPerPage?: number
  itemLink?: string
}

export default function TabsSection({ 
  tabs, 
  items,
  loadMoreText = "もっと事例を見る",
  itemsPerPage = 9,
  itemLink = "/project"
}: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)

  const activeTabConfig = tabs.find(t => t.id === activeTab)
  const filteredItems = !activeTabConfig?.category
    ? items 
    : items.filter(item => item.category === activeTabConfig.category)

  const visibleItems = filteredItems.slice(0, visibleCount)

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(itemsPerPage)
  }, [activeTab, itemsPerPage])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage)
  }

  return (
    <section className='w-full'>
      <div className='flex flex-row flex-nowrap items-center justify-center border-b border-[#2D2A24] overflow-x-auto'>
        {tabs.map((tab, index) => {
          const isLast = index === tabs.length - 1
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit text-center text-xs sm:text-sm md:text-base lg:text-[16px] font-sans font-medium leading-[2] tracking-[0.04em] px-3 sm:px-4 md:px-6 lg:px-[24px] pt-3 sm:pt-4 md:pt-[18px] pb-3 sm:pb-4 md:pb-[22px] hover:bg-[#18bed7] hover:text-[#FFF] cursor-pointer transition-colors ${
                isActive ? 'bg-[#18bed7] text-[#FFF]' : 'text-[#333]'
              } ${!isLast ? 'border-r border-[#2d2a24]' : ''}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {visibleItems.map((item, index) => {
          const totalItems = visibleItems.length
          const isLastInColumnTablet = index % 2 === 1
          const isLastInColumnDesktop = index % 3 === 2
          const isLastRow = index === totalItems - 1
          
          return (
            <div
              key={`${item.id}-${index}`}
              className={`col-span-1 p-4 sm:p-6 md:p-8 lg:p-[40px] hover:bg-[#f2f0ea] border-[#2d2a24] ${
                !isLastRow ? 'border-b' : ''
              } ${
                !isLastInColumnTablet? 'md:border-r' : ''
              } ${
                !isLastInColumnDesktop? 'lg:border-r' : ''
              }`}
            >
              <Link href={itemLink} className="font-bold text-[14px] hover:text-[#18bed7]">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail.url}
                    alt={item.title}
                    className="w-full object-contain transition-transform duration-500 rounded-lg"
                  />
                )}
                <p className="mt-4 sm:mt-5 md:mt-6 lg:mt-7 font-bold text-xs sm:text-[12px] md:text-[14px] tracking-[0.08em] text-[#2d2a24]">{item.category || 'コミュニティ開発'}</p>
                <h3 className="mt-3 sm:mt-4 md:mt-5 font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-[150%] tracking-[0.04em] line-clamp-2 text-[#2d2a24]">{item.title}</h3>
                <p className="mt-3 sm:mt-4 md:mt-5 font-medium text-sm sm:text-[14px] md:text-[16px] leading-[200%] tracking-[0.08em] line-clamp-3 text-[#2d2a24]">{item.summary}</p>
              </Link>
              <button className='mt-3 sm:mt-4 md:mt-5 pt-[5px] pb-[7px] px-2 sm:px-3 md:px-[12px] border border-[#2D2A24] rounded-lg font-["FOT-Cezanne_ProN"] font-semibold text-[10px] sm:text-[11px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFFDF7] transition-colors'>NewMake</button>
            </div>
          );
        })}
      </div>
      {filteredItems.length > visibleCount && (
        <LoadMoreLink linkText={loadMoreText} onClick={handleLoadMore} />
      )}
    </section>
  )
}
