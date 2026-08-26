'use client';

import Link from 'next/link';
import SiteChrome from '../components/SiteChrome';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Anatomy from '../components/Anatomy';
import Showcase from '../components/Showcase';
import Reviews from '../components/Reviews';
import InfoList from '../components/InfoList';
import { SITE } from '../lib/site';
import { T } from '../lib/language';
import { useScrollSections } from '../lib/useScrollSections';
import { useOrder } from '../components/OrderProvider';
import { PageTitle } from '../lib/PageTitle';

const TILES = [
  ['01', 'Smashed<br>to Order', 'Nothing sits under a lamp waiting for you.'],
  ['02', 'Crisp<br>Edges', "Hard press, hot flat-top. That's the whole trick."],
  ['03', 'Built for<br>Takeaway', 'Packed to travel without falling apart.'],
  ['04', 'Right Here<br>in Tbilisi', 'Find us at 1 Vashlovani St, 0108.'],
];

function HomeContent() {
  useScrollSections();
  const { openOrder } = useOrder();

  return (
    <>
      <PageTitle>{'Sameo Smash — Smash Burgers in Tbilisi | სამეო სმეშ'}</PageTitle>
      <Hero />
      <Marquee />
      <Anatomy />
      <Showcase />

      {/* ---- About teaser ---- */}
      <section className="section section--alt">
        <div className="wrap split">
          <div data-reveal>
            <p className="eyebrow"><T>Who we are</T></p>
            <h2><T>{'One Thing,<br>Done Properly'}</T></h2>
            <p className="lead">
              <T>
                Sameo Smash is a smash burger kitchen in Tbilisi built around a single idea:
                get the crust right and everything else follows.
              </T>
            </p>
            <p>
              <T>
                No long menu of things we&apos;re average at. Burgers, sliders, sides and shakes —
                smashed to order, handed over hot, ready for takeaway or delivery.
              </T>
            </p>
            <div className="btn-row">
              <Link className="btn btn--ghost" href="/about/"><T>More About Us</T></Link>
            </div>
          </div>

          <div data-reveal>
            <div className="grid grid--2" data-reveal-group>
              {TILES.map(([num, title, body]) => (
                <div className="card tile" key={num}>
                  <p className="tile__num">{num}</p>
                  <h3><T>{title}</T></h3>
                  <p><T>{body}</T></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      {/* ---- Location ----
          Plain, not section--alt. The About teaser above is the alternating
          band, and with no reviews section between them two bands would sit
          back to back — their soft edges fading to the page colour against
          each other and leaving a dark seam down the middle. */}
      <section className="section" id="location">
        <div className="wrap split">
          <div data-reveal>
            <p className="eyebrow"><T>Find us</T></p>
            <h2><T>Come and Get It</T></h2>
            <p className="lead">
              <T>We&apos;re on Vashlovani Street in central Tbilisi. Dine in, take away, or order for delivery.</T>
            </p>

            <InfoList />

            <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
              <a
                className="btn btn--primary"
                href="/contact/#order"
                onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
              >
                <T>Order Now</T>
              </a>
              <Link className="btn btn--ghost" href="/contact/">
                <T>Directions &amp; Contact</T>
              </Link>
            </div>
          </div>

          <div className="map" data-reveal>
            <iframe
              title="Map showing Sameo Smash at 1 Vashlovani St, Tbilisi"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${SITE.lat},${SITE.lng}&z=17&output=embed`}
            />
          </div>
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="section--tight">
        <div className="wrap">
          <div className="cta-band" data-reveal>
            <p className="eyebrow" style={{ justifyContent: 'center' }}><T>Hungry?</T></p>
            <h2><T>Order Your Smash</T></h2>
            <p className="lead">
              <T>Call the kitchen for takeaway, or get it delivered through Wolt or Glovo.</T>
            </p>
            <div className="btn-row btn-row--center">
              <a className="btn btn--primary" href={SITE.phoneHref}>{SITE.phone}</a>
              <a className="btn btn--wolt" href={SITE.wolt} target="_blank" rel="noopener">
                <T>Order on Wolt</T>
              </a>
              <a className="btn btn--glovo" href={SITE.glovo} target="_blank" rel="noopener">
                <T>Order on Glovo</T>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomeView() {
  return (
    <SiteChrome>
      <HomeContent />
    </SiteChrome>
  );
}
