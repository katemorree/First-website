'use client';

import Link from 'next/link';
import SiteChrome from '../../components/SiteChrome';
import { SITE } from '../../lib/site';
import { T } from '../../lib/language';
import { PageTitle } from '../../lib/PageTitle';
import { useOrder } from '../../components/OrderProvider';

const RULES = [
  ['01', 'Smashed<br>to Order', 'Nothing is cooked in advance and held under a lamp. Your burger starts when your order does.'],
  ['02', 'Crust<br>First', 'Hard press, hot surface, no fiddling. The caramelised edge is what separates a smash from a patty.'],
  ['03', 'A Short<br>Menu', 'Burgers, sliders, sides, sauces and shakes. Fewer things, taken more seriously.'],
  ['04', 'Built to<br>Travel', 'Packed to travel, whether you collect it yourself or order through Wolt or Glovo.'],
  ['05', 'Coffee<br>Too', 'Coffee, shakes and cold drinks, so the whole order comes from one kitchen.'],
  ['06', 'Right Here<br>in Tbilisi', 'One kitchen at 1 Vashlovani St, Tbilisi 0108, open every day from 12:00 to 02:00.'],
];

function AboutContent() {
  const { openOrder } = useOrder();

  return (
    <>
      <PageTitle>{'About — Sameo Smash | Smash Burger Kitchen in Tbilisi'}</PageTitle>
      <section
        className="hero"
        style={{ paddingBlock: 'clamp(3rem,2.5rem+4vw,5.5rem) var(--sp-6)' }}
      >
        <div className="hero__glow" aria-hidden="true" />
        <div className="wrap split">
          <div data-reveal>
            <p className="eyebrow"><T>About Us</T></p>
            <h1><T>{'One Thing,<br>Done Properly'}</T></h1>
            <p className="lead">
              {/* The Georgian name sits mid-sentence, so the translated part
                  is the span around it rather than the whole paragraph. */}
              Sameo Smash — <span lang="ka">{SITE.nameKa}</span>{' '}
              <span>
                <T>— is a smash burger kitchen on Vashlovani Street in Tbilisi.</T>
              </span>
            </p>
            <p>
              <T>
                The whole idea sits in the name. A smash burger isn&apos;t shaped or moulded — it&apos;s
                pressed hard onto a hot flat-top so the surface caramelises and the edges go
                crisp and lacy. That crust is the entire point, and it only happens if the
                burger is cooked the moment you order it.
              </T>
            </p>
            <p>
              <T>
                So that&apos;s what we build around. A short menu instead of a long one, made to
                order instead of made in advance, and packed properly so a takeaway burger
                still tastes like it did in the kitchen.
              </T>
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/menu/"><T>View the Menu</T></Link>
              <Link className="btn btn--ghost" href="/contact/"><T>Find Us</T></Link>
            </div>
          </div>

          <div data-reveal>
            {/* The one place on the site still waiting for a photograph: the
                room itself. Until there is one it draws a brand graphic
                rather than a gap. See README section 3. */}
            <div className="disc shot--interior">
              <p className="disc__label">
                <span><T>{'Made in<br>Tbilisi'}</T></span>
                <small><T>Vashlovani St</T></small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="head head--center" data-reveal>
            <p className="eyebrow"><T>How we work</T></p>
            <h2><T>The Rules We Cook By</T></h2>
          </div>

          <div className="grid grid--3" data-reveal data-reveal-group>
            {RULES.map(([num, title, body]) => (
              <div className="card tile" key={num}>
                <p className="tile__num">{num}</p>
                <h3><T>{title}</T></h3>
                <p><T>{body}</T></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band" data-reveal>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              <T>Come and try it</T>
            </p>
            <h2><T>Order Your Smash</T></h2>
            <p className="lead">
              <T>Call the kitchen for takeaway and delivery, or find us on Vashlovani Street.</T>
            </p>
            <div className="btn-row btn-row--center">
              <a
                className="btn btn--primary"
                href="/contact/#order"
                onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
              >
                <T>Order Now</T>
              </a>
              <Link className="btn btn--ghost" href="/menu/"><T>View the Menu</T></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutView() {
  return (
    <SiteChrome>
      <AboutContent />
    </SiteChrome>
  );
}
