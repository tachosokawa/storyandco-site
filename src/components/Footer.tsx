import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  main: [
    { label: 'トップページ', href: '/' },
    { label: '会社のこと', href: '/company' },
    { label: '事業のこと', href: '/service' },
    { label: '事例のご紹介', href: '/cases' },
    { label: 'お知らせ', href: '/news' },
    { label: '採用情報', href: '/recruit' },
    { label: 'お問い合わせ', href: '/contact' },
    { label: 'プライバシーポリシー', href: '/privacy' },
  ],
  services: [
    { label: 'プラットフォーム事業', href: '/service#platform', bullet: true },
    { label: 'PATCH&PLAY', href: '/service/patchandplay' },
    { label: 'AND STORY', href: '/service/andstory' },
    { label: 'コミュニティ事業', href: '/service#community', bullet: true },
    { label: 'NewMake', href: '/service/newmake' },
    { label: 'ソリューション事業', href: '/service#solution', bullet: true },
    { label: 'コミュニティ開発', href: '/service/community' },
    { label: '地域・イベントプロデュース', href: '/service/event' },
    { label: 'SDGs推進支援', href: '/service/sdgs' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#2d2a24]">
      <div className='grid grid-cols-2'>
        {/* Logo */}
        <div className='col-span-2 md:col-span-1 border-b md:border-b-0 md:border-r border-[#2d2a24] py-[40px] md:py-[80px] px-[20px] md:px-[40px]'>
          <Image src="/images/clients/footer-logo.svg" alt="STORY&Co." width={352} height={40} className='w-[352px] md:w-[68%] h-auto'/>
        </div>
        <div className='col-span-2 md:col-span-1 grid grid-cols-2  py-[40px] md:py-[80px] px-[20px] md:px-[40px]'>
          {/* Main links */}
          <div className='col-span-1'>
            <ul className="space-y-4">
              {footerLinks.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans font-bold text-[12px] md:text-[14px] leading-[200%] tracking-[0.04em] text-[#2d2a24] hover:text-[#18bed7] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service links */}
          <div className='col-span-1'>
            <ul className="space-y-4">
              {footerLinks.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-sans font-bold text-[12px] md:text-[14px] leading-[200%] tracking-[0.04em] text-[#2d2a24] transition-colors ${
                      item.bullet ? 'flex items-center gap-2 hover:cursor-text' : 'hover:text-[#18bed7] '
                    }`}
                  >
                    {item.bullet && <span className="w-1.5 h-1.5 rounded-full bg-[#2d2a24] shrink-0" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 border-t border-[#2d2a24] py-[28px] md:py-[30px] px-[20px] md:px-[40px]">
          <p className="font-poppins font-medium text-[14px] md:text-[12px] leading-[100%] tracking-normal text-[#2d2a24]">© STORY&Co.</p>
        </div>
      </div>
    </footer>
  )
}
