/* The page itself is a client component — it has state, scroll
   listeners and a language that changes in the browser. This wrapper
   stays on the server so it can carry the search-engine metadata,
   which a client component is not allowed to export. */

import AboutView from './AboutView';

export const metadata = {
  title: 'About — Sameo Smash | Smash Burger Kitchen in Tbilisi',
  description: 'About Sameo Smash — a smash burger kitchen on Vashlovani Street in Tbilisi, built around hard-pressed patties, crisp caramelised edges and food made to order.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About — Sameo Smash',
    description: 'A smash burger kitchen on Vashlovani Street in Tbilisi, built around one thing done properly.',
    url: '/about/',
  },
};

export default function Page() {
  return <AboutView />;
}
