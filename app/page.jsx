/* The page itself is a client component — it has state, scroll
   listeners and a language that changes in the browser. This wrapper
   stays on the server so it can carry the search-engine metadata,
   which a client component is not allowed to export. */

import HomeView from './HomeView';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomeView />;
}
