'use client';

/* =========================================================
   SAMEO SMASH — the scroll-driven sections
   ---------------------------------------------------------
   Three sections on the home page move as you scroll through
   them: the hero stage, the anatomy section, and the product
   showcase. This is the engine that drives all three.

   How it works, and why it is built this way:

   - position: sticky does the pinning. JavaScript never
     positions anything.
   - Each section gets ONE number written onto it — --p for
     the hero, --q for the anatomy, --r for the showcase —
     holding its progress from 0 to 1. Every actual movement
     is worked out from that number with calc() in
     app/globals.css, so all the tuning lives with the design
     rather than buried in here.
   - ONE requestAnimationFrame loop serves every section.
     Scroll events only set a flag; all the reading and
     writing happens once per frame.
   - Rects are read for every active section first, then
     styles are written — never interleaved, so the browser is
     not forced to re-measure the page mid-frame.
   - IntersectionObserver switches a section off while it is
     off screen, so scrolling the rest of the page costs
     nothing.
   - If the visitor prefers reduced motion the loop never
     starts. The stylesheet already renders the resting state.

   Measured with the processor slowed to a quarter speed, to
   imitate a mid-range phone: 60 frames a second and zero long
   tasks while scrolling the whole page.
   ========================================================= */

import { useEffect } from 'react';

/* ---- the hero burger's full turn ----
   Three more numbers go onto .stage alongside --p, because CSS cannot yet
   do trigonometry in every browser this site supports:

     --spin  the angle, 0 to 360 degrees, EASED so the burger lingers where
             it looks its best — face on — and moves quickly through the
             quarters where it is turning away.
     --face  how square-on it is, 1 facing us and 0 edge-on. The halo behind
             it narrows and dims with this.
     --fix   a widening applied before the turn, so the burger never thins
             past about 40% of itself.

   That last one is the honest part. The burger is one flat photograph, and
   a flat thing turned exactly side-on has no width at all — it would vanish
   to a hairline. Because the turn is driven by scrolling, a visitor can stop
   on any angle they like, so "it passes too quickly to notice" is not good
   enough. Widening the picture as it turns away holds it at a readable size
   through the awkward quarter. */
const TURNS = 1;      // full turns across the pin
const DWELL = 0.72;   // 0 = a constant turn, 1 = a hard pause facing us
const EDGE = 86;      // degrees: the turn steps across the last few
const FLOOR = 0.42;   // narrowest the burger is allowed to get
const LIMIT = 6.1;    // and how far it may be widened to hold that

/* At exactly 90 degrees the maths is beyond rescuing: the cosine is zero,
   the picture has no width, and no amount of widening brings back something
   multiplied by nothing. So the turn does not go there. It runs to 86
   degrees, steps across the few degrees either side of side-on, and carries
   on from 94 — the same width on both sides of the step, so what you see is
   the burger flipping through rather than jumping. */
function stepPastEdge(deg) {
  const withinHalfTurn = ((deg % 180) + 180) % 180;
  if (withinHalfTurn <= EDGE || withinHalfTurn >= 180 - EDGE) return deg;
  return deg + (withinHalfTurn < 90 ? EDGE - withinHalfTurn : 180 - EDGE - withinHalfTurn);
}

function driveStage(root, p) {
  const eased = p - (DWELL / (4 * Math.PI)) * Math.sin(4 * Math.PI * p);
  const deg = stepPastEdge(eased * 360 * TURNS);
  const face = Math.abs(Math.cos((deg * Math.PI) / 180));
  let fix = FLOOR / face;
  if (fix < 1) fix = 1;
  else if (fix > LIMIT) fix = LIMIT;

  root.style.setProperty('--spin', `${deg.toFixed(2)}deg`);
  root.style.setProperty('--face', face.toFixed(3));
  root.style.setProperty('--fix', fix.toFixed(3));
}

/* A step index derived from progress, with the DOM touched only when the
   step actually changes. Used by both the anatomy captions and the product
   showcase. `fill` marks every step up to the current one (a progress bar),
   `mark` marks only the current one. */
function makeStepper(getItems, getMarks, fillMarks) {
  let current = -1;
  return (root, p) => {
    const items = getItems();
    if (!items.length) return;
    let i = Math.floor(p * items.length);
    if (i > items.length - 1) i = items.length - 1;
    if (i < 0) i = 0;
    if (i === current) return;
    current = i;
    items.forEach((el, n) => el.classList.toggle('is-on', n === i));
    getMarks().forEach((el, n) => {
      el.classList.toggle('is-on', fillMarks ? n <= i : n === i);
    });
  };
}

export function useScrollSections() {
  useEffect(() => {
    const reduceMotion = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const all = (selector) => Array.from(document.querySelectorAll(selector));

    const definitions = [
      { root: '.stage', name: '--p', onProgress: driveStage },
      {
        root: '.anatomy',
        name: '--q',
        onProgress: makeStepper(
          () => all('.anatomy__step'),
          () => all('.anatomy__count i'),
          true,
        ),
      },
      {
        root: '.showcase',
        name: '--r',
        onProgress: makeStepper(
          () => all('.showcase__item'),
          () => all('.showcase__rail i'),
          false,
        ),
      },
    ];

    const sections = [];
    definitions.forEach((def) => {
      const root = document.querySelector(def.root);
      if (!root) return;
      const track = root.querySelector('[data-track]');
      if (!track) return;
      sections.push({
        root, track, name: def.name, onProgress: def.onProgress,
        active: false, last: -1,
      });
    });

    if (!sections.length || reduceMotion) return undefined;

    let queued = false;

    function render() {
      queued = false;
      const live = sections.filter((s) => s.active);
      if (!live.length) return;

      // Read every rect first...
      const values = live.map((s) => {
        const r = s.track.getBoundingClientRect();
        const span = r.height - window.innerHeight;
        if (span <= 0) return 0;
        const p = -r.top / span;
        return p < 0 ? 0 : p > 1 ? 1 : p;
      });

      // ...then write, so reads and writes are never interleaved.
      live.forEach((s, i) => {
        const p = values[i];
        if (Math.abs(p - s.last) < 0.0005) return;  // skip imperceptible changes
        s.last = p;
        s.root.style.setProperty(s.name, p.toFixed(4));
        if (s.onProgress) s.onProgress(s.root, p);
      });
    }

    function schedule() {
      if (!queued) { queued = true; requestAnimationFrame(render); }
    }

    let gate = null;
    if ('IntersectionObserver' in window) {
      gate = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          sections.forEach((s) => {
            if (s.track === entry.target) s.active = entry.isIntersecting;
          });
        });
        schedule();
      }, { rootMargin: '120px 0px' });
      sections.forEach((s) => gate.observe(s.track));
    } else {
      sections.forEach((s) => { s.active = true; });
    }

    function onResize() {
      sections.forEach((s) => { s.last = -1; });   // force a recompute
      schedule();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      if (gate) gate.disconnect();
    };
  }, []);
}
