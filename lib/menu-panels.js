/* =========================================================
   SAMEO SMASH — the "Alongside" price lists
   ---------------------------------------------------------
   The parts of the menu that have no photograph: sides,
   sauces, desserts, coffee, soft drinks and beer. Each panel
   carries an id because the category strip at the top of the
   menu page links straight to it.

   Prices verified from current public listings, not confirmed
   by the owner. See README section 6. Temporary delivery
   promotions are deliberately NOT copied here — this is the
   permanent menu.
   ========================================================= */

export const PANELS = [
  {
    id: 'sides',
    title: 'Sides',
    note: 'From ₾6',
    items: [
      { name: 'Fries', price: '₾6' },
      { name: 'Toast', price: '₾10' },
    ],
  },
  {
    id: 'sauces',
    title: 'Sauces',
    note: 'From ₾3',
    items: [
      { name: 'Mango Sauce', price: '₾4' },
      { name: 'Truffle Sauce', price: '₾4' },
      { name: 'Ketchup', price: '₾3' },
      { name: 'Mustard', price: '₾3' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    note: 'Freshly baked',
    items: [
      { name: 'Chocolate Cookie', price: '₾11' },
      { name: 'Vanilla Cookie', price: '₾10' },
    ],
  },
  {
    id: 'coffee',
    title: 'Coffee',
    note: 'Hot & iced',
    items: [
      { name: 'Espresso', price: '₾5' },
      { name: 'Double Espresso', price: '₾8' },
      { name: 'Americano', price: '₾8' },
      { name: 'Cappuccino', price: '₾9' },
      { name: 'Latte', price: '₾12' },
      { name: 'Iced Coffee', price: '₾9' },
      { name: 'Iced Latte', price: '₾12' },
      { name: 'Iced Coffee with Ice Cream', price: '₾17' },
    ],
  },
  {
    id: 'drinks',
    title: 'Soft Drinks',
    note: 'From ₾3',
    items: [
      { name: 'Water', price: '₾3' },
      { name: 'Coca-Cola', price: '₾4' },
      { name: 'Coca-Cola Zero', price: '₾4' },
      { name: 'Fanta', price: '₾4' },
      { name: 'Sprite', price: '₾4' },
    ],
  },
  {
    id: 'beer',
    title: 'Beer',
    note: 'Local',
    items: [
      { name: 'Alkhanidze Beer', price: '₾11' },
    ],
  },
];
