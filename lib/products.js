/* =========================================================
   SAMEO SMASH — the menu, as data
   ---------------------------------------------------------
   Every product with a photograph is described once here and
   drawn by <ProductCard>. Changing a price or a description
   is one edit in this file, and it changes everywhere that
   product appears — the four burgers, for instance, show up
   on both the home page and the menu.

   The prices in the text panels lower down the menu page are
   separate; they live in lib/menu-panels.js.

   About the numbers:

   `width` and `height` are the real pixel size of the photo.
   They are not a display size — the browser uses the ratio
   between them to reserve the right shape of space before the
   picture arrives, so the page does not jump as it loads.

   `sizes` tells the browser how wide the picture will end up
   on the page, so it can pick the smallest file that still
   looks sharp. It is a guess made ahead of time and it has to
   be updated if a card's layout changes.

   `widths` are the WebP files that exist for that product in
   public/images. Wide products got 480/640/800/1200; the
   narrower three-across cards got 300/400/540/800. See README
   section 3.
   ========================================================= */

const WIDE = [480, 640, 800, 1200];
const NARROW = [300, 400, 540, 800];

const SIZES_TWO_UP =
  '(max-width: 620px) 92vw, (max-width: 900px) 46vw, 540px';
const SIZES_THREE_UP =
  '(max-width: 620px) 92vw, (max-width: 900px) 46vw, 360px';
const SIZES_TALL =
  '(max-width: 620px) 40vw, (max-width: 900px) 22vw, 160px';

export const BURGERS = [
  {
    slug: 'cheeseburger',
    name: 'Cheeseburger',
    price: '₾25',
    description: '100% beef, bun, mixed sauce, onion, lettuce, pickles and cheese.',
    alt: 'Sameo cheeseburger',
    width: 1448, height: 1016, widths: WIDE, sizes: SIZES_TWO_UP,
  },
  {
    slug: 'chili-burger',
    name: 'Chili Cheeseburger',
    price: '₾27.50',
    description: '100% beef, bun, mango-chili sauce, onion, lettuce, jalapeño and cheese.',
    alt: 'Sameo chili cheeseburger',
    width: 1231, height: 1009, widths: WIDE, sizes: SIZES_TWO_UP,
  },
  {
    slug: 'truffle-burger',
    name: 'Truffle Burger',
    price: '₾27.50',
    description: '100% beef, bun, truffle sauce, onion and white cheese.',
    alt: 'Sameo truffle burger',
    width: 1407, height: 956, widths: WIDE, sizes: SIZES_TWO_UP,
  },
  {
    slug: 'veggie-burger',
    name: 'Veggie Burger',
    price: '₾20',
    description: 'Falafel, bun, mixed sauce, onion, lettuce, pickles and cheese.',
    alt: 'Sameo veggie burger',
    width: 1250, height: 863, widths: WIDE, sizes: SIZES_TWO_UP,
  },
];

export const SLIDERS = [
  {
    slug: 'classic-slider', name: 'Classic Slider', price: '₾25',
    alt: 'Sameo classic sliders',
    width: 1425, height: 602, widths: WIDE, sizes: SIZES_THREE_UP,
    face: 'feature__face--wide',
  },
  {
    slug: 'truffle-slider', name: 'Truffle Slider', price: '₾27.50',
    alt: 'Sameo truffle sliders',
    width: 1444, height: 570, widths: WIDE, sizes: SIZES_THREE_UP,
    face: 'feature__face--wide',
  },
  {
    slug: 'chili-slider', name: 'Chili Slider', price: '₾27.50',
    alt: 'Sameo chili sliders',
    width: 1387, height: 547, widths: WIDE, sizes: SIZES_THREE_UP,
    face: 'feature__face--wide',
  },
];

export const SIDES = [
  {
    slug: 'fries', name: 'Fries', price: '₾6', alt: 'Sameo fries',
    width: 922, height: 1306, widths: NARROW, sizes: SIZES_THREE_UP,
    face: 'feature__face--side',
  },
  {
    slug: 'toast', name: 'Toast', price: '₾10', alt: 'Sameo toast',
    width: 1414, height: 671, widths: NARROW, sizes: SIZES_THREE_UP,
    face: 'feature__face--side',
  },
  {
    slug: 'sauces', name: 'Sauces', price: 'From ₾3', alt: 'Sameo sauces',
    width: 1379, height: 1002, widths: NARROW, sizes: SIZES_THREE_UP,
    face: 'feature__face--side',
  },
];

export const SHAKES = [
  {
    slug: 'vanilla-shake', name: 'Vanilla Shake', price: '₾15',
    alt: 'Sameo vanilla shake',
    width: 610, height: 1401, widths: NARROW, sizes: SIZES_TALL,
    face: 'feature__face--tall',
  },
  {
    slug: 'chocolate-shake', name: 'Chocolate Shake', price: '₾15',
    alt: 'Sameo chocolate shake',
    width: 610, height: 1401, widths: NARROW, sizes: SIZES_TALL,
    face: 'feature__face--tall',
  },
  {
    slug: 'strawberry-shake', name: 'Strawberry Shake', price: '₾15',
    alt: 'Sameo strawberry shake',
    width: 610, height: 1401, widths: NARROW, sizes: SIZES_TALL,
    face: 'feature__face--tall',
  },
];

export const COFFEES = [
  {
    slug: 'iced-coffee-black', name: 'Iced Coffee', price: '₾9',
    alt: 'Sameo iced coffee',
    width: 710, height: 1442, widths: NARROW, sizes: SIZES_TALL,
    face: 'feature__face--tall',
  },
  {
    slug: 'iced-coffee-cream', name: 'Iced Coffee with Ice Cream', price: '₾17',
    alt: 'Sameo iced coffee with ice cream',
    width: 710, height: 1442, widths: NARROW, sizes: SIZES_TALL,
    face: 'feature__face--tall',
  },
];
