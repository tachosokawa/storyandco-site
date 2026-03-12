/**
 * Processes HTML content and adds/updates className attributes on specific tags
 */
export function processBodyHTML(html: string): string {
  if (!html) return html

  let processed = html

  // Helper function to process a tag
  const processTag = (
    htmlString: string,
    tagName: string,
    className: string
  ) => {
    // Only match opening tags, not closing tags
    const regex = new RegExp(`<${tagName}(\\s[^>]*)?>`, 'gi')
    return htmlString.replace(regex, (match, attrs = '') => {
      // Check if className already exists
      const classNameMatch = attrs.match(/class=["']([^"']*)["']/i)
      if (classNameMatch) {
        // Replace existing className (ensure space before class)
        const newAttrs = attrs.replace(
          /class=["'][^"']*["']/i,
          ` class="${className}"`
        )
        return `<${tagName}${newAttrs}>`
      } else {
        // Add new className - attrs may be empty or have attributes with leading space
        // Always add space before class attribute
        return `<${tagName}${attrs} class="${className}">`
      }
    })
  }

  // Process each tag type
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

  // Remove <strong> and </strong> tags
  processed = processed.replace(/<strong\s*[^>]*>/gi, '')
  processed = processed.replace(/<\/strong>/gi, '')

  return processed
}
