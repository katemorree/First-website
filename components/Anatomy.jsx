'use client';

/* The burger pins centre-screen while three captions step past it.
   lib/useScrollSections.js writes --q and toggles .is-on on the steps. */

import { BURGERS } from '../lib/products';
import { T } from '../lib/language';
import { ProductPicture } from './ProductCard';

const STEPS = [
  {
    title: 'The Press',
    body: 'Loose beef meets a hot flat-top and gets one hard press. No moulding, no shaping — that press is where everything starts.',
  },
  {
    title: 'The Crust',
    body: 'Seconds of full contact turn the edges lacy, brown and crisp. That caramelised crust is the whole reason to smash a burger.',
  },
  {
    title: 'The Build',
    body: 'Cheese goes on while it is still moving, then it is stacked and wrapped to travel — so a takeaway arrives the way it left.',
  },
];

export default function Anatomy() {
  return (
    <section className="anatomy">
      <div className="anatomy__track" data-track>
        <div className="anatomy__pin">
          <div className="wrap anatomy__grid">
            <div className="anatomy__art">
              {/* Decorative here — the same burger is already named and
                  described further down the page, so a screen reader
                  announcing it again would just be noise. */}
              <ProductPicture
                product={{
                  ...BURGERS[0],
                  alt: '',
                  sizes: '(max-width: 900px) 74vw, 520px',
                }}
                className=""
              />
            </div>

            <div>
              {/* An h2, though it is styled as an eyebrow. The headline above
                  is the h1, and the captions below are h3s; without this the
                  outline would jump a level. */}
              <h2 className="eyebrow"><T>Anatomy of the smash</T></h2>

              <div className="anatomy__steps">
                {STEPS.map((step, i) => (
                  <article
                    className={`anatomy__step${i === 0 ? ' is-on' : ''}`}
                    key={step.title}
                  >
                    <h3><T>{step.title}</T></h3>
                    <p><T>{step.body}</T></p>
                  </article>
                ))}
              </div>

              <div className="anatomy__count" aria-hidden="true">
                <i className="is-on" /><i /><i />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
