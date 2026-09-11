import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PackageHealthChecker from './pages/PackageHealthChecker'
import PHCCaseStudy from './pages/PHCCaseStudy'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import RiceCalculator from './pages/RiceCalculator'

// The one place routes are declared. App.jsx renders these, PageMeta reads the
// title and description, and a test checks public/sitemap.xml lists the same
// paths. Adding a route here and to the sitemap is the whole job.
export const pages = [
  {
    path: '/',
    Component: Home,
    title: null,
    description:
      'Technical Product/Program Manager with 8 years in software development, including 5 years leading engineering teams.',
  },
  {
    path: '/projects',
    Component: Projects,
    title: 'Projects',
    description:
      'Selected product and program work, including the Package Health Checker and a RICE prioritization calculator.',
  },
  {
    path: '/package-health-checker',
    Component: PackageHealthChecker,
    title: 'Package Health Checker',
    description:
      'Search any npm package for known CVEs, severity, and advisory links.',
  },
  {
    path: '/rice-calculator',
    Component: RiceCalculator,
    title: 'RICE Calculator',
    description:
      'Score and rank competing feature ideas by reach, impact, confidence, and effort.',
  },
  {
    path: '/phc-case-study',
    Component: PHCCaseStudy,
    title: 'Package Health Checker Case Study',
    description:
      'The scoping decisions and trade-offs behind the Package Health Checker.',
  },
  {
    path: '/resume',
    Component: Resume,
    title: 'Resume',
    description:
      'Resume for Shelby Kelley, Technical Product/Program Manager, available on-page and as a PDF download.',
  },
]

// Unknown URLs still answer 200 because of the SPA rewrite, so this page has
// to declare noindex itself.
export const catchAll = {
  path: '*',
  Component: NotFound,
  title: 'Page not found',
  description: null,
  noindex: true,
}

export const routes = [...pages, catchAll]

// React Router matches "/projects/" to "/projects", so this has to as well.
// Without it a real page gets the not-found title and a noindex tag.
export function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function getRouteMeta(pathname) {
  const path = normalizePath(pathname)
  return pages.find((page) => page.path === path) ?? catchAll
}
