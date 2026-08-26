'use client';

/* =========================================================
   One product, one card.
   ---------------------------------------------------------
   Used by the burgers, the sliders, the sides, the shakes and
   the coffees — every card on the menu with a photograph, and
   the four burgers on the home page too.

   About the picture. It is a real <picture> element rather
   than next/image, and that is deliberate. The site is built
   as static files, so Next's image optimiser — which needs a
   server to resize on demand — is switched off. What is left
   of next/image with the optimiser off is a plain <img> with
   no sizes at all. These photos already ship as four
   hand-made WebP widths each with a PNG fallback, chosen so
   that products of the same kind come out at matching sizes.
   That is the same job, done ahead of time, and better done.
   See README section 3.

   object-fit: contain, never cover: the product is scaled to
   fit inside the frame, so it is never cropped and never
   stretched. The transparent background lets the brand
   gradient show through behind it.
   ========================================================= */

import { asset } from '../lib/site';
import { T } from '../lib/language';

/* `className` defaults to product-shot, which is the card treatment: fill
   the frame, keep the aspect ratio, sit centred with a little padding. The
   hero and the anatomy section pass an empty string, because there the
   burger is sized by its own rules and product-shot's padding and object-fit
   would fight them. */
export function ProductPicture({ product, priority = false, className = 'product-shot' }) {
  const { slug, alt, width, height, widths, sizes } = product;
  const srcSet = widths
    .map((w) => `${asset(`/images/${slug}-${w}.webp`)} ${w}w`)
    .join(', ');

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        className={className || undefined}
        src={asset(`/images/${slug}.png`)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  );
}

export default function ProductCard({ product, className = '', priority = false, children }) {
  const face = product.face || '';

  return (
    <article className={`card feature ${className}`.trim()}>
      <div className={`feature__face feature__face--product ${face}`.trim()}>
        <ProductPicture product={product} priority={priority} />
      </div>
      <div className="feature__body">
        {children}
        <div
          className="panel__title"
          style={{ border: 0, padding: 0, marginBottom: product.description ? '0.5rem' : 0 }}
        >
          <h3><T>{product.name}</T></h3>
          <span style={{ color: 'var(--amber)', fontSize: 'var(--step-0)' }}>
            {product.price.startsWith('From ')
              ? <T>{product.price}</T>
              : product.price}
          </span>
        </div>
        {product.description && <p><T>{product.description}</T></p>}
      </div>
    </article>
  );
}
