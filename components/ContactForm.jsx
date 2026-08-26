'use client';

/* =========================================================
   The contact form.
   ---------------------------------------------------------
   To make it deliver real email, create a free form at
   https://formspree.io and paste its endpoint URL into
   FORM_ENDPOINT below. Until then the form politely directs
   visitors to the phone number rather than pretending to
   send something. Full instructions: README section 4.
   ========================================================= */

import { useRef, useState } from 'react';
import { SITE } from '../lib/site';
import { T, useT } from '../lib/language';

const FORM_ENDPOINT = '';

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);   // { message, ok }
  const [sending, setSending] = useState(false);
  const t = useT();

  async function onSubmit(e) {
    e.preventDefault();
    const form = formRef.current;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus({ ok: false, message: t('Please check the highlighted fields and try again.') });
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus({
        ok: true,
        message: `${t('Thanks for reaching out. For the fastest reply, please call us on')} ${SITE.phone}.`,
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus({ ok: true, message: t("Thanks! Your message has been sent — we'll get back to you soon.") });
    } catch (err) {
      setStatus({ ok: false, message: `${t('Sorry, something went wrong. Please call us on')} ${SITE.phone}.` });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="form"
      id="contact-form"
      method="post"
      noValidate
      data-reveal
      ref={formRef}
      onSubmit={onSubmit}
      action={FORM_ENDPOINT || undefined}
    >
      <div className="form__grid">
        <div className="field">
          <label htmlFor="name"><T>Name</T></label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone"><T>Phone</T></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field field--full">
          <label htmlFor="email"><T>Email</T></label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field field--full">
          <label htmlFor="message-text"><T>Message</T></label>
          <textarea id="message-text" name="message" required />
        </div>
      </div>

      <button className="btn btn--primary btn--block" type="submit" disabled={sending}>
        {sending ? <T>Sending…</T> : <T>Send Message</T>}
      </button>
      <p style={{ fontSize: 'var(--step--1)', margin: 'var(--sp-3) 0 0', textAlign: 'center' }}>
        <T>We&apos;ll only use your details to reply to your message.</T>
      </p>
      <div
        className={`form__status${status ? ` is-shown ${status.ok ? 'is-ok' : 'is-err'}` : ''}`}
        id="form-status"
        role="status"
        aria-live="polite"
      >
        {status ? status.message : ''}
      </div>
    </form>
  );
}
