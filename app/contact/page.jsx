/* The page itself is a client component — it has state, scroll
   listeners and a language that changes in the browser. This wrapper
   stays on the server so it can carry the search-engine metadata,
   which a client component is not allowed to export. */

import ContactView from './ContactView';

export const metadata = {
  title: 'Location & Contact — Sameo Smash | 1 Vashlovani St, Tbilisi',
  description: 'Find Sameo Smash at 1 Vashlovani St, Tbilisi 0108. Open every day 12:00–02:00. Call +995 511 10 08 35, or order for delivery through Wolt and Glovo.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Location & Contact — Sameo Smash',
    description: '1 Vashlovani St, Tbilisi. Open daily 12:00–02:00. Delivery via Wolt and Glovo.',
    url: '/contact/',
  },
};

export default function Page() {
  return <ContactView />;
}
