# CLAUDE.md — Codebase Guide for AI Assistants

## Project Overview

Personal portfolio website for Matt Gibson (bioinformatics engineer / evolutionary geneticist). Built with **Next.js (App Router)** and **TypeScript**, styled with **Tailwind CSS v4 (alpha)**, and deployed on **Vercel**.

Live site: https://home.gibsonmatthew.com

---

## Repository Structure

```
/
├── app/
│   ├── layout.tsx               # Root layout: fonts, metadata, Navbar, Footer, Analytics
│   ├── page.tsx                 # Home page: bio + NewsItems component
│   ├── global.css               # Global styles (Tailwind entry point)
│   ├── robots.ts                # Robots meta
│   ├── sitemap.xml              # Static sitemap
│   ├── not-found.tsx            # 404 page
│   ├── components/
│   │   ├── nav.tsx              # Navbar with static navItems object
│   │   ├── footer.tsx           # Site footer
│   │   ├── news.tsx             # NewsItems component (renders + sorts news_data)
│   │   ├── pubs.tsx             # Publications component (parses .bibtex file at build time)
│   │   ├── portfolio.tsx        # PortfolioItems component (renders portfolio_data)
│   │   └── resources.tsx        # Resources component (renders resource_data)
│   ├── news/
│   │   ├── page.tsx             # /news route
│   │   └── news_data.tsx        # NewsStory[] array — edit here to add news items
│   ├── publications/
│   │   ├── page.tsx             # /publications route
│   │   └── pubs.bibtex          # BibTeX source file for all publications
│   ├── portfolio/
│   │   ├── page.tsx             # /portfolio route
│   │   └── portfolio_data.tsx   # PortfolioItem[] array — edit here to add projects
│   └── resources/
│       ├── page.tsx             # /resources route
│       └── resource_data.tsx    # Resource[] array — edit here to add resources
├── public/
│   ├── favicon.ico
│   ├── pic.png                  # Profile photo
│   └── cv_for_web.pdf           # CV (linked directly in navbar)
├── package.json
├── tsconfig.json
├── postcss.config.js
├── .prettierrc                  # Prettier config (empty object — all defaults)
├── .prettierignore
└── .husky/
    └── pre-commit               # Runs lint-staged (Prettier) before every commit
```

---

## Navigation

Nav links are defined as a plain object in `app/components/nav.tsx`:

```ts
const navItems = {
  "/": { name: "home" },
  "/publications": { name: "publications" },
  "/cv_for_web.pdf": { name: "cv" },
  "/resources": { name: "resources" },
  "/portfolio": { name: "portfolio" },
};
```

To add a new nav link, add a new entry to `navItems` and create the corresponding route under `app/`.

---

## Data Conventions

Content is stored as typed TypeScript arrays in `_data.tsx` files colocated with each route. There is no database or CMS.

### News (`app/news/news_data.tsx`)
```ts
type NewsStory = { title: string; date: string; link?: string };
```
- `date` accepts any string parseable by `new Date()` (e.g. `"Jun-2024"`)
- `link` is optional; if omitted the title renders as plain text
- Items are **sorted descending by date** at render time in `news.tsx`
- The `NewsItems` component is also embedded on the home page (`app/page.tsx`)

### Publications (`app/publications/pubs.bibtex`)
- Publications are stored as a **BibTeX file** (`pubs.bibtex`)
- `app/components/pubs.tsx` reads and parses this file **at build time** using Node `fs` and the `bibliography` npm package
- Parsed fields: `author`, `title`, `year`, `journal`, `url`
- If an entry has a `url` field, it renders as a clickable link; otherwise plain text
- To add a publication: append a new BibTeX entry to `pubs.bibtex`

### Portfolio (`app/portfolio/portfolio_data.tsx`)
```ts
type PortfolioItem = { name: string; link: string; description?: string };
```

### Resources (`app/resources/resource_data.tsx`)
```ts
type Resource = { name: string; link: string };
```

---

## Styling

- **Tailwind CSS v4 (alpha)** — configuration is via PostCSS (`postcss.config.js`); no `tailwind.config.js` file
- **Dark mode** is supported via Tailwind `dark:` variants; the root `<html>` sets `dark:text-white dark:bg-black`
- **Fonts**: Geist Sans and Geist Mono from the `geist` package, applied as CSS variables via Next.js font optimization
- Layout is constrained to `max-w-2xl` centered with `mx-auto` on large screens

---

## Development Workflow

### Commands
```bash
npm run dev      # Start local dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server locally
```

### Pre-commit hook
Husky runs `lint-staged` before every commit. `lint-staged` applies **Prettier** to `*.js`, `*.css`, and `*.md` files. TypeScript/TSX files are **not** auto-formatted by lint-staged (Prettier config is empty defaults).

### Deployment
The site is deployed on **Vercel**. Push to `master` triggers automatic deployment. Vercel Analytics and Speed Insights are integrated via `@vercel/analytics` and `@vercel/speed-insights`.

---

## TypeScript

- `strict: false` but `strictNullChecks: true`
- `baseUrl: "."` — imports use `app/...` paths (e.g. `import { foo } from "app/components/foo"`)
- No path aliases configured; use the `app/` base-relative imports

---

## Key Packages

| Package | Purpose |
|---|---|
| `next` (canary) | Framework (App Router) |
| `tailwindcss` v4 alpha | Styling |
| `geist` | Font family |
| `bibliography` | BibTeX parsing for publications |
| `@vercel/analytics` | Page view analytics |
| `@vercel/speed-insights` | Core Web Vitals tracking |
| `@vercel/blob` | Vercel Blob storage (available, not yet used in UI) |
| `next-mdx-remote` | MDX support (available, not yet used) |
| `sugar-high` | Syntax highlighting (available, not yet used) |
| `husky` + `lint-staged` | Pre-commit formatting |
| `prettier` | Code formatting |

---

## Common Tasks

### Add a news item
Edit `app/news/news_data.tsx` and append a `NewsStory` object to `news_items`.

### Add a publication
Append a BibTeX entry to `app/publications/pubs.bibtex`. Include a `url` field to make it linkable.

### Add a portfolio project
Edit `app/portfolio/portfolio_data.tsx` and append a `PortfolioItem` to `portfolio_data`.

### Add a resource link
Edit `app/resources/resource_data.tsx` and append a `Resource` to `resource_data`.

### Add a new page/route
1. Create `app/<route>/page.tsx` with a default export React component
2. Optionally export `metadata` from the page for SEO
3. Add the route to `navItems` in `app/components/nav.tsx` if it should appear in nav

---

## Git Branching

- Primary branch: `master`
- Claude Code working branches follow the pattern: `claude/<description>-<session-id>`
