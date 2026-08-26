'use client';

/* =========================================================
   Reviews — empty on purpose.
   ---------------------------------------------------------
   There used to be three quotes here under "What People Say".
   They were fictional, written to show the layout, and
   labelled "Sample" on the page. They have been removed. A
   made-up review is worth nothing to a customer, and a
   section that has to explain it is not real is worse than
   no section at all.

   Nothing has replaced them because no genuine review for
   Sameo Smash could be found on a public page. See README
   section 6, which records what was searched.

   TO ADD REAL REVIEWS: fill in the array below. Three to six
   looks best — the cards sit three across. The section draws
   itself as soon as there is anything in the list, and stays
   away while it is empty.

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
   - Name the source. It is what lets a reader go and check.

   ⚠️ CHECK THE ADDRESS FIRST. There is another burger place
   in Tbilisi called Smash, on Ilo Mosashvili Street, and its
   reviews dominate the search results. A review has to name
   1 Vashlovani St to belong here.

   One more thing: do NOT add Review or AggregateRating
   structured data to app/layout.jsx even once these are real.
   That hands Google an overall score for the business, which
   it expects to be able to verify. Quoting reviews on the
   page is fine; claiming a score in the page's data is not.
   ========================================================= */

import { T } from '../lib/language';

const REVIEWS = [
  // Empty until there are real ones. See the note above.
];

export default function Reviews() {
  if (!REVIEWS.length) return null;

  return (
    <section className="section">
      <div className="wrap">
        <div className="head head--center" data-reveal>
          <p className="eyebrow"><T>Reviews</T></p>
          <h2><T>What People Say</T></h2>
        </div>

        <div className="grid grid--3" data-reveal data-reveal-group>
          {REVIEWS.map((review) => (
            <figure className="quote-card" key={`${review.name}-${review.source}`}>
              {review.stars && (
                <p
                  className="quote-card__stars"
                  aria-label={`${review.stars} out of 5`}
                >
                  {'★'.repeat(review.stars)}
                </p>
              )}
              <blockquote>
                <p>{review.quote}</p>
              </blockquote>
              <figcaption>
                {review.name} <span>{review.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
