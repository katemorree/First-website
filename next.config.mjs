/**
 * Next.js configuration for Sameo Smash.
 *
 * `npm run build` writes a folder of plain HTML, CSS and JavaScript into
 * `out/`. That works on any host that can serve files, which keeps the
 * options open — Vercel and GitHub Pages both take it as it is.
 *
 * TWO SETTINGS DIFFER BY HOST, and both have sensible defaults, so the
 * common case needs no configuration at all.
 *
 * 1. BASE_PATH — the folder the site lives in.
 *
 *    On Vercel (and on a domain of its own) the site is at the root of the
 *    domain, so this is empty. That is the default.
 *
 *    GitHub Pages is the odd one out: it serves this repository from
 *    /First-website/, and every link and image has to carry that folder or
 *    they all 404. The workflow in .github/workflows/deploy.yml sets
 *    BASE_PATH for exactly that reason.
 *
 * 2. SITE_URL — the address the site answers on.
 *
 *    Used for the canonical tags, the Open Graph tags, sitemap.xml,
 *    robots.txt and the restaurant's structured data. Getting it wrong does
 *    not break the site, but it does tell search engines the wrong address.
 *
 *    On Vercel this is worked out automatically from the deployment. Set
 *    SITE_URL by hand once there is a real domain.
 *
 * One more thing about images. Next's image optimiser resizes pictures on
 * demand, which needs a server; a folder of files has none, so it is off.
 * The product photos lose nothing by it — they already ship as four
 * hand-made WebP sizes each with a PNG fallback, which is the same job done
 * ahead of time. See README section 3.
 */

const basePath = process.env.BASE_PATH ?? '';

/* Vercel exposes the production domain to the build, so a deployment there
   describes itself correctly without anything being configured. */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

const siteUrl = process.env.SITE_URL
  ?? vercelUrl
  ?? 'https://katemorree.github.io/First-website';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  /* Written into the pages so components can build paths that work wherever
     the site is deployed. */
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  images: { unoptimized: true },
  /* So /about is served as /about/index.html, which is what a plain file
     host expects. */
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
