'use client';

/* Two shapes of the same control. On a phone there is no room beside the
   logo for three pills, so a single button showing the current language
   reopens the full-screen chooser instead. CSS decides which is on. */

import { LANGS, useLanguage } from '../lib/language';

export default function LanguageSwitcher() {
  const { lang, setLang, openGate } = useLanguage();

  return (
    <div className="langpick" role="group" aria-label="Language">
      <button
        className="langpick__now"
        type="button"
        aria-haspopup="dialog"
        aria-label="Change language"
        onClick={() => openGate()}
      >
        {lang.toUpperCase()}
      </button>
      <span className="langpick__opts">
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            className={code === lang ? 'is-on' : undefined}
            aria-pressed={code === lang ? 'true' : 'false'}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </span>
    </div>
  );
}
