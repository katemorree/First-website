'use client';

/* The scrolling band of words under the hero. The list is repeated twice so
   the animation can loop without a visible seam. Decorative — hidden from
   screen readers, since every word in it is a heading further down. */

import { T } from '../lib/language';

const WORDS = [
  'Smash Burgers', 'Cheeseburgers', 'Truffle Burgers', 'Sliders',
  'Fries', 'Sauces', 'Desserts', 'Coffee', 'Shakes', 'Drinks',
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      {[0, 1].map((copy) => (
        <ul className="marquee__track" key={copy}>
          {WORDS.map((word) => (
            <li key={word}><T>{word}</T></li>
          ))}
        </ul>
      ))}
    </div>
  );
}
