/**
 * Processes HTML content from microCMS rich editor.
 * Adds layout/typography classes while preserving microCMS's
 * inline styles (font-size, color, etc.) and existing classes.
 */
export function processBodyHTML(html: string): string {
  if (!html) return html

  let processed = html

  // Helper: merge our classes with any existing classes from microCMS
  const processTag = (
    htmlString: string,
    tagName: string,
    className: string
  ) => {
    const regex = new RegExp(`<${tagName}(\\s[^>]*)?>`, 'gi')
    return htmlString.replace(regex, (match, attrs = '') => {
      const classMatch = attrs.match(/class=["']([^"']*)["']/i)
      if (classMatch) {
        // Merge: keep microCMS classes + append ours
        const existing = classMatch[1]
        const newAttrs = attrs.replace(
          /class=["'][^"']*["']/i,
          ` class="${existing} ${className}"`
        )
        return `<${tagName}${newAttrs}>`
      } else {
        return `<${tagName}${attrs} class="${className}">`
      }
    })
  }

  // Process each tag type (layout & spacing only, no font-size overrides)
  processed = processTag(
    processed,
    'a',
    'font-medium leading-[2] tracking-[0.08em] text-[#18bed7]'
  )

  processed = processTag(
    processed,
    'p',
    'font-medium leading-[2] tracking-[0.08em] mt-6 sm:mt-8 md:mt-[40px]'
  )

  processed = processTag(
    processed,
    'ul',
    'list-disc mt-6 sm:mt-8 md:mt-[40px] pl-4 sm:pl-5 md:pl-6'
  )

  processed = processTag(
    processed,
    'li',
    'font-sans font-medium text-[#2d2a24] leading-[2] tracking-[0.04em] text-sm sm:text-base lg:text-[16px] text-left'
  )

  processed = processTag(
    processed,
    'h2',
    'text-lg sm:text-xl md:text-[24px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]'
  )

  processed = processTag(
    processed,
    'h3',
    'text-lg sm:text-xl md:text-[18px] font-bold leading-[2] tracking-[0.04em] mt-8 sm:mt-12 md:mt-[80px]'
  )

  // Keep <strong> tags — microCMS bold formatting should be preserved

  return processed
}
