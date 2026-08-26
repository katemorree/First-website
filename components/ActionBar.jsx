'use client';

/* The bar pinned to the bottom of a phone screen. Hidden on anything wider
   by the stylesheet. */

import { MAPS_LINK } from '../lib/site';
import { T } from '../lib/language';
import { useOrder } from './OrderProvider';

export default function ActionBar() {
  const { openOrder } = useOrder();

  return (
    <div className="actionbar">
      <a
        className="btn btn--primary"
        href="/contact/#order"
        onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
      >
        <T>Order Now</T>
      </a>
      <a className="btn btn--ghost" href={MAPS_LINK} target="_blank" rel="noopener">
        <T>Directions</T>
      </a>
    </div>
  );
}
