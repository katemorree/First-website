'use client';

/* =========================================================
   The browser tab, in the visitor's language.
   ---------------------------------------------------------
   The <title> Next writes into each page is English, and it
   stays English: that is what a search engine reads, and it
   is correct for them. This swaps the tab text afterwards, in
   the browser, so a Russian or Georgian visitor sees their
   own language on the tab.

   Pass the English title. It is the key, like every other
   piece of text on the site.

   Why it assigns document.title rather than rendering a
   <title> element. Rendering one does work — React puts it in
   the head — but Next has already put its own there, and when
   a page has more than one title the browser uses the first
   it finds and ignores the rest. Assigning document.title
   speaks to the browser directly and settles the question.
   ========================================================= */

import { useEffect } from 'react';
import { useLanguage, translate } from './language';

export function PageTitle({ children }) {
  const { lang, ready } = useLanguage();

  useEffect(() => {
    // `ready` means the stored language has been read, so this does not
    // briefly write the English title over itself on the way past.
    if (!ready) return undefined;

    const wanted = translate(lang, children);
    const apply = () => { if (document.title !== wanted) document.title = wanted; };
    apply();

    // React is still finishing hydration when the line above runs, and part
    // of that is reconciling the <title> Next put in the head — which puts
    // the English back. On a heavy page (the menu, with fifteen product
    // cards) that can happen several frames later, so watching for it is
    // more reliable than guessing at a delay. The watch stops after three
    // seconds; by then hydration is long finished and nothing else on the
    // site touches the title.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    const stop = setTimeout(() => observer.disconnect(), 3000);

    return () => { observer.disconnect(); clearTimeout(stop); };
  }, [lang, ready, children]);

  return null;
}
