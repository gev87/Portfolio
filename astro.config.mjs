// @ts-check
import { defineConfig } from 'astro/config';

/*
  The canonical URL has to match wherever the page is actually served. Point it
  at a domain we don't control and search engines index that address instead of
  the live site.

  Vercel exposes these at build time, without a protocol:
    VERCEL_PROJECT_PRODUCTION_URL  the stable production domain
    VERCEL_URL                     this specific deployment, changes every build
    VERCEL_ENV                     production | preview | development

  Production uses the stable domain so the canonical does not churn on every
  deploy. Previews use their own URL, so a preview never claims to be the
  production page. SITE_URL overrides everything — set it in Vercel's
  environment variables once a custom domain is live.
*/
const withProtocol = (host) => (host ? `https://${host}` : undefined);

const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_ENV === 'production'
    ? withProtocol(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
      withProtocol(process.env.VERCEL_URL)
    : withProtocol(process.env.VERCEL_URL)) ??
  'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
});
