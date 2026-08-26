/* The page itself is a client component — it has state, scroll
   listeners and a language that changes in the browser. This wrapper
   stays on the server so it can carry the search-engine metadata,
   which a client component is not allowed to export. */

import MenuView from './MenuView';

export const metadata = {
  title: 'Menu & Prices — Sameo Smash | Burgers, Sliders & Shakes in Tbilisi',
  description: 'The full Sameo Smash menu with prices: cheeseburger ₾25, chili cheeseburger and truffle burger ₾27.50, veggie burger ₾20, plus sliders, fries, sauces, cookies, shakes, coffee and drinks.',
  alternates: { canonical: '/menu/' },
  openGraph: {
    title: 'Menu & Prices — Sameo Smash',
    description: 'Burgers from ₾20, sliders, fries, sauces, cookies, shakes, coffee and drinks in Tbilisi.',
    url: '/menu/',
  },
};

export default function Page() {
  return <MenuView />;
}
