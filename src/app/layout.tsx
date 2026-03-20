import type { Metadata } from 'next'
import { Noto_Sans_JP, Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const noto = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto', display: 'swap' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://storyandco.co'),
  title: {
    default: '株式会社STORY&Co.｜ストーリーアンドカンパニー',
    template: '%s | STORY & Co.',
  },
  description:
    'STORY&Co.（ストーリーアンドカンパニー）は体験をデザインすることで人生に出会いと変化をもたらす企業です。AND STORY・NewMake・タワーのアワーなどのプラットフォーム・コミュニティ事業を展開しています。',
  keywords: ['STORY&Co', 'ストーリーアンドカンパニー', 'コミュニティ', 'AND STORY', 'NewMake', 'アップサイクル'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://storyandco.co',
    siteName: 'STORY & Co.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
