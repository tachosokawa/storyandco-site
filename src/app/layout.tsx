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
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社STORY&Co.｜ストーリーアンドカンパニー',
    description:
      'STORY&Co.は体験をデザインすることで人生に出会いと変化をもたらす企業です。AND STORY・NewMake・PATCH&PLAYなどの事業を展開しています。',
  },
  alternates: {
    canonical: 'https://storyandco.co',
  },
  icons: {
    icon: '/favicon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社STORY&Co.',
  alternateName: 'ストーリーアンドカンパニー',
  url: 'https://storyandco.co',
  logo: 'https://storyandco.co/favicon.png',
  description:
    'STORY&Co.は体験をデザインすることで人生に出会いと変化をもたらす企業です。',
  sameAs: [
    'https://www.wantedly.com/companies/storyandco',
    'https://www.instagram.com/newmakelabo/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://storyandco.co/contact',
    availableLanguage: 'Japanese',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'STORY & Co.',
  url: 'https://storyandco.co',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
