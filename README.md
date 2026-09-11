# Shelby Kelley — Portfolio Site

Personal portfolio site positioned around a career pivot from Software
Engineer to Technical Product/Program Manager (TPM), backed by projects that
show the underlying technical fluency.

**Live site:** [shelbyannkelley.com](https://shelbyannkelley.com)

## Tech stack

- **Node** — version pinned in `.nvmrc` (used by `nvm use` locally and by CI via `node-version-file`)
- **React** (Vite) — component structure, client-side routing via React Router
- **Tailwind CSS v4** — utility-first styling, theme-aware via CSS variables (fall palette in light mode, Halloween palette in dark mode), manual dark mode toggle persisted in `localStorage`
- **Newsreader + IBM Plex Mono** (Google Fonts) — serif for display/body copy, mono for UI chrome (nav, labels, buttons, code-like blocks)
- **Inline SVG icons** — the two footer brand marks are inline paths (Font Awesome Free artwork, CC BY 4.0) rather than the `@fortawesome` runtime, which was about a quarter of the JS bundle (24 kB gzipped) for two icons
- **ESLint** — general JS rules, React-specific rules (`@eslint-react/eslint-plugin`), accessibility rules (`eslint-plugin-jsx-a11y-x`), and enforced/auto-sorted import ordering (`eslint-plugin-import-x`)
- **Prettier** — code formatting, integrated with ESLint via `eslint-config-prettier`
- **Vitest + Testing Library + axe** — 160 tests covering routes, metadata, accessibility, colour contrast, and component behaviour, run in CI
- **Dependabot** — weekly grouped npm and GitHub Actions updates
- **Husky + lint-staged** — auto-lints and formats staged files before every commit
- **commitlint** — enforces conventional commit messages
- **AWS S3** — static file hosting
- **AWS CloudFront** — CDN + HTTPS, with a custom 404 → `/index.html` (200) error response so client-side routes resolve correctly on direct load
- **AWS Certificate Manager** — free TLS certificate for the custom domain
- **name.com** — domain registration and DNS

## Featured projects

- **Package Health Checker** — Live and functional. Search any npm package for known CVEs, severity, and advisory links. Backend runs on AWS Lambda behind API Gateway, with rate limiting. Source at [github.com/ShelbyKelley/package-health-checker](https://github.com/ShelbyKelley/package-health-checker). The search UI component (`src/components/PackageHealthCheckerTool.jsx`) is **synced automatically** from that repo via a GitHub Actions workflow that opens a PR here whenever it changes — don't hand-edit that file directly, since it'll be overwritten by the next sync.
- **RICE Prioritization Calculator** — Live and functional. A working RICE scoring tool for ranking competing feature ideas by reach, impact, confidence, and effort. Pure frontend, no backend, state kept in `localStorage`.
- **Package Health Checker case study** — A written breakdown of the scoping decisions and trade-offs behind the tool above (why version-range computation was cut in favor of linking to source advisories, and the rate-limiting/input-validation posture once the API went public).

## Local development

```bash
nvm use        # Node version is pinned in .nvmrc
npm install
npm run dev
```

Requires a `.env.development` file (not committed) with:

```
VITE_PACKAGE_HEALTH_API_URL=http://localhost:8000
```

This points the embedded Package Health Checker tool at that project's local backend — see its own repo for running that.

## Linting, formatting, and tests

```bash
npm run lint           # check for lint issues
npm run lint:fix       # auto-fix what's fixable (mainly import order)
npm run format:check   # check formatting
npm run format         # auto-fix formatting
npm test               # run the test suite once
npm run test:watch     # re-run on change
npm run test:coverage  # run with a coverage report
```

Husky + lint-staged run the fixers on staged files before every commit, and commitlint rejects commit messages that aren't Conventional Commits. CI re-runs all of the above so a bypassed hook still gets caught.

The suite covers 100% of `src/`, with a 95% threshold enforced in `vite.config.js` so it cannot rot silently. Tests sit next to the file they cover. `src/App.test.jsx` renders every route in `src/routes.jsx` and asserts it produces exactly one `<h1>`, sets its own title and meta description, and doesn't fall through to the catch-all. That covers the most likely breakage on a site like this, which is a route wired up wrong. `src/routes.test.js` asserts `public/sitemap.xml` lists exactly those same routes, since the sitemap is hand-written and would otherwise drift.

## SEO and crawlers

`public/robots.txt` allows everything except `/resume.pdf` and points at `public/sitemap.xml`, which lists the six real routes. The sitemap matters more than the page count suggests: CloudFront rewrites 404s to `/index.html` with a 200, so _every_ URL on the domain answers "200 OK" and search engines would otherwise have to guess which ones are real.

The PDF is disallowed because it carries contact details that are deliberately left off the HTML resume page. That page is fully indexable and covers the same content, so nothing is lost. Note this only stops well-behaved crawlers.

Per-route `<title>`, description, canonical and `robots` tags are rendered declaratively by `src/components/PageMeta.jsx` using React 19's document metadata support, which hoists them into `<head>`. React _appends_ rather than replacing what `index.html` declares, so ownership is split deliberately: `index.html` keeps the `og:` and `twitter:` tags, since link unfurlers never run JavaScript and can only see static markup, while React owns the tags Googlebot re-reads after rendering. A test asserts exactly one description and one canonical per route so duplicates can't ship.

**Known limitation:** because that metadata is client-side, a shared deep link still unfurls on LinkedIn or Slack with the site-wide `og:` text. Fixing it properly means pre-rendering each route to static HTML at build time.

## Environment setup

**Local (manual deploy fallback):** a `.env` file (gitignored) with your CloudFront distribution ID:

```
CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id_here
```

**GitHub Actions:** the following must be set in the repo's Settings → Secrets and variables → Actions:

| Name                          | Type     | Purpose                                                          |
| ----------------------------- | -------- | ---------------------------------------------------------------- |
| `DEPLOY_ROLE_ARN`             | Variable | IAM role the deploy job assumes via GitHub OIDC (no static keys) |
| `CLOUDFRONT_DISTRIBUTION_ID`  | Secret   | Cache invalidation after deploy                                  |
| `VITE_PACKAGE_HEALTH_API_URL` | Variable | Public Lambda API URL, built into the production bundle          |

`VITE_PACKAGE_HEALTH_API_URL` has to be passed explicitly in each workflow's build step via `env:`, since `.env.production` is gitignored and never reaches CI.

Deploys authenticate with short-lived credentials from GitHub's OIDC provider rather than a long-lived access key pair, so the AWS side needs an IAM OIDC identity provider for `token.actions.githubusercontent.com` and a role whose trust policy is scoped to this repo (and ideally to `ref:refs/heads/main`). The role needs `s3:ListBucket`/`s3:PutObject`/`s3:DeleteObject` on the `shelby-portfolio` bucket and `cloudfront:CreateInvalidation` on the distribution.

## CI and deployment

Two workflows, split so that nothing deploys without first passing checks:

- **`.github/workflows/ci.yml`** — runs on every pull request and every push to `main`. Lints, checks formatting, runs tests, and builds.
- **`.github/workflows/deploy.yml`** — triggered by a successful CI run on `main` (`workflow_run`), never by a push directly. Rebuilds at the exact commit CI verified, assumes the deploy role via OIDC, syncs to S3, and invalidates CloudFront.

The S3 sync runs in two passes: hashed files under `assets/` get `max-age=31536000, immutable`, and everything else (`index.html`, `favicon.svg`, `resume.pdf`) gets `max-age=0, must-revalidate` so a deploy is picked up even before the invalidation lands.

**Fallback: manual deploy.** If CI is unavailable, or you want to deploy a local change without pushing:

```bash
./deploy.sh
```

This requires the local `.env` file mentioned above (for `CLOUDFRONT_DISTRIBUTION_ID`) and local AWS credentials, since the script runs outside GitHub's environment. It mirrors the same two-pass cache-control behavior as the workflow — keep the two in sync if either changes.
