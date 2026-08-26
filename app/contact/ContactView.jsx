'use client';

import SiteChrome from '../../components/SiteChrome';
import ContactForm from '../../components/ContactForm';
import { MAPS_LINK, SITE } from '../../lib/site';
import { T } from '../../lib/language';
import { PageTitle } from '../../lib/PageTitle';
import { useOrder } from '../../components/OrderProvider';

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
function VanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 17V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" />
      <path d="M14 9h4l3 3v5a1 1 0 0 1-1 1h-1" />
      <circle cx="6.5" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ContactContent() {
  const { openOrder } = useOrder();

  return (
    <>
      <PageTitle>{'Location & Contact — Sameo Smash | 1 Vashlovani St, Tbilisi'}</PageTitle>
      <section className="section" style={{ paddingBottom: 'var(--sp-4)' }}>
        <div className="wrap">
          <div className="head head--center" data-reveal>
            <p className="eyebrow"><T>Location &amp; Contact</T></p>
            <h1><T>{'Find Us on<br>Vashlovani Street'}</T></h1>
            <p className="lead">
              <T>Central Tbilisi, open every day from 12:00 to 02:00. Dine in, take away, or order for delivery.</T>
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBlock: '0 var(--sp-6)' }} id="location">
        <div className="wrap split">
          <div data-reveal>
            {/* Announced to screen readers only. Without it the h3s below
                would follow the h1 with a level missing in between. */}
            <h2 className="sr-only"><T>Visit us</T></h2>
            <ul className="info">
              <li>
                <span className="info__icon" aria-hidden="true"><PinIcon /></span>
                <div>
                  <h3><T>Address</T></h3>
                  <p><T>{'1 Vashlovani St<br>Tbilisi 0108, Georgia'}</T></p>
                </div>
              </li>
              <li>
                <span className="info__icon" aria-hidden="true"><PhoneIcon /></span>
                <div>
                  <h3><T>Phone</T></h3>
                  <p><a href={SITE.phoneHref}>{SITE.phone}</a></p>
                </div>
              </li>
              <li>
                <span className="info__icon" aria-hidden="true"><VanIcon /></span>
                <div>
                  <h3><T>Delivery &amp; Takeaway</T></h3>
                  <p><T>Delivery through Wolt and Glovo, or call for collection.</T></p>
                </div>
              </li>
              <li>
                <span className="info__icon" aria-hidden="true"><ClockIcon /></span>
                <div>
                  <h3><T>Opening Hours</T></h3>
                  <p><T>Every day, 12:00 – 02:00</T></p>
                </div>
              </li>
            </ul>

            <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
              <a
                className="btn btn--primary"
                href="#order"
                onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
              >
                <T>Order Now</T>
              </a>
              <a className="btn btn--ghost" href={MAPS_LINK} target="_blank" rel="noopener">
                <T>Open in Google Maps</T>
              </a>
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

      {/* ---- Order ----
          The three ways to order, laid out on the page. This is where every
          "Order Now" points when JavaScript is not running, so it has to
          stand on its own. */}
      <section className="section section--alt" id="order">
        <div className="wrap">
          <div className="head head--center" data-reveal>
            <p className="eyebrow"><T>Order</T></p>
            <h2><T>Takeaway &amp; Delivery</T></h2>
            <p className="lead">
              <T>Call the kitchen for collection, or get it delivered through Wolt or Glovo. Open every day, 12:00–02:00.</T>
            </p>
          </div>

          <div className="grid grid--3" data-reveal data-reveal-group>
            <article className="card tile" style={{ textAlign: 'center' }}>
              <h3><T>Call &amp; Collect</T></h3>
              <p><T>Ring your order through and pick it up hot from Vashlovani Street.</T></p>
              <a className="btn btn--primary btn--block" href={SITE.phoneHref}>{SITE.phone}</a>
            </article>
            <article className="card tile" style={{ textAlign: 'center' }}>
              <h3>Wolt</h3>
              <p><T>Order for delivery through the Wolt app or website.</T></p>
              <a className="btn btn--wolt btn--block" href={SITE.wolt} target="_blank" rel="noopener">
                <T>Order on Wolt</T>
              </a>
            </article>
            <article className="card tile" style={{ textAlign: 'center' }}>
              <h3>Glovo</h3>
              <p><T>Order for delivery through the Glovo app or website.</T></p>
              <a className="btn btn--glovo btn--block" href={SITE.glovo} target="_blank" rel="noopener">
                <T>Order on Glovo</T>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="message">
        <div className="wrap">
          <div className="head head--center" data-reveal>
            <p className="eyebrow"><T>Send a message</T></p>
            <h2><T>Questions or Bookings</T></h2>
            <p className="lead">
              <T>Large orders, feedback or anything else — leave your details and we&apos;ll come back to you.</T>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

export default function ContactView() {
  return (
    <SiteChrome>
      <ContactContent />
    </SiteChrome>
  );
}
