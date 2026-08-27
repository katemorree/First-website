'use client';

/* =========================================================
   SAMEO SMASH — language system (English / Русский / ქართული)
   ---------------------------------------------------------
   How it works, in plain terms:

   1. English is the source. It is what is written in the
      components, and it is the key used to look everything
      else up. There is no separate list of invented key names
      to keep in step.
   2. Wrap any text a visitor reads in <T>:

          <h2><T>Order Your Smash</T></h2>

   3. lib/i18n-data.js holds the Russian and Georgian, looked
      up by that English text. A missing entry stays in
      English — nothing ever goes blank.
   4. The choice is saved in the browser (localStorage) so a
      visitor is only asked once.

   To change a piece of English: change it in the component,
   then change the matching key in lib/i18n-data.js so the two
   still match.

   One detail worth knowing. The site is built as static files,
   so every page is generated in English ahead of time and the
   real language is applied in the browser a moment later. That
   would mean a flash of English for a Russian or Georgian
   visitor, so the page is held back for that moment — see the
   boot script in app/layout.jsx.
   ========================================================= */

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { TRANSLATIONS } from './i18n-data';

export const LANGS = ['en', 'ru', 'ka'];
export const LANG_NAMES = { en: 'English', ru: 'Русский', ka: 'ქართული' };

/* The short label shown on the buttons — and the one place where what a
   visitor reads differs from what the code calls it.

   Georgian is `ka` everywhere that matters: it is the correct language code,
   it is what goes in the lang attribute, what is saved in the browser, and
   what keys the translation table. But GE is what people in Georgia
   recognise, being the country code they see on everything else. So the
   label says GE and the code stays ka.

   Never derive these from the language code itself. Two of the three happen
   to match, which is exactly what would make a .toUpperCase() look correct
   right up until someone notices the third. */
export const LANG_LABELS = { en: 'EN', ru: 'RU', ka: 'GE' };
const STORAGE = 'sameo-lang';

/* Text written across several lines in JSX arrives with newlines and
   indentation in it. "Two    words" and "Two words" are the same string as
   far as a reader is concerned, so everything is compared with runs of
   whitespace squashed to one space. */
function squash(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

/* Built once: the same table, re-keyed on its squashed form. */
const TABLE = Object.fromEntries(
  LANGS.map((lang) => [
    lang,
    Object.fromEntries(
      Object.entries(TRANSLATIONS[lang] || {}).map(([k, v]) => [squash(k), v]),
    ),
  ]),
);

export function translate(lang, english) {
  const source = squash(english);
  if (lang === 'en') return source;
  return (TABLE[lang] && TABLE[lang][source]) || source;
}

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  ready: false,
  /* Whether the visitor has actually picked a language, which is NOT the
     same question as which language is in force. `lang` starts as English
     because the pages are generated in English and the first render has to
     match — so on a first visit it reads "en" while the visitor has chosen
     nothing at all. Anything that shows a language as selected has to ask
     this instead, or English arrives pre-selected on a screen whose whole
     purpose is to ask. */
  chosen: false,
  gateOpen: false,
  openGate: () => {},
  closeGate: () => {},
});

/* Safari in private mode throws on localStorage, so every access is
   wrapped: the site must still work, it just forgets. */
function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE);
    return LANGS.includes(value) ? value : null;
  } catch (e) {
    return null;
  }
}
function writeStored(lang) {
  try { window.localStorage.setItem(STORAGE, lang); } catch (e) { /* ignore */ }
}

export function LanguageProvider({ children }) {
  /* Starts as English on purpose. The page was generated in English, so the
     first render in the browser has to match it or React complains that the
     two do not agree. The stored choice is applied immediately afterwards,
     while the page is still held back. */
  const [lang, setLangState] = useState('en');
  const [ready, setReady] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) { setLangState(stored); setChosen(true); }
    else setGateOpen(true);
    setReady(true);
  }, []);

  /* Let the page show once the right language is in place. */
  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.remove('lang-boot');
  }, [ready]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('lang-choosing', gateOpen);
  }, [gateOpen]);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    writeStored(next);
    setLangState(next);
    setChosen(true);
  }, []);

  const value = useMemo(() => ({
    lang,
    setLang,
    ready,
    chosen,
    gateOpen,
    openGate: () => setGateOpen(true),
    closeGate: () => setGateOpen(false),
  }), [lang, setLang, ready, chosen, gateOpen]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/* useT()("Order Now") — for places that need a plain string rather than
   elements: a title attribute, an aria-label, the browser tab. */
export function useT() {
  const { lang } = useLanguage();
  return useCallback((english) => translate(lang, english), [lang]);
}

/**
 * <T>Some English</T>
 *
 * A handful of headings are split over two lines with <br>, because word
 * order differs between the three languages and they cannot be translated
 * in pieces. Those come out of the table as real markup, so they are
 * rendered as HTML — the strings come from our own translation file, never
 * from anything a visitor typed.
 */
export function T({ children }) {
  const { lang } = useLanguage();
  const english = typeof children === 'string'
    ? children
    : Array.isArray(children) ? children.join('') : String(children ?? '');
  const text = translate(lang, english);

  if (text.includes('<br>')) {
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <>{text}</>;
}
