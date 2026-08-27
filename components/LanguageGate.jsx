'use client';

/* =========================================================
   The full-screen language chooser.
   ---------------------------------------------------------
   Shown once, on a first visit, before the visitor sees the
   site. After that the choice is remembered and this only
   comes back if they ask for it — through the single-button
   form of the header switcher, which is what a phone gets.

   Deliberately NOT translated: it is the one screen that has
   to speak all three languages at once, because the visitor
   has not told us which one they read yet.

   NOTHING IS HIGHLIGHTED UNTIL SOMETHING IS CHOSEN. That is
   what `chosen` is for. The language in force reads "en" on a
   first visit — the pages are generated in English and the
   first render has to match — so marking the current language
   would put an orange border around English on a screen whose
   entire job is to ask, which answers the question for the
   visitor before they have looked at it. The accent appears
   the moment they pick, and not before.
   ========================================================= */

import { useEffect, useRef, useState } from 'react';
import { SITE } from '../lib/site';
import { LANG_LABELS, LANG_NAMES, useLanguage } from '../lib/language';

const OPTIONS = [
  { code: 'en', prompt: 'Choose your language' },
  { code: 'ru', prompt: 'Выберите язык' },
  { code: 'ka', prompt: 'აირჩიეთ ენა' },
];

export default function LanguageGate() {
  const { lang, chosen, setLang, gateOpen, closeGate, ready } = useLanguage();
  /* Held for the length of the fade-out so the card the visitor tapped
     lights up and stays lit while the screen clears, instead of the
     accent flashing on and vanishing with it. */
  const [picked, setPicked] = useState(null);
  const gateRef = useRef(null);
  const openerWasStored = useRef(false);

  /* On a first visit there is nothing to go back to, so Escape does not
     apply. Once a language is in force, reopening it is a change of mind
     the visitor is allowed to abandon. */
  useEffect(() => {
    openerWasStored.current = ready && !gateOpen ? true : openerWasStored.current;
  }, [ready, gateOpen]);

  useEffect(() => {
    if (gateOpen) setPicked(null);
  }, [gateOpen]);

  useEffect(() => {
    if (!gateOpen || !gateRef.current) return undefined;
    const gate = gateRef.current;
    /* Focus the dialog, NOT the first option. Focusing a button gives it a
       focus ring, and a ring on English is exactly the "one of them looks
       picked already" this screen must not have. Tab moves into the three
       from here, and a screen reader still announces the dialog on open. */
    gate.focus();

    const onKey = (e) => {
      if (e.key === 'Escape' && openerWasStored.current) { closeGate(); return; }
      if (e.key !== 'Tab') return;
      const all = gate.querySelectorAll('button');
      const edge = e.shiftKey ? all[0] : all[all.length - 1];
      if (document.activeElement === edge) {
        e.preventDefault();
        (e.shiftKey ? all[all.length - 1] : all[0]).focus();
      }
    };
    gate.addEventListener('keydown', onKey);
    return () => gate.removeEventListener('keydown', onKey);
  }, [gateOpen, closeGate]);

  if (!gateOpen) return null;

  return (
    <div
      className="langgate"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language"
      tabIndex={-1}
      ref={gateRef}
    >
      <div className="langgate__inner">
        <p className="langgate__brand">
          SAMEO SMASH<em lang="ka">{SITE.nameKa}</em>
        </p>
        <p className="langgate__title">
          {OPTIONS.map((o) => (
            <span key={o.code} lang={o.code === 'en' ? undefined : o.code}>{o.prompt}</span>
          ))}
        </p>
        <div className="langgate__opts">
          {OPTIONS.map((o) => (
            <button
              key={o.code}
              /* is-on marks a real choice, never a default. On a first visit
                 all three are identical. */
              className={`langgate__opt${
                (picked || (chosen && lang)) === o.code ? ' is-on' : ''}`}
              type="button"
              lang={o.code === 'en' ? undefined : o.code}
              aria-pressed={(picked || (chosen && lang)) === o.code}
              onClick={() => { setPicked(o.code); setLang(o.code); closeGate(); }}
            >
              <span className="langgate__code">{LANG_LABELS[o.code]}</span>
              <b>{LANG_NAMES[o.code]}</b>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
