# Shelby Kelley — Portfolio Site

Personal portfolio site for full-stack projects with a backend focus, currently in progress.

**Live site:** [shelbyannkelley.com](https://shelbyannkelley.com)

## Tech stack

- **React** (Vite) — component structure, client-side routing via React Router
- **Tailwind CSS v4** — utility-first styling, theme-aware via CSS variables (fall palette in light mode, Halloween palette in dark mode), manual dark mode toggle persisted in `localStorage`
- **ESLint** — general JS rules, React-specific rules (`@eslint-react/eslint-plugin`), accessibility rules (`eslint-plugin-jsx-a11y-x`), and enforced/auto-sorted import ordering (`eslint-plugin-import-x`)
- **Prettier** — code formatting, integrated with ESLint via `eslint-config-prettier`
- **Husky + lint-staged** — auto-lints and formats staged files before every commit
- **commitlint** — enforces conventional commit messages
- **AWS S3** — static file hosting
- **AWS CloudFront** — CDN + HTTPS, with a custom 404 → `/index.html` (200) error response so client-side routes resolve correctly on direct load
- **AWS Certificate Manager** — free TLS certificate for the custom domain
- **name.com** — domain registration and DNS

## Featured projects

- **Package Health Checker** — Embedded tool backed by a live AWS Lambda API (behind API Gateway, with rate limiting). Search any package for known CVEs, severity, and advisory links. Source at [github.com/ShelbyKelley/package-health-checker](https://github.com/ShelbyKelley/package-health-checker). The search UI component (`src/components/PackageHealthCheckerTool.jsx`) is **synced automatically** from that repo via a GitHub Actions workflow that opens a PR here whenever it changes — don't hand-edit that file directly, since it'll be overwritten by the next sync.
- **Retro Rewind** — Reverse-engineering a game's API from the ground up: schema design, Docker, and a deliberate Python-to-Java port.
- **Pantry-to-Plate** — Recipe matching against a tracked pantry, with a bounded LLM fallback for leftover ingredients.

## Local development

```bash
npm install
npm run dev
```

Requires a `.env.development` file (not committed) with:

```
VITE_PACKAGE_HEALTH_API_URL=http://localhost:8000
```

This points the embedded Package Health Checker tool at that project's local backend — see its own repo for running that.

## Linting & formatting

```bash
npx eslint .               # check for lint issues
npx eslint . --fix         # auto-fix what's fixable (mainly import order)
npx prettier --check .     # check formatting
npx prettier --write .     # auto-fix formatting
```

## Environment setup

Deployment needs your CloudFront distribution ID, kept out of git via a `.env` file (already in `.gitignore`):

```
CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id_here
```

## Deployment

**Primary: automatic via GitHub Actions.** Every push to `main` triggers `.github/workflows/deploy.yml`, which lints, builds, syncs to S3, and invalidates the CloudFront cache. Just push — no manual steps needed. A separate `.github/workflows/lint.yml` runs lint/format checks on pull requests.

**Fallback: manual deploy.** If CI is unavailable, or you want to deploy a local change without pushing, run:

```bash
./deploy.sh
```

This requires the local `.env` file mentioned above (for `CLOUDFRONT_DISTRIBUTION_ID`), since the script runs outside of GitHub's environment and doesn't have access to the repo's GitHub Secrets.
