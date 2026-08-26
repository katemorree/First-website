'use client';

/* =========================================================
   SAMEO SMASH — reveal on scroll
   ---------------------------------------------------------
   Anything marked data-reveal fades up as it comes into view.
   Put data-reveal-group on a container and its children come
   in one after another instead of all together.

   This is an enhancement and nothing more. The hidden state
   lives behind the .js class, which the boot script in
   app/layout.jsx sets. If JavaScript is blocked or fails,
   every section simply renders visible rather than staying
   stuck at nothing.
   ========================================================= */

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // Give grouped children an incremental delay so they cascade in.
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
      });
    });

    const items = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      // Older browsers: show everything immediately.
      items.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
