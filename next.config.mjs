/**
 * Next.js configuration for Sameo Smash.
 *
 * The site is published on GitHub Pages, which serves files and nothing
 * else — there is no server running Next.js behind it. So the build is a
 * STATIC EXPORT: `npm run build` writes a folder of plain HTML, CSS and
 * JavaScript into `out/`, and that folder is what gets published.
 *
 * Two consequences worth knowing about:
 *
 * 1. basePath. GitHub Pages serves this repository at
 *    katemorree.github.io/First-website/ — inside a folder, not at the root
 *    of the domain. Every link and every image path has to carry that
 *    folder or they all 404. If you ever put the site on its own domain
 *    (sameosmash.ge, say), set BASE_PATH to an empty string.
 *
 * 2. images.unoptimized. Next's image optimiser resizes pictures on demand,
 *    which needs a server. There isn't one, so it is switched off. The
 *    product photos do not lose anything by this: they already ship as four
 *    hand-made WebP sizes each with a PNG fallback, which is the same job
 *    done ahead of time. See README section 3.
 */

const basePath = process.env.BASE_PATH ?? '/First-website';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  // Written into the pages so components can build image paths that work
  // both locally and on GitHub Pages.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  // GitHub Pages serves /about/ as /about/index.html, so folders it is.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
