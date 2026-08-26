'use client';

/* =========================================================
   SAMEO SMASH — the order chooser
   ---------------------------------------------------------
   Every "Order Now" on the site opens this instead of doing
   anything immediately: three ways to order, and the visitor
   picks. Tapping a button that dials a phone without warning
   is a horrible surprise, and two of the three ways to order
   here are not the phone at all.

   There is one copy of it, mounted once in the layout, so it
   is the same chooser on every page. Anything can open it:

       const { openOrder } = useOrder();
       <a href="/contact/#order"
          onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}>

   Keep the href. It is what happens if JavaScript does not
   run — the button still goes to the order section on the
   Contact page — and it is what a visitor gets if they open
   the link in a new tab on purpose.
   ========================================================= */

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { SITE } from '../lib/site';
import { T, useT } from '../lib/language';

const OrderContext = createContext({ openOrder: () => {}, closeOrder: () => {} });

export function useOrder() {
  return useContext(OrderContext);
}

const OPTIONS = [
  { key: 'wolt', href: SITE.wolt, label: 'Order on Wolt', note: 'Delivery', external: true },
  { key: 'glovo', href: SITE.glovo, label: 'Order on Glovo', note: 'Delivery', external: true },
  { key: 'call', href: SITE.phoneHref, label: 'Call to Order', note: SITE.phone, external: false },
];

export function OrderProvider({ children }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const openerRef = useRef(null);
  const t = useT();

  const openOrder = useCallback((opener) => {
    openerRef.current = opener || null;
    setOpen(true);
  }, []);

  const closeOrder = useCallback(() => {
    setOpen(false);
    if (openerRef.current) {
      openerRef.current.focus();
      openerRef.current = null;
    }
  }, []);

  /* Lock the page behind the chooser while it is up. */
  useEffect(() => {
    document.documentElement.classList.toggle('order-open', open);
    return () => document.documentElement.classList.remove('order-open');
  }, [open]);

  /* Focus the first option on opening, and keep tabbing inside. */
  useEffect(() => {
    if (!open || !boxRef.current) return undefined;
    const box = boxRef.current;
    const first = box.querySelector('.orderbox__opt');
    if (first) first.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { closeOrder(); return; }
      if (e.key !== 'Tab') return;
      const focusable = box.querySelectorAll('a[href], button');
      if (!focusable.length) return;
      const edge = e.shiftKey ? focusable[0] : focusable[focusable.length - 1];
      if (document.activeElement === edge) {
        e.preventDefault();
        (e.shiftKey ? focusable[focusable.length - 1] : focusable[0]).focus();
      }
    };

    box.addEventListener('keydown', onKey);
    return () => box.removeEventListener('keydown', onKey);
  }, [open, closeOrder]);

  const value = useMemo(() => ({ openOrder, closeOrder }), [openOrder, closeOrder]);

  return (
    <OrderContext.Provider value={value}>
      {children}

      <div
        className={`orderbox${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="orderbox-title"
        ref={boxRef}
        /* A tap on the backdrop dismisses it; a tap on the panel does not. */
        onClick={(e) => { if (e.target === e.currentTarget) closeOrder(); }}
      >
        <div className="orderbox__panel">
          <button
            className="orderbox__close"
            type="button"
            aria-label={t('Close')}
            onClick={closeOrder}
          >
            &times;
          </button>
          <p className="eyebrow orderbox__eyebrow">Sameo Smash</p>
          <h2 className="orderbox__title" id="orderbox-title"><T>Order Now</T></h2>
          <p className="orderbox__sub">
            <T>Delivery through Wolt and Glovo, or call the kitchen direct.</T>
          </p>

          <div className="orderbox__opts">
            {OPTIONS.map((o) => (
              <a
                key={o.key}
                className={`orderbox__opt orderbox__opt--${o.key}`}
                href={o.href}
                target={o.external ? '_blank' : undefined}
                rel={o.external ? 'noopener' : undefined}
                /* Let the link do its job, then close up behind it, so
                   coming back from Wolt does not land on a dead modal. */
                onClick={closeOrder}
              >
                <b><T>{o.label}</T></b>
                <small>{o.key === 'call' ? o.note : <T>{o.note}</T>}</small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </OrderContext.Provider>
  );
}
