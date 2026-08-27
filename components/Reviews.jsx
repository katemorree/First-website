'use client';

/* =========================================================
   Reviews.
   ---------------------------------------------------------
   The section draws itself from the list below and stays
   away entirely while that list is empty, so it is one edit
   to add to or to take down.

   ⚠️ THESE MUST BE REAL. The words below were supplied by the
   owner. Nothing here was written by Claude, and nothing here
   has been checked against a public listing either — there is
   no way to, since no source was given with them. If any of
   them is not something an actual customer actually said, it
   has to come out: publishing invented reviews misleads the
   people they are aimed at, and in Georgia, the EU and most
   other markets it is against consumer protection law. The
   restaurant carries that risk, not the website.

   TO EDIT: change the array. Three to six looks best.

       { name: 'Nino', stars: 5, source: 'Google Maps',
         quote: 'The review, exactly as it was written.' },

   Rules worth keeping to:

   - Copy the words EXACTLY. Do not tidy the grammar, do not
     shorten a review to fit the card, and do not translate
     it — a review written in Georgian stays in Georgian on
     all three language settings. Only the heading above the
     cards is translated.
   - First name or public display name only. That is what the
     person chose to show.
   - `stars` only if the source actually shows stars. Wolt and
     Glovo score out of ten, not five, so leave stars out for
     those and put the score in `source` instead — "Wolt 9.4".
   - `source` is optional and is currently missing on all four
     below, because none came with them. ADD IT WHEN YOU KNOW:
     naming where a review came from is what lets a reader go
     and check, and it is most of what makes the section worth
     believing.

   ⚠️ CHECK THE ADDRESS. There is another burger place in
   Tbilisi called Smash, on Ilo Mosashvili Street, and its
   reviews dominate the search results. A review has to name
   1 Vashlovani St to belong here.

   One more thing: do NOT add Review or AggregateRating
   structured data to app/layout.jsx. That hands Google an
   overall score for the business, which it expects to be able
   to verify. Quoting reviews on the page is fine; claiming a
   score in the page's own data is not.
   ========================================================= */

import { T } from '../lib/language';

const REVIEWS = [
  {
    name: 'Nino',
    stars: 5,
    quote: 'The burger was really juicy and the edges were properly crispy. '
         + 'Loved the sauce too.',
  },
  {
    name: 'Giorgi',
    stars: 5,
    quote: 'Tried the truffle burger for the first time. Really good flavor '
         + 'and the portion was bigger than I expected.',
  },
  {
    name: 'Mariam',
    stars: 4,
    quote: 'Delivery took a little longer than expected, but the food arrived '
         + 'hot and the burger was great.',
  },
  {
    name: 'Luka',
    stars: 5,
    quote: 'Probably one of my favorite smash burgers in Tbilisi right now. '
         + 'Simple but done really well.',
  },
];

/* Four cards across three columns leaves one stranded on a row of its own,
   which is the thing that makes a section look unfinished. Pick the number
   of columns that divides the list evenly instead. */
const COLUMNS = REVIEWS.length % 3 === 0 ? 'grid--3'
  : REVIEWS.length % 2 === 0 ? 'grid--2'
    : 'grid--3';

export default function Reviews() {
  if (!REVIEWS.length) return null;

  return (
    <section className="section">
      <div className="wrap">
        <div className="head head--center" data-reveal>
          <p className="eyebrow"><T>Reviews</T></p>
          <h2><T>What People Say</T></h2>
        </div>

        <div className={`grid ${COLUMNS}`} data-reveal data-reveal-group>
          {REVIEWS.map((review) => (
            <figure className="quote-card" key={review.quote}>
              {review.stars && (
                /* Five stars every time, the unearned ones hollow — four
                   stars drawn as four is read as five by anyone skimming.
                   The label carries the score in words, because a screen
                   reader announcing five star characters says nothing. */
                <p
                  className="quote-card__stars"
                  aria-label={`${review.stars} out of 5`}
                >
                  <span aria-hidden="true">{'★'.repeat(review.stars)}</span>
                  {review.stars < 5 && (
                    <i aria-hidden="true">{'☆'.repeat(5 - review.stars)}</i>
                  )}
                </p>
              )}
              <blockquote>
                <p>{review.quote}</p>
              </blockquote>
              <figcaption>
                {review.name}
                {review.source && <span>{review.source}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
