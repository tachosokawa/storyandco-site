import type { Metadata } from 'next'
import './globals.css'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
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
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
