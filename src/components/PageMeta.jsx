import { useLocation } from 'react-router-dom'

import { SITE_NAME, SITE_ORIGIN } from '../lib/site'
import { getRouteMeta, normalizePath } from '../routes'

// React 19 hoists these into <head>. It appends rather than replaces, so
// anything also declared in index.html would end up duplicated. og:/twitter:
// tags live there instead, since unfurlers don't run JS. See CLAUDE.md.
function PageMeta() {
  const { pathname } = useLocation()
  const { title, description, noindex } = getRouteMeta(pathname)
  const canonical = `${SITE_ORIGIN}${normalizePath(pathname)}`

  return (
    <>
      <title>{title ? `${title} — ${SITE_NAME}` : SITE_NAME}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={canonical} />
    </>
  )
}

export default PageMeta
