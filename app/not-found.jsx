'use client';

import Link from 'next/link';
import SiteChrome from '../components/SiteChrome';
import { T } from '../lib/language';
import { PageTitle } from '../lib/PageTitle';

function NotFoundContent() {

  return (
    <>
      <PageTitle>{'Page Not Found — Sameo Smash'}</PageTitle>
      <section className="hero" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap" style={{ textAlign: 'center' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}><T>Error 404</T></p>
        <h1><T>{'This Page<br>Got Smashed'}</T></h1>
        <p className="lead" style={{ maxWidth: '46ch', marginInline: 'auto' }}>
          <T>We couldn&apos;t find that one. The menu is still exactly where you left it.</T>
        </p>
        <div className="btn-row btn-row--center" style={{ marginTop: 'var(--sp-4)' }}>
          <Link className="btn btn--primary" href="/menu/"><T>View the Menu</T></Link>
          <Link className="btn btn--ghost" href="/"><T>Back to Home</T></Link>
        </div>
      </div>
      </section>
    </>
  );
}

export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundContent />
    </SiteChrome>
  );
}
