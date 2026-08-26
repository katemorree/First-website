/* =========================================================
   SAMEO SMASH — the facts about the business, in one place
   ---------------------------------------------------------
   Everything here is verified from current public listings,
   not confirmed by the owner. See README section 6.

   The phone number, the address and the two delivery links
   used to be repeated across five HTML files, which meant a
   change to any of them was five edits and a chance to miss
   one. They are written once here instead.
   ========================================================= */

export const SITE = {
  name: 'Sameo Smash',
  nameKa: 'სამეო სმეშ',
  /* Worked out at build time from where the site is being deployed — see
     next.config.mjs. Used for the canonical tags, the sitemap and the
     restaurant's structured data. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://katemorree.github.io/First-website',

  phone: '+995 511 10 08 35',
  phoneHref: 'tel:+995511100835',

  street: '1 Vashlovani St',
  city: 'Tbilisi',
  postalCode: '0108',
  country: 'GE',
  addressLine: '1 Vashlovani St, Tbilisi 0108, Georgia',

  hours: '12:00–02:00',
  opens: '12:00',
  closes: '02:00',

  lat: 41.7060776,
  lng: 44.7885149,

  wolt: 'https://wolt.com/en/geo/tbilisi/restaurant/sameo',
  glovo: 'https://glovoapp.com/en/ge/tbilisi/stores/sameo-tbi',
};

export const MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${SITE.lat},${SITE.lng}`;

/* Images live in public/images. On most hosts they are served from the root
   and this is empty; on GitHub Pages the site sits in a folder and every
   path needs that folder in front of it. See next.config.mjs. */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path) {
  return `${BASE}${path}`;
}
