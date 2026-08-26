'use client';

/* The address / phone / hours / delivery list, used on the home page and on
   the Contact page. */

import { SITE } from '../lib/site';
import { T } from '../lib/language';

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

export default function InfoList() {
  return (
    <ul className="info">
      <li>
        <span className="info__icon" aria-hidden="true"><PinIcon /></span>
        <div>
          <h3><T>Address</T></h3>
          <p><T>1 Vashlovani St, Tbilisi 0108, Georgia</T></p>
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
          <h3><T>Opening Hours</T></h3>
          <p><T>Every day, 12:00 – 02:00</T></p>
        </div>
      </li>
      <li>
        <span className="info__icon" aria-hidden="true"><VanIcon /></span>
        <div>
          <h3><T>Delivery</T></h3>
          <p><T>Available through Wolt and Glovo, or call for takeaway.</T></p>
        </div>
      </li>
    </ul>
  );
}
