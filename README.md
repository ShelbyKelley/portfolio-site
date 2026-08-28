# Shelby Kelley — Portfolio Site

Personal portfolio site showcasing backend-focused projects, built as a React app and deployed on AWS.

**Live site:** [shelbyannkelley.com](https://shelbyannkelley.com)

## Tech stack

- **React** (Vite) — component structure, client-side routing via React Router
- **Tailwind CSS v4** — utility-first styling, manual dark mode (toggle + `localStorage` persistence, with an inline script that sets the theme before the page renders so it doesn't briefly flash the wrong color scheme)
- **ESLint** — general JS rules, React-specific rules (`@eslint-react/eslint-plugin`), accessibility rules (`eslint-plugin-jsx-a11y-x`), and enforced/auto-sorted import ordering (`eslint-plugin-import-x`)
- **Prettier** — code formatting, integrated with ESLint via `eslint-config-prettier`
- **AWS S3** — static file hosting
- **AWS CloudFront** — CDN + HTTPS, with a custom 404 → `/index.html` (200) error response so client-side routes resolve correctly on direct load
- **AWS Certificate Manager** — free TLS certificate for the custom domain
- **name.com** — domain registration and DNS

## Local development

```bash
npm install
npm run dev
```

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

```bash
./deploy.sh
```

This builds the app, syncs the `dist/` folder to S3, and invalidates the CloudFront cache so changes go live within a minute or two.

## Featured projects

- **Retro Rewind** — Reverse-engineering a game's API from the ground up: schema design, Docker, and a deliberate Python-to-Java port.
- **Package Health Checker** — Search any package for known CVEs, end-of-life status, and maintenance activity.
- **Pantry-to-Plate** — Recipe matching against a tracked pantry, with a bounded LLM fallback for leftover ingredients.
