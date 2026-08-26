'use client';

/* =========================================================
   What we smash — the product showcase.
   ---------------------------------------------------------
   On a wide screen this pins: the burger stays in place while
   the four products hand over to one another and the text
   changes beside them. On a phone, and for anyone who prefers
   reduced motion, the pin is switched off in the CSS and
   these are the same four cards as before.

   The pinned version is entirely an override in
   app/globals.css. Nothing here changes between the two.
   ========================================================= */

import Link from 'next/link';
import { BURGERS } from '../lib/products';
import { T } from '../lib/language';
import ProductCard from './ProductCard';

export default function Showcase() {
  return (
    <section className="section showcase">
      <div className="wrap">
        <div className="head head--center" data-reveal>
          <p className="eyebrow"><T>The line-up</T></p>
          <h2><T>What We Smash</T></h2>
          <p className="lead"><T>Four burgers, all pressed to order on the flat-top.</T></p>
        </div>
      </div>

      <div className="showcase__track" data-track>
        <div className="showcase__pin">
          <div className="showcase__glow" aria-hidden="true" />
          <div className="wrap">
            <div className="grid grid--2 showcase__stack" data-reveal data-reveal-group>
              {BURGERS.map((burger, i) => (
                <ProductCard
                  key={burger.slug}
                  product={burger}
                  className={`showcase__item${i === 0 ? ' is-on' : ''}`}
                >
                  <p className="showcase__num" aria-hidden="true">
                    {`0${i + 1}`}<i>/04</i>
                  </p>
                </ProductCard>
              ))}
            </div>
            <div className="showcase__rail" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="btn-row btn-row--center" style={{ marginTop: 'var(--sp-5)' }} data-reveal>
          <Link className="btn btn--primary" href="/menu/"><T>See the Full Menu</T></Link>
        </div>
      </div>
    </section>
  );
}
