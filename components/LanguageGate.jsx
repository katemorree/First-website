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
   ========================================================= */

import { useEffect, useRef } from 'react';
import { SITE } from '../lib/site';
import { LANG_LABELS, LANG_NAMES, useLanguage } from '../lib/language';

const OPTIONS = [
  { code: 'en', prompt: 'Choose your language' },
  { code: 'ru', prompt: 'Выберите язык' },
  { code: 'ka', prompt: 'აირჩიეთ ენა' },
];

export default function LanguageGate() {
  const { lang, setLang, gateOpen, closeGate, ready } = useLanguage();
  const gateRef = useRef(null);
  const openerWasStored = useRef(false);

  /* On a first visit there is nothing to go back to, so Escape does not
     apply. Once a language is in force, reopening it is a change of mind
     the visitor is allowed to abandon. */
  useEffect(() => {
    openerWasStored.current = ready && !gateOpen ? true : openerWasStored.current;
  }, [ready, gateOpen]);

  useEffect(() => {
    if (!gateOpen || !gateRef.current) return undefined;
    const gate = gateRef.current;
    const current = gate.querySelector('.is-on') || gate.querySelector('button');
    if (current) current.focus();

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
              className={`langgate__opt${o.code === lang ? ' is-on' : ''}`}
              type="button"
              lang={o.code === 'en' ? undefined : o.code}
              onClick={() => { setLang(o.code); closeGate(); }}
            >
              <b>{LANG_NAMES[o.code]}</b>
              <small>{LANG_LABELS[o.code]}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
