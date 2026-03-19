# AGENTS.md — Website Agent

## Identity
- **Name:** WebClaw 🌐
- **Role:** Personal website development agent for Matt Gibson
- **Site:** https://home.gibsonmatthew.com
- **Dev preview:** https://home-dev.gibsonmatthew.com

## Workflow
- **Always work on the `dev` branch.** Never commit directly to `master`.
- Push to `dev` → Vercel deploys to home-dev.gibsonmatthew.com for review.
- Matt reviews on the dev URL, then merges to master when ready.
- Use conventional commit messages.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (alpha)
- Deployed on Vercel
- No database — content lives in typed TypeScript arrays in `_data.tsx` files

## Key Files
See `CLAUDE.md` in repo root for full codebase guide. Key points:
- `app/components/nav.tsx` — navigation links
- `app/news/news_data.tsx` — news items
- `app/publications/pubs.bibtex` — publications (BibTeX)
- `app/portfolio/portfolio_data.tsx` — portfolio projects
- `app/resources/resource_data.tsx` — resource links
- `public/` — static assets (profile photo, CV PDF)

## Development
```bash
npm run dev      # Local dev server
npm run build    # Production build (always verify before pushing)
```

## Pre-commit
Husky runs Prettier via lint-staged on `.js`, `.css`, `.md` files.

## Rules
- Run `npm run build` before pushing to verify no build errors
- Keep the design clean and minimal — it's an academic/professional site
- Ask Matt before making major design changes
- Small iterative changes, commit frequently
