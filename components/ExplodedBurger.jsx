'use client';

/* =========================================================
   The hero burger that comes apart as you scroll.
   ---------------------------------------------------------
   Nine transparent images stacked in one box. They line up
   as a finished burger because they were composed onto a
   shared canvas ahead of time — see lib/burger-layers.js.

   Nothing here animates anything. The stack reads --p, the
   0-to-1 scroll progress that lib/useScrollSections.js
   already writes onto .stage, and every layer works out its
   own movement from it in CSS. So this component renders the
   same markup whether the burger is together or apart, and
   with no JavaScript at all it simply sits assembled.

   About the alt text. Nine images of bun and lettuce read
   out one after another is noise, not a description. The
   pieces are marked decorative and the box carries a single
   role="img" with one sentence describing the burger, which
   is what someone listening actually wants.

   It is in English in all three languages, which is how every
   other photograph on the site is labelled — see the alt
   strings in lib/products.js. Worth fixing one day, but for
   all the images together rather than for this one.
   ========================================================= */

import { asset } from '../lib/site';
import { BURGER_CANVAS, BURGER_LAYERS, BURGER_WIDTHS } from '../lib/burger-layers';

const SIZES = '(max-width: 900px) 74vw, 480px';

export default function ExplodedBurger() {
  return (
    <div
      className="burger"
      role="img"
      aria-label="Sameo double smash cheeseburger, shown as separate layers"
      style={{ '--canvas-w': BURGER_CANVAS.width, '--canvas-h': BURGER_CANVAS.height }}
    >
      {BURGER_LAYERS.map(({ slug }) => (
        <picture key={slug}>
          <source
            type="image/webp"
            sizes={SIZES}
            srcSet={BURGER_WIDTHS
              .map((w) => `${asset(`/images/burger-${slug}-${w}.webp`)} ${w}w`)
              .join(', ')}
          />
          {/* Every layer is eager and high priority, which is unusual and is
              the right call here: the burger is not finished until all nine
              have arrived, so holding any of them back would just show a
              burger with a piece missing. Together they are lighter than the
              single photograph they replaced. */}
          <img
            className={`burger__layer burger__layer--${slug}`}
            src={asset(`/images/burger-${slug}.png`)}
            alt=""
            width={BURGER_CANVAS.width}
            height={BURGER_CANVAS.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      ))}
    </div>
  );
}
