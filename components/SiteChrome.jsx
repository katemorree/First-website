'use client';

/* Everything that surrounds a page: the skip link, the header, the footer,
   the phone action bar, the language chooser and the order chooser. Wrapped
   round each page's own content so there is one copy of all of it. */

import Navbar from './Navbar';
import Footer from './Footer';
import ActionBar from './ActionBar';
import LanguageGate from './LanguageGate';
import { OrderProvider } from './OrderProvider';
import { T } from '../lib/language';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function SiteChrome({ children }) {
  useScrollReveal();

  return (
    <OrderProvider>
      <a className="skip-link" href="#main"><T>Skip to content</T></a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <ActionBar />
      <LanguageGate />
    </OrderProvider>
  );
}
