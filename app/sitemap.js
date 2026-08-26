import { SITE } from '../lib/site';

/* The site is exported as static files, so this is written once at
   build time rather than worked out per request. */
export const dynamic = 'force-static';

/* Generates sitemap.xml at build time. Add a page here when you add one to
   the site, so search engines know to look for it. */
const PAGES = [
  { path: '/', priority: 1.0 },
  { path: '/menu/', priority: 0.9 },
  { path: '/about/', priority: 0.7 },
  { path: '/contact/', priority: 0.8 },
];

export default function sitemap() {
  const lastModified = new Date();
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
