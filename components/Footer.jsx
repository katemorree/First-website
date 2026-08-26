'use client';

import Link from 'next/link';
import { MAPS_LINK, SITE } from '../lib/site';
import { T } from '../lib/language';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Link className="brand" href="/">
              SAMEO SMASH<em lang="ka">{SITE.nameKa}</em>
            </Link>
            <p style={{ marginTop: 'var(--sp-3)' }}>
              <T>
                Smash burgers, sliders and shakes on Vashlovani Street in Tbilisi.
                Open every day, 12:00–02:00.
              </T>
            </p>
          </div>

          <div>
            {/* h3, not h4: the heading levels have to step down one at a time
                or a screen reader reports a gap in the outline. The sr-only
                h2 above keeps this section from following an h2 directly. */}
            <h3><T>Explore</T></h3>
            <ul>
              <li><Link href="/"><T>Home</T></Link></li>
              <li><Link href="/menu/"><T>Menu</T></Link></li>
              <li><Link href="/about/"><T>About</T></Link></li>
              <li><Link href="/contact/"><T>Location &amp; Contact</T></Link></li>
            </ul>
          </div>

          <div>
            <h3><T>Visit &amp; Order</T></h3>
            <ul>
              <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              {/* A handful of strings carry a <br> because the line break is part of
                  the wording. Written as a plain JavaScript string so the tag is
                  unmistakably part of the text rather than part of the markup. */}
              <li><T>{'1 Vashlovani St<br>Tbilisi 0108, Georgia'}</T></li>
              <li><T>Open daily 12:00–02:00</T></li>
              <li>
                <a href={MAPS_LINK} target="_blank" rel="noopener">
                  <T>Get directions</T>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p><T>© 2026 Sameo Smash</T></p>
          <p><T>1 Vashlovani St, Tbilisi 0108, Georgia</T></p>
        </div>
      </div>
    </footer>
  );
}
