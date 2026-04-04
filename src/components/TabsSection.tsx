'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import LoadMoreLink from './LoadMoreLink'

type TabItem = {
  id: string
  label: string
  category: string | null,
  minWidth: string
}

type DisplayItem = {
  id: string | number
  title: string
  publishDate?: string
  category?: string[]
  serviceCategory?: string[]
  excerpt?: string
  tags?: string[]
  thumbnail?: {
    url: string
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

function mapCategoryLabel(cat: string): string {
  if (cat === 'お知らせ') return 'インフォメーション'
  return cat
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
  itemLink = "#"
}: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)

  const activeTabConfig = tabs.find(t => t.id === activeTab)
  
  // Memoize filtered items to ensure recalculation when activeTab changes
  const filteredItems = useMemo(() => {
    if (!activeTabConfig?.category) {
      return items
    }
    return items.filter(item => {
      const itemCategories = itemLink === 'cases' 
        ? (Array.isArray(item.serviceCategory) ? item.serviceCategory : [])
        : (Array.isArray(item.category) ? item.category : [])
      const tabCategory = String(activeTabConfig.category || '').trim()
      return itemCategories.some(cat => String(cat || '').trim() === tabCategory)
    })
  }, [items, activeTabConfig, activeTab, itemLink])

  const visibleItems = filteredItems.slice(0, visibleCount)

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(itemsPerPage)
  }, [activeTab, itemsPerPage])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage)
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }
  
  return (
    <section className='w-full'>
      <div className='flex flex-row flex-nowrap items-center justify-start md:justify-center border-b border-[#2d2a24] overflow-x-auto'>
        {tabs.map((tab, index) => {
          const isLast = index === tabs.length - 1
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              style={{ minWidth: tab.minWidth }}
              className={`flex-shrink-0 md:flex-1 text-center text-[12px] sm:text-sm md:text-base lg:text-[16px] font-sans font-medium leading-[2] tracking-[0.04em] pt-[15px] pb-[17px] px-[24px] sm:px-4 md:px-6 lg:px-[24px] sm:pt-4 md:pt-[18px] sm:pb-4 md:pb-[22px] hover:bg-[#18bed7] hover:text-[#FFF] cursor-pointer transition-colors ${
                isActive ? 'bg-[#18bed7] text-[#FFF]' : 'text-[#333]'
              } ${!isLast ? 'border-r border-[#2d2a24]' : ''}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div key={activeTab} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {visibleItems.map((item, index) => {
          const totalItems = visibleItems.length
          const isLastRowMobile = index >= totalItems - (totalItems % 1 || 1)
          const isLastRowTablet = index >= totalItems - (totalItems % 2 || 2)
          const isLastRowDesktop = index >= totalItems - (totalItems % 3 || 3)

          //console.log(item)
          return (
            <div
              key={item.id}
              className={`col-span-1 px-[20px] pt-[20px] pb-[28px] sm:p-6 md:p-8 lg:p-[40px] hover:bg-[#f2f0ea] border-r border-[#2d2a24] ${
                isLastRowMobile ? '' : 'border-b'
              } ${
                isLastRowTablet? 'sm:border-b-0' : 'sm:border-b'
              } ${
                isLastRowDesktop? 'lg:border-b-0' : 'lg:border-b'
              }`}
            >
              <Link href={`${itemLink === 'cases' ? '/cases' : '/news'}/${item.id}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[14px] hover:text-[#18bed7]">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail.url}
                    alt={item.title}
                    className="w-full object-contain transition-transform duration-500 rounded-lg"
                  />
                )}
                {item.publishDate && (
                  <p className="mt-5 sm:mt-5 md:mt-8 lg:mt-8 font-poppins font-medium text-[12px] sm:text-[12px] md:text-[14px] tracking-[0.08em] text-[#2d2a24]">
                    {formatDate(item.publishDate)}
                  </p>
                )}
                <p className={`${item.publishDate ? 'mt-2' : 'mt-5 sm:mt-5 md:mt-8 lg:mt-8'} font-bold text-[12px] sm:text-[12px] md:text-[14px] tracking-[0.08em] text-[#2d2a24]`}>
                  {(() => {
                    const categories = itemLink === 'cases' ? item.serviceCategory : item.category
                    return Array.isArray(categories) && categories.length > 0 ? categories.map(mapCategoryLabel).join(' | ') : ''
                  })()}
                </p>
                <h3 className="mt-1 sm:mt-4 md:mt-4 font-bold text-[16px] md:text-[24px] leading-[2] tracking-[0.04em] line-clamp-2 text-[#2d2a24]">{item.title}</h3>
                <p className="mt-3 sm:mt-4 md:mt-4 font-medium text-[14px] md:text-[16px] leading-[2] tracking-[0.08em] line-clamp-3 text-[#2d2a24]">{item.excerpt}</p>
              </Link>
              {item.tags && item.tags.length > 0 && item.tags.map((tag, tagIndex) => (
                <Link 
                  key={tagIndex}
                  href={`${itemLink === 'cases' ? '/cases' : '/news'}/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                  className='inline-block mt-6 md:mt-6 md:pt-[5px] md:pb-[7px] mr-[15px] md:px-[12px] border border-[#2d2a24] rounded-lg font-sans font-medium text-[12px] pt-[4px] pb-[6px] px-[8px] md:text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'
                >
                  {tag}
                </Link>
              ))}
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