export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  imageUrl,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  imageUrl?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'STORY&Co.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'STORY&Co.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.storyandco.co/favicon.png',
      },
    },
    ...(imageUrl && { image: imageUrl }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
