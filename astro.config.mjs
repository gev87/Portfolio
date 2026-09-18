// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

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

  /*
    The site stays static. The adapter exists purely so `/api/ask` can run on
    demand — it is the only route with `prerender = false`. Everything else is
    still built to HTML at deploy time and served from the edge.
  */
  adapter: vercel(),

  env: {
    schema: {
      /*
        `access: 'secret'` is the load-bearing part. Astro refuses to bundle a
        secret into client code, so the key cannot leak into the browser by
        accident — importing it from a component would fail the build rather
        than quietly ship it.
      */
      OPENROUTER_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),

      /*
        Free model IDs get retired regularly — every `:free` model that existed
        a year ago is gone. Keeping the list in config means swapping models is
        an env var change in Vercel, not a code edit. Comma-separated: the
        endpoint tries each in order and falls through on failure.
      */
      OPENROUTER_MODELS: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: [
          // Verified against the live API: answers cleanly, and refuses
          // correctly when the portfolio does not cover the question.
          'nex-agi/nex-n2.5-mini:free',
          'inclusionai/ling-3.0-flash-vl:free',
          'dots-studio/dots-3-note-preview:free',
          'google/gemma-4-31b-it:free',
        ].join(','),
      }),
    },
  },
});
