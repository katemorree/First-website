# Image generation prompts — Sameo Smash

Copy a prompt below into an image generator (ChatGPT / DALL·E, Midjourney,
Adobe Firefly, Leonardo — any of them work), save the result into this
`images/` folder using the **exact filename** given, then switch the matching
line on in the PHOTO SLOTS block at the bottom of `css/style.css`.

## Before you start

**Shared style line.** Every prompt below already ends with this, but if you
write your own, append it so the set stays consistent:

> dark moody food photography, near-black charcoal background, warm orange
> and amber rim lighting, shallow depth of field, high detail, appetising,
> premium independent burger brand, editorial food styling, no text, no logos,
> no watermark, no people's faces

**Settings.** Ask for landscape 16:10 for the burger, fries, shake and coffee
shots, and square 1:1 for the hero and interior. Export JPG, quality around
80, and keep each file under 300KB — see "Optimising" at the end.

**Two rules that matter.**
1. Do not upload a photo from Wolt, Glovo, Google or Instagram and ask the
   tool to "recreate" it. Describe the food in words instead. The prompts
   below do that, so they produce original images rather than derivatives of
   someone else's copyrighted photo.
2. Generated food is *illustrative*. If a shot shows something the kitchen
   does not actually serve — sesame bun when yours is plain, bacon that is not
   on the menu — regenerate it. A picture that misrepresents the product is a
   problem whoever made it.

---

## 1. Hero — `hero-burger.jpg`  (square 1:1, shown inside a circle)

> Extreme close-up of a double smash burger, two thin beef patties with
> crispy lacy caramelised edges, melted American cheese draping over the
> sides, soft toasted bun, glossy house sauce, stacked tall and slightly
> off-centre. Shot from a low three-quarter angle. Dark moody food
> photography, near-black charcoal background, warm orange and amber rim
> lighting, shallow depth of field, high detail, appetising, premium
> independent burger brand, editorial food styling, no text, no logos, no
> watermark, no people's faces.

*Keep the burger centred — the circular frame crops the corners.*

## 2. Cheeseburger — SUPPLIED, no prompt needed

The cheeseburger already uses a **real transparent PNG of the actual
product**, supplied by the business. Do not generate one, and do not
replace it with a generated image. Files: `cheeseburger.png` and the
`cheeseburger-*.webp` set.

---

## 3. Chili cheeseburger — `burger-chili.jpg`  (16:10)

> A smash cheeseburger with sliced green jalapeños and a glossy amber
> mango-chili sauce running down the side, melted cheese, lettuce, onion,
> soft bun. Slight steam. Warm reddish highlights suggesting heat. Dark moody
> food photography, near-black charcoal background, warm orange and amber rim
> lighting, shallow depth of field, high detail, appetising, premium
> independent burger brand, editorial food styling, no text, no logos, no
> watermark, no people's faces.

## 4. Truffle burger — `burger-truffle.jpg`  (16:10)

> A premium truffle smash burger, beef patty with crisp edges, pale melted
> white cheese, glossy dark truffle sauce, thin onion, soft bun. Richer and
> more luxurious than a classic burger — deeper shadows, subtle golden
> highlights. Dark moody food photography, near-black charcoal background,
> warm orange and amber rim lighting, shallow depth of field, high detail,
> appetising, premium independent burger brand, editorial food styling, no
> text, no logos, no watermark, no people's faces.

## 5. Veggie burger — `burger-veggie.jpg`  (16:10)

> A falafel veggie burger, crisp golden-brown falafel patty, melted cheese,
> shredded lettuce, pickles, thin onion, creamy sauce, soft bun, on a dark
> slate surface. Fresh and vivid but styled to match the other burgers. Dark
> moody food photography, near-black charcoal background, warm orange and
> amber rim lighting, shallow depth of field, high detail, appetising,
> premium independent burger brand, editorial food styling, no text, no
> logos, no watermark, no people's faces.

## 6. Fries — `fries.jpg`  (16:10)

> A generous pile of golden crispy skin-on fries spilling across dark slate,
> flecked with sea salt, a small pot of dipping sauce just in frame at the
> edge. Overhead three-quarter angle. Dark moody food photography, near-black
> charcoal background, warm orange and amber rim lighting, shallow depth of
> field, high detail, appetising, premium independent burger brand, editorial
> food styling, no text, no logos, no watermark, no people's faces.

## 7. Shakes — `shake.jpg`  (16:10)

> Two thick milkshakes in plain frosted glasses, one vanilla and one
> chocolate, condensation on the glass, thick swirl on top, dark background.
> Cold, creamy and rich. Dark moody food photography, near-black charcoal
> background, warm orange and amber rim lighting, shallow depth of field,
> high detail, appetising, premium independent burger brand, editorial food
> styling, no text, no logos, no watermark, no people's faces.

## 8. Coffee — `coffee.jpg`  (16:10)

> A latte in a plain ceramic cup on a dark counter, soft crema, a little
> steam, beside an iced coffee in a clear glass with ice cubes. Warm and
> inviting against the dark surroundings. Dark moody food photography,
> near-black charcoal background, warm orange and amber rim lighting, shallow
> depth of field, high detail, appetising, premium independent burger brand,
> editorial food styling, no text, no logos, no watermark, no people's faces.

## 9. Interior / atmosphere — `interior.jpg`  (square 1:1, shown in a circle)

> Interior of a small modern urban smash burger shop at night, dark walls,
> warm orange pendant lighting, stainless steel flat-top grill, a clean
> counter, subtle industrial fittings, cosy and cool rather than clinical.
> Empty of people. Wide but intimate. Dark moody photography, near-black
> charcoal background, warm orange and amber rim lighting, shallow depth of
> field, high detail, premium independent burger brand, editorial styling, no
> text, no logos, no watermark, no people's faces.

---

## Optimising before upload

Images straight out of a generator are often 2–5 MB, which would make the
site noticeably slow on a phone. Shrink them first:

- **On iPad/iPhone:** the free app *Image Size* or *Compress Photos* will
  resize and re-compress. Target 1200px on the long edge, quality ~80.
- **On the web:** [squoosh.app](https://squoosh.app) — drag the image in,
  set width 1200, choose MozJPEG quality 75–80, download.

Aim for **under 300KB each**. Nine images at 300KB is about 2.7MB total, and
only the ones in view load at once.

**Optional, faster still:** export a `.webp` alongside each `.jpg` (Squoosh
does this) and change the slot line's `.jpg` to `.webp`. WebP files are
roughly 30% smaller at the same quality and work in every current browser.

---

## Filename checklist

| Slot | Filename | Shape |
|---|---|---|
| Hero | `hero-burger.jpg` | 1:1 |
| Cheeseburger | *real photo already in place* | — |
| Chili cheeseburger | `burger-chili.jpg` | 16:10 |
| Truffle burger | `burger-truffle.jpg` | 16:10 |
| Veggie burger | `burger-veggie.jpg` | 16:10 |
| Fries | `fries.jpg` | 16:10 |
| Shakes | `shake.jpg` | 16:10 |
| Coffee | `coffee.jpg` | 16:10 |
| Interior | `interior.jpg` | 1:1 |

Filenames must match exactly, including lowercase and hyphens.
