import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'STORY&Co.へのお問い合わせはこちら。お仕事のご相談・ご依頼、取材、採用など、お気軽にご連絡ください。',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
