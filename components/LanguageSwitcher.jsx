'use client';

/* Two shapes of the same control. On a phone there is no room beside the
   logo for three pills, so a single button showing the current language
   reopens the full-screen chooser instead. CSS decides which is on.

   `chosen`, not `lang`, decides which pill is lit — see the note in
   lib/language.jsx. Before a visitor has picked anything the language in
   force reads "en", and marking it would light EN up in the header while
   the chooser is still asking them. */

import { LANGS, LANG_LABELS, useLanguage } from '../lib/language';

export default function LanguageSwitcher() {
  const { lang, chosen, setLang, openGate } = useLanguage();
  const active = chosen ? lang : null;

  return (
    <div className="langpick" role="group" aria-label="Language">
      <button
        className="langpick__now"
        type="button"
        aria-haspopup="dialog"
        aria-label="Change language"
        onClick={() => openGate()}
      >
        {LANG_LABELS[lang]}
      </button>
      <span className="langpick__opts">
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            className={code === active ? 'is-on' : undefined}
            aria-pressed={code === active ? 'true' : 'false'}
            onClick={() => setLang(code)}
          >
            {LANG_LABELS[code]}
          </button>
        ))}
      </span>
    </div>
  );
}
