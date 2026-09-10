import { useEffect } from 'react'

const SITE_NAME = 'Shelby Kelley'

// Every route otherwise shares the one <title>/description baked into
// index.html, which reads poorly in tabs, bookmarks and shared links.
function PageTitle({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  }, [title])

  useEffect(() => {
    if (!description) return

    const tag = document.querySelector('meta[name="description"]')
    if (!tag) return

    const previous = tag.getAttribute('content')
    tag.setAttribute('content', description)
    return () => tag.setAttribute('content', previous)
  }, [description])

  return null
}

export default PageTitle
