'use client';

import SiteChrome from '../../components/SiteChrome';
import ProductCard from '../../components/ProductCard';
import { T } from '../../lib/language';
import { PageTitle } from '../../lib/PageTitle';
import { useOrder } from '../../components/OrderProvider';
import { BURGERS, COFFEES, SHAKES, SIDES, SLIDERS } from '../../lib/products';
import { PANELS } from '../../lib/menu-panels';

const CATEGORIES = [
  ['#burgers', 'Burgers'], ['#sliders', 'Sliders'], ['#sides', 'Sides'],
  ['#sauces', 'Sauces'], ['#desserts', 'Desserts'], ['#shakes', 'Shakes'],
  ['#coffee', 'Coffee'], ['#drinks', 'Drinks'], ['#beer', 'Beer'],
];

/* One row of products under a heading. `gridClass` and `id` differ per
   course; everything else is the same shape every time. */
function Course({ id, title, note, products, gridClass = 'grid grid--3', alt = false, children }) {
  return (
    <section className={`section course${alt ? ' section--alt' : ''}`} id={id}>
      <div className="wrap">
        <div className="course__head" data-reveal>
          <h2><T>{title}</T></h2>
          <span><T>{note}</T></span>
        </div>
        {children}
        <div className={gridClass} data-reveal data-reveal-group>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuContent() {
  const { openOrder } = useOrder();

  const orderButton = (className) => (
    <a
      className={className}
      href="/contact/#order"
      onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
    >
      <T>Order Now</T>
    </a>
  );

  return (
    <>
      <PageTitle>{'Menu & Prices — Sameo Smash | Burgers, Sliders & Shakes in Tbilisi'}</PageTitle>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="head" data-reveal>
            <p className="eyebrow"><T>The Menu</T></p>
            <h1><T>{'Burgers, Sliders<br>& Everything Else'}</T></h1>
            <p className="lead">
              <T>
                Everything is smashed and built to order. Open every day from
                12:00 to 02:00 — eat in, take away, or get it delivered.
              </T>
            </p>
            <div className="btn-row">
              {orderButton('btn btn--primary')}
              <a className="btn btn--ghost" href="/contact/#order"><T>Delivery Options</T></a>
            </div>
          </div>

          <nav className="menu-nav" aria-label="Menu categories" data-reveal>
            {CATEGORIES.map(([href, label]) => (
              <a href={href} key={href}><T>{label}</T></a>
            ))}
          </nav>
        </div>
      </section>

      <Course id="burgers" title="Burgers" note="From ₾20" products={BURGERS} gridClass="grid grid--2">
        <p className="course__note lead" data-reveal>
          <T>
            The heart of the menu. Every patty is pressed hard on a hot flat-top so the edges
            go crisp and caramelised, then stacked and served straight away.
          </T>
        </p>
      </Course>

      <Course id="sliders" title="Sliders" note="From ₾25" products={SLIDERS} alt />

      <Course title="Sides & Sauces" note="From ₾3" products={SIDES} />

      <Course id="shakes" title="Shakes" note="All ₾15" products={SHAKES} />

      {/* Two products rather than three, so the row is held to the same cell
          width as a three-across row and centred — otherwise the cups would
          grow to fill half the page each and stop matching the shakes. */}
      <Course
        title="Coffee"
        note="Hot & iced"
        products={COFFEES}
        gridClass="grid grid--3 grid--two-up"
      />

      {/* ---- Everything else: the price lists with no photographs ---- */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="course__head" data-reveal>
            <h2><T>Alongside</T></h2>
            <span><T>Sides, sweet &amp; drinks</T></span>
          </div>

          <div className="panels" data-reveal data-reveal-group>
            {PANELS.map((panel) => (
              <section className="panel" id={panel.id} key={panel.id}>
                <div className="panel__title">
                  <h3><T>{panel.title}</T></h3>
                  <span><T>{panel.note}</T></span>
                </div>
                {panel.items.map((item) => (
                  <div className="item" key={item.name}>
                    <p className="item__name"><T>{item.name}</T></p>
                    <span className="item__price">{item.price}</span>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band" data-reveal>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              <T>Ready when you are</T>
            </p>
            <h2><T>Order Your Smash</T></h2>
            <p className="lead">
              <T>Call the kitchen directly, or order for delivery through Wolt or Glovo.</T>
            </p>
            <div className="btn-row btn-row--center">
              {orderButton('btn btn--primary')}
              <a className="btn btn--ghost" href="/contact/#order"><T>Delivery Options</T></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function MenuView() {
  return (
    <SiteChrome>
      <MenuContent />
    </SiteChrome>
  );
}
