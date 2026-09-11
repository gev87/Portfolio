# Portfolio — Gevorg Petrosyan

Static portfolio site. Astro 7, zero client JavaScript, one self-hosted
variable font.

Two landing pages serve two kinds of application:

- `/react` — frontend engineering (React, Next.js, TypeScript)
- `/webflow` — Webflow builds extended with custom JavaScript

Both render from the same components with different content. The homepage
shows both and lets the visitor pick.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the build locally
```

If a change doesn't show up in dev, the content or Vite cache has gone stale:

```bash
npx astro dev stop && rm -rf .astro node_modules/.vite && npm run dev
```

## Adding content

Everything on the site comes from typed Markdown collections. No component
edits needed.

**A new project** — add a file to `src/content/projects/`:

```markdown
---
title: Client Name
summary: One line describing the build.
track: webflow          # react | webflow | both
url: https://example.com
client: Client Name
role: Full build, Figma to launch
year: 2026
stack: [Webflow, CMS, SEO]
featured: false
order: 80               # lower sorts first within the track
---

Optional Markdown body becomes the case study on /work/<filename>.
```

**A new role** — add a file to `src/content/experience/`. See
`src/content.config.ts` for the full schema; the build fails on a bad field
rather than shipping a broken page.

**Copy that isn't a project or role** — the two track pitches, proof figures,
skills and contact details live in `src/data/profile.ts`.

## Fonts

One self-hosted variable font (Archivo, latin subset, 88 KB) covers the whole
site by using the family's width axis for display type. It is preloaded, so
there are no third-party font requests.

After bumping `@fontsource-variable/archivo`, re-copy the file:

```bash
npm run fonts
```

## Deploying

Static output, so any static host works. Build command `npm run build`,
output directory `dist`.

Currently deployed on Vercel, redeploying on every push to `main`:
<https://gevorg-petrosyan-portfolio.vercel.app>

### Canonical URLs

`astro.config.mjs` resolves the site URL from the build environment rather
than hardcoding it:

| Source | Set by | Used for |
| --- | --- | --- |
| `SITE_URL` | you, in Vercel → Settings → Environment Variables | a custom domain |
| `VERCEL_PROJECT_PRODUCTION_URL` | Vercel, automatically | production builds |
| `VERCEL_URL` | Vercel, automatically | preview deployments |
| fallback | — | local dev |

Production uses the stable production domain so canonicals don't churn on
every deploy, and each preview points at itself rather than claiming to be
the production page.

This matters: a canonical tag pointing at a domain you don't control tells
search engines to index that address instead of the live site.

### Adding a custom domain

1. Add the domain in Vercel → Settings → Domains, and follow the DNS records
   it gives you
2. Add `SITE_URL=https://yourdomain.com` in Settings → Environment Variables
   (Production scope)
3. Redeploy — canonicals follow automatically, no code change
