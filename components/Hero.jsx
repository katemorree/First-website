'use client';

/* =========================================================
   The pinned hero.
   ---------------------------------------------------------
   lib/useScrollSections.js writes --p (0 to 1) onto .stage as
   you scroll through the track. Every movement — the copy
   clearing, the wordmark drifting, and the burger coming
   apart layer by layer — is worked out from that one number
   with calc() in app/globals.css. With no JavaScript it falls
   back to the resting state: everything visible, the burger
   assembled.
   ========================================================= */

import Link from 'next/link';
import { T } from '../lib/language';
import ExplodedBurger from './ExplodedBurger';
import { useOrder } from './OrderProvider';

const FACTS = [
  ['Burgers from ₾20', 'Smashed to order'],
  ['12:00 – 02:00', 'Open every day'],
  ['Vashlovani St', 'Tbilisi 0108'],
];

export default function Hero() {
  const { openOrder } = useOrder();

  return (
    <section className="stage">
      <div className="stage__track" data-track>
        <div className="stage__pin">
          <div className="stage__glow" aria-hidden="true" />
          <span className="stage__wordmark" aria-hidden="true">SAMEO</span>

          <div className="wrap stage__grid">
            <div className="stage__copy">
              <p className="eyebrow stage__fade"><T>Vashlovani St · Tbilisi</T></p>
              <h1 className="stage__title">
                <span className="stage__line stage__line--a"><T>Smashed hard.</T></span>
                <span className="stage__line stage__line--b"><T>Served fast.</T></span>
              </h1>
              <div>
                <p className="hero__sub stage__fade">
                  <T>
                    Smash burgers, sliders, fries and shakes — pressed to order on the
                    flat-top and built for people who take a burger seriously.
                  </T>
                </p>

                {/* stage__hold, not stage__fade: the two calls to action are
                    the point of the page, so they stay at full strength
                    through most of the pin instead of clearing with the
                    supporting copy. */}
                <div className="btn-row stage__hold">
                  <Link className="btn btn--primary" href="/menu/"><T>View Menu</T></Link>
                  <a
                    className="btn btn--ghost"
                    href="/contact/#order"
                    onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
                  >
                    <T>Order Now</T>
                  </a>
                </div>

                <div className="hero__facts stage__fade">
                  {FACTS.map(([big, small]) => (
                    <div className="hero__fact" key={big}>
                      <b><T>{big}</T></b><span><T>{small}</T></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* .stage__art travels and scales, .stage__halo is the light
                behind it, and ExplodedBurger is the stack of ingredients
                that comes apart as you scroll. */}
            <div className="stage__art">
              <div className="stage__halo" aria-hidden="true" />
              <ExplodedBurger />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
