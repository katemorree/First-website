/* =========================================================
   SAMEO SMASH — the hero burger, in eight pieces
   ---------------------------------------------------------
   The owner supplied the burger as separate ingredient
   cutouts. Each one was scaled and placed into its spot in
   the assembled burger ahead of time, and every layer ships
   as a full-size transparent image on that ONE shared canvas.

   That is the whole trick. Because all eight files share a
   canvas, the browser just pins them on top of each other
   with inset:0 and they line up as a finished burger. Taking
   it apart is then nothing but a translate per layer, and
   there is no way for the pieces to drift out of register at
   some screen size nobody tested.

   The order below is PAINT order — the bottom of the burger
   first, so each ingredient overlaps the one beneath it the
   way it does in the photograph. It is also the order the
   <img> tags come out in, so do not sort it.

   How far each layer travels is NOT here. It lives in
   app/globals.css next to the rest of the hero, because it is
   art direction rather than data — see .burger__layer--*.

   To regenerate the images: scripts/build-burger-layers.py.
   ========================================================= */

/* The shared canvas the eight layers were composed on. Only used for the
   aspect ratio, so the box is the right shape before the images arrive and
   the page does not jump. */
export const BURGER_CANVAS = { width: 1200, height: 980 };

export const BURGER_WIDTHS = [440, 720, 1080];

export const BURGER_LAYERS = [
  { slug: 'bottombun', name: 'bottom bun' },
  { slug: 'cheesebot', name: 'lower cheese slice' },
  { slug: 'patties', name: 'two smashed patties' },
  { slug: 'cheesetop', name: 'upper cheese slice' },
  { slug: 'pickles', name: 'pickles' },
  { slug: 'lettuce', name: 'lettuce' },
  { slug: 'sauce', name: 'burger sauce' },
  { slug: 'topbun', name: 'top bun' },
];
