'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navItems = [
  { label: '会社のこと', href: '/company' },
  { label: '事業のこと', href: '/service' },
  { label: '事例のご紹介', href: '/cases' },
  { label: 'インフォメーション', href: '/news' },
  { label: '採用情報', href: 'https://www.wantedly.com/companies/storyandco', external: true },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [logoHovered, setLogoHovered] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-[20px] md:px-[40px] ${
        scrolled ? 'bg-[#fffdf7] border-b border-[#2d2a24]' : 'bg-[#fffdf7] border-b border-[#2d2a24]'
      }`}
    >
      <div className="flex items-center justify-between h-[63px] md:h-[95px]">
        
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 shrink-0 pr-[33px]"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <StoryLogo isHovered={logoHovered} />
          </Link>

        {/* Desktop Nav */}
        <nav className="hidden h-[63px] ml-[20px] w-full menu:flex items-center gap-14 justify-end border-l border-r border-[#2d2a24] md:ml-[40px] mr-8 pr-10 md:h-[95px]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const isHovered = hoveredItem === item.href
            const showIcon2 = isActive || isHovered
            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`text-[15px] transition-colors relative font-bold flex gap-1 ${
                  isActive
                    ? 'text-[#18bed7]'
                    : 'text-[#2d2a24] hover:text-[#18bed7]'
                }`}
              >
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00B8CC]" />
                )}
                {item.label}
                {item.external && (
                  <Image 
                    className="border-none" 
                    src={showIcon2 ? "/images/clients/menuicon2.svg" : "/images/clients/menuicon1.svg"} 
                    alt="About Us" 
                    width={20} 
                    height={20}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                )}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`text-[15px] transition-colors relative font-bold flex gap-1 ${
                  isActive
                    ? 'text-[#18bed7]'
                    : 'text-[#2d2a24] hover:text-[#18bed7]'
                }`}
              >
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00B8CC]" />
                )}
                {item.label}
                {item.external && (
                  <Image 
                    className="border-none" 
                    src={showIcon2 ? "/images/clients/menuicon2.svg" : "/images/clients/menuicon1.svg"} 
                    alt="About Us" 
                    width={20} 
                    height={20}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Contact button */}
        <div className="hidden menu:flex items-center gap-2 pl-2">
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-3 border border-[#2d2a24] rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#18bed7] hover:text-white transition-colors overflow-hidden h-[55px] w-[242px]"
          >
            <span className="text-[15px] font-bold animate-marquee whitespace-nowrap">
              お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="menu:hidden flex flex-col gap-1.5 p-3 -mr-1 min-w-[44px] min-h-[44px] items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span className={`block w-6 h-0.5 bg-[#2d2a24] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2d2a24] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2d2a24] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="menu:hidden bg-[#2d2a24] text-white">
          {navItems.map((item) => 
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-4 text-sm border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block px-6 py-4 text-sm border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="block px-6 py-4 text-sm border-b border-white/10 hover:bg-white/5 transition-colors overflow-hidden"
          >
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="text-[15px] font-bold shrink-0">
                お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              </span>
              <span className="text-[15px] font-bold shrink-0">
                お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
                &nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;<span className="inline-block w-1.5 h-1.5 rounded-full bg-current mx-1 align-middle" />
              </span>
            </div>
          </Link>
        </div>
      )}
    </header>
  )
}

function StoryLogo({ isHovered }: { isHovered: boolean }) {
  return (
    <Image src={isHovered ? "/images/clients/logo2.svg" : "/images/clients/logo1.svg"} alt="About Us" width="162" height="21" className='md:w-[200px] md:h-[26px]'/>
  )
}
