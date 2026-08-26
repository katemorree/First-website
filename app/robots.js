import { SITE } from '../lib/site';

/* The site is exported as static files, so this is written once at
   build time rather than worked out per request. */
export const dynamic = 'force-static';

/* Generates robots.txt at build time. */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
