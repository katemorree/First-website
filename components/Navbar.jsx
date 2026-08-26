'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SITE } from '../lib/site';
import { T } from '../lib/language';
import LanguageSwitcher from './LanguageSwitcher';
import { useOrder } from './OrderProvider';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu/', label: 'Menu' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Location' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const { openOrder } = useOrder();

  /* The header gets a solid background once the page has moved at all,
     so the logo never sits on top of a photograph. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close the open menu on Escape, and on a tap anywhere outside it. */
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={`header${stuck ? ' is-stuck' : ''}`}>
      <div className={`wrap nav${open ? ' is-open' : ''}`} ref={navRef}>
        <Link className="brand" href="/">
          SAMEO SMASH<em lang="ka">{SITE.nameKa}</em>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isCurrent(href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              <T>{label}</T>
            </Link>
          ))}
          <a
            className="nav__links-cta"
            href="/contact/#order"
            onClick={(e) => { e.preventDefault(); setOpen(false); openOrder(e.currentTarget); }}
          >
            <T>Order Now</T>
          </a>
        </nav>

        <div className="nav__actions">
          <LanguageSwitcher />
          <a
            className="btn btn--primary nav__cta"
            href="/contact/#order"
            onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
          >
            <T>Order Now</T>
          </a>
          <button
            className="nav__toggle"
            type="button"
            ref={toggleRef}
            aria-label="Open menu"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
