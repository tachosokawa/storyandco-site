'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import CommonLink from '@/components/CommonLink'
import type { NewsItem } from './NewsSection'

type TabId = 'all' | 'informations' | 'reports' | 'medias' | 'events'

const tabs = [
  { id: 'all', label: 'すべて', category: null, minWidth: '86.6px' },
  { id: 'informations', label: 'お知らせ', category: 'お知らせ', minWidth: '120px' },
  { id: 'reports', label: 'プレス', category: 'プレスリリース', minWidth: '100px' },
  { id: 'medias', label: 'メディア', category: 'メディア掲載', minWidth: '120px' },
  { id: 'events', label: 'イベント', category: 'イベント', minWidth: '100px' },
]

export default function NewsSectionClient({ news }: { news: NewsItem[] }) {
  const [activeTab, setActiveTab] = useState<TabId>('all')

  // Filter news based on active tab
  const filteredNews = useMemo(() => {
    if (activeTab === 'all') {
      return news
    }
    const activeTabCategory = tabs.find(tab => tab.id === activeTab)?.category
    if (!activeTabCategory) {
      return news
    }
    
    const filtered = news.filter((n) => {
      // Handle category as string or array
      if (Array.isArray(n.category)) {
        return n.category.some(cat => String(cat || '').trim() === activeTabCategory)
      }
      // Handle category as string
      const categoryStr = String(n.category || '').trim()
      return categoryStr === activeTabCategory
    })
    
    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Active tab:', activeTab, 'Category:', activeTabCategory)
      console.log('Total news:', news.length, 'Filtered:', filtered.length)
      console.log('Sample categories:', news.slice(0, 3).map(n => ({
        id: n.id,
        category: n.category,
        categoryType: Array.isArray(n.category) ? 'array' : typeof n.category
      })))
    }
    
    return filtered
  }, [news, activeTab])
  

  return (
    <section className="w-full border-t border-[#2d2a24] overflow-hidden">
      <div className="flex gap-4 md:gap-6 lg:gap-8  animate-marquee whitespace-nowrap py-[32px] md:pt-8 lg:pt-[44px] md:pb-6 lg:pb-[36px]">
        {['News', 'News', 'News', 'News', 'News', 'News'].map((t, i) => (
          <span key={i} className="font-poppins font-semibold text-[48px] md:text-6xl lg:text-[96px] leading-[100%] tracking-[-4%] shrink-0 text-[#333]">{t} ·</span>
        ))}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 border-t md:border-b border-[#2d2a24] px-4 md:px-6 lg:px-[40px] font-sans text-[12px] md:text-sm lg:text-[16px] font-medium text-[#333] leading-[2]'>
        <div className='col-span-2 md:col-span-1 lg:col-span-4 md:border-r border-b-0 border-[#2d2a24] pt-[12px] md:pt-4 lg:pt-[17px] pb-[16px] md:pb-4 lg:pb-[19px]'><p>お知らせ</p></div>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`hidden md:block col-span-1 border-r ${index === tabs.length - 1 ? '' : 'border-b md:border-b-0 lg:border-b-0'} border-[#2d2a24] pt-3 md:pt-4 lg:pt-[17px] pb-3 md:pb-4 lg:pb-[19px] cursor-pointer text-center hover:bg-[#18BED7] transition-colors ${
              activeTab === tab.id ? 'bg-[#18BED7] text-[#FFF]' : 'text-[#333] hover:text-[#FFF]'
            }`}
          >
            <p className={tab.id === 'reports' ? 'text-xs' : tab.id === 'medias' ? 'text-xs md:text-sm lg:text-base' : ''}>{tab.label}</p>
          </div>
        ))}
      </div>

      {/* News */}
      {filteredNews.length > 0 && (
        <div>
          {filteredNews.map((n: NewsItem) => (
            <div key={n.id} className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 md:border-b border-t md:border-t-0 border-[#2d2a24] hover:bg-[#f2f0ea] text-[#333] px-[20px] md:px-0 pt-[28px] md:pt-0 pb-[38px] md:pb-0'>
              <div className='col-span-1 md:col-span-1 lg:col-span-3 border-r-0 md:border-r lg:border-r md:border-b md:border-b-0 lg:border-b-0 border-[#2d2a24] items-start justify-start flex flex-col md:flex-row gap-2 md:gap-0 md:px-6 lg:px-[40px] md:pt-10 lg:pt-[78px] md:pb-10 lg:pb-[82px]'>
                <div className='flex flex-row items-center gap-2 md:gap-0'>
                  <span className="font-poppins font-medium text-xs md:text-sm lg:text-[14px] text-[#2d2a24] shrink-0">
                    {new Date(n.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </span>
                  <span className='block md:hidden'>&nbsp;|&nbsp;</span>
                  <span className="hidden md:inline">&emsp;|&emsp;</span>
                  <Link href={`/news/${n.id}`} className="font-sans font-bold text-xs md:text-sm lg:text-[14px] leading-[100%] tracking-[0.08em] py-0.5 shrink-0 h-fit hover:text-[#18bed7]">{n.category || 'お知らせ'}</Link>
                  <span className='block md:hidden'>&nbsp;|&nbsp;</span>
                </div>
                {n.tags && n.tags.length > 0 && (
                  <div className='flex flex-row items-center gap-2 md:gap-0 mt-1 md:mt-0'>
                    <span className="hidden md:inline">&emsp;|&emsp;</span>
                    {n.tags.map((tag, tagIndex) => (
                      <Link 
                        key={tagIndex}
                        href={`/news/category/${tag==="NewMake" ? "newmake" : tag ==="STORY&Co" ? "story" : tag==="PATCH&PLAY" ? "patchandplay" : tag==="CRAFC" ? "crafc" : tag==="AND STORY" ? "andstory" : tag}`} 
                        className='border border-[#2d2a24] px-2 md:px-[12px] py-1 md:py-[6px] rounded-lg font-poppins font-medium text-[12px] leading-[100%] tracking-[0.08em] hover:bg-[#18bed7] hover:text-[#FFF] transition-colors'
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href={`/news/${n.id}`} className='col-span-1 md:col-span-2 lg:col-span-6 md:px-6 lg:px-[40px] md:pt-10 lg:pt-[78px] md:pb-10 lg:pb-[82px] mt-3'>
                <h3 className='font-sans font-bold text-[14px] md:text-xl lg:text-[24px] leading-[2] tracking-[0.04em]'>{n.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
      <CommonLink linkText='お知らせをもっとみる' href="/news"/>
    </section>
  )
}
