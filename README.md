# Sameo Smash — Website

Website for **Sameo Smash / სამეო სმეშ**, a smash burger restaurant at
1 Vashlovani St, Tbilisi 0108, Georgia.

Built as plain HTML, CSS and JavaScript — no frameworks, no build step, no
`npm install`. Every page is a text file you can edit directly on GitHub
(including from an iPad) and the change goes live within about a minute.

---

## 1. Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, category line-up, brand intro, location, order CTA |
| `menu.html` | Full menu with prices — burgers, sliders, sides, sauces, desserts, shakes, coffee, drinks, beer |
| `about.html` | About — brand story and how the kitchen works |
| `contact.html` | Location, directions, ordering, and the contact form |
| `404.html` | Shown automatically if someone hits a wrong address |
| `css/style.css` | All styling. Section map is at the top of the file |
| `js/script.js` | Mobile menu, scroll animations, contact form |
| `js/i18n.js` | The language system — the chooser, the header switcher, the swapping |
| `js/i18n-data.js` | **The Russian and Georgian text.** This is the file to edit for translations |
| `robots.txt`, `sitemap.xml` | Search engine files |

The header and footer are repeated in each page rather than pulled from a
shared file — that is the trade-off for having no build step. **If you change a
navigation or footer link, make the same edit in all five HTML files.**

---

## 2. Editing content

1. Open the file on GitHub and tap the pencil / edit icon.
2. Change the text between the tags — e.g. `<h3>Sliders</h3>`.
3. Tap **Commit changes**.

The phone number appears in several places per page (header, body, footer,
and the mobile Call bar). If it ever changes, use GitHub's search to find
every instance of both `+995 511 10 08 35` and `tel:+995511100835`.

### Colours and fonts

Open `css/style.css` and edit the `:root` block at the top. Changing
`--flame` (the orange) updates every button, accent and highlight at once.

---

## 3. Photography

Every product on the menu now has a **real photograph**. One position is
still waiting for a picture — the room itself, on the About page — and until
it has one it renders a brand graphic rather than a gap, so nothing looks
broken or empty.

### Adding a photo — one line, one file

One photo slot is left: the interior shot on `about.html`. To switch it on:

1. Put your image in the `images/` folder, named exactly as listed in
   `images/PROMPTS.md`.
2. Open `css/style.css`, scroll to the **PHOTO SLOTS** block at the very
   bottom, and on the matching line delete the comment markers at the start
   and end of that line.
3. Commit.

The photo appears, and the placeholder ring and word fade out automatically,
with a dark scrim added underneath so headings stay readable. Put the markers
back to return to the graphic. You never need to edit the HTML.

Everything else on the site uses a real photo placed directly in the HTML,
so it has no slot.

### Real product photos

Every product uses a **real photograph** supplied by the business —
transparent-background PNGs of the actual products. None is AI-generated, and
none should be swapped for a generated image.

**Cheeseburger** — files in `images/`:

| File | Size | Purpose |
|---|---|---|
| `cheeseburger-480.webp` | 73 KB | small phones at 1x |
| `cheeseburger-640.webp` | 122 KB | small phones at 2x, desktop 1x |
| `cheeseburger-800.webp` | 186 KB | phones and tablets at 2x |
| `cheeseburger-1200.webp` | 379 KB | desktop at 2x (retina) |
| `cheeseburger.png` | 523 KB | fallback for browsers without WebP |

**Chili cheeseburger** — files in `images/`:

| File | Size | Purpose |
|---|---|---|
| `chili-burger-480.webp` | 87 KB | small phones at 1x |
| `chili-burger-640.webp` | 151 KB | small phones at 2x, desktop 1x |
| `chili-burger-800.webp` | 240 KB | phones and tablets at 2x |
| `chili-burger-1200.webp` | 469 KB | desktop at 2x (retina) |
| `chili-burger.png` | 638 KB | fallback for browsers without WebP |

**Veggie burger** — files in `images/`:

| File | Size | Purpose |
|---|---|---|
| `veggie-burger-480.webp` | 74 KB | small phones at 1x |
| `veggie-burger-640.webp` | 126 KB | small phones at 2x, desktop 1x |
| `veggie-burger-800.webp` | 200 KB | phones and tablets at 2x |
| `veggie-burger-1200.webp` | 397 KB | desktop at 2x (retina) |
| `veggie-burger.png` | 538 KB | fallback for browsers without WebP |

**Truffle burger** — files in `images/`:

| File | Size | Purpose |
|---|---|---|
| `truffle-burger-480.webp` | 82 KB | small phones at 1x |
| `truffle-burger-640.webp` | 140 KB | small phones at 2x, desktop 1x |
| `truffle-burger-800.webp` | 217 KB | phones and tablets at 2x |
| `truffle-burger-1200.webp` | 433 KB | desktop at 2x (retina) |
| `truffle-burger.png` | 579 KB | fallback for browsers without WebP |

The browser downloads **only one** of these — whichever matches the screen.
A typical phone loads 186 KB, not the whole set.

Where each one appears:

| Photo | File stem | Used on |
|---|---|---|
| Cheeseburger | `cheeseburger` | Home page hero (the scroll stage) and the anatomy section; the Cheeseburger card on the home page and on the menu page |
| Chili cheeseburger | `chili-burger` | The Chili Cheeseburger card on the home page and on the menu page |
| Truffle burger | `truffle-burger` | The Truffle Burger card on the home page and on the menu page |
| Veggie burger | `veggie-burger` | The Veggie Burger card on the home page and on the menu page |
| Classic sliders | `classic-slider` | The Sliders section of the menu |
| Truffle sliders | `truffle-slider` | The Sliders section of the menu |
| Chili sliders | `chili-slider` | The Sliders section of the menu |
| Fries | `fries` | Sides &amp; Sauces on the menu |
| Toast | `toast` | Sides &amp; Sauces on the menu |
| Sauces | `sauces` | Sides &amp; Sauces on the menu |
| Vanilla shake | `vanilla-shake` | The Shakes section of the menu |
| Chocolate shake | `chocolate-shake` | The Shakes section of the menu |
| Strawberry shake | `strawberry-shake` | The Shakes section of the menu |
| Iced coffee | `iced-coffee-black` | The Coffee section of the menu |
| Iced coffee with ice cream | `iced-coffee-cream` | The Coffee section of the menu |

Each photo is used **only for its own product**.

**Two rules keep the sizes even.** First, every photo is trimmed hard to the
product itself — an invisible margin of near-transparent pixels around the
edge would push the product away from its frame and make it look smaller than
its neighbours. Second, where two photos show the *same physical object* —
the three shake cups, and the two iced coffee cups — they are placed on one
shared canvas at one shared scale, so they come out identical by construction
rather than by tuning. The three shakes and the two coffees are drawn at
exactly the same height as each other at every screen size.

> **Check the patty before changing the Veggie Burger photo.** During this
> build an image was first supplied for the Veggie Burger that actually
> showed beef patties and jalapeños; it belonged to the Chili Cheeseburger
> and was used there instead. Never put a meat photo on the Veggie Burger —
> someone ordering a vegetarian item from that picture would be actively
> misled. The correct veggie photo shows a falafel patty: chunky, herb
> flecked and golden brown, with no beef texture.

Both are placed directly in the HTML as `<picture>` elements with accurate
alt text, and use `object-fit: contain`, so a burger is scaled to fit and is
never cropped or stretched. The transparent background lets the brand
gradient show through behind it.

**To update a photo later:** re-export the same five files at the same sizes
and filenames, replacing what is in `images/`. No code changes needed. Keep
the transparent background, and keep the same proportions — otherwise the
`width`/`height` attributes in the HTML need updating too.

**To add the interior photo:** switch on its line in the PHOTO SLOTS block in
`css/style.css`, as described above. For any *new* product, copy one of the
existing `<picture>` blocks in `menu.html` and swap the filenames, the `alt`
text and the `width`/`height`. Wide products (burgers, sliders) use four
WebP files at 480/640/800/1200; the narrower three-across cards (sides,
shakes, coffee) use 300/400/540/800. Both add a PNG fallback.

### If you use AI-generated images

`images/PROMPTS.md` contains a ready-made prompt for each slot, written to
match this site's dark, warm, high-contrast look so the set stays visually
consistent.

**An AI-generated image is a stand-in, not a record of the real food.** It
shows a burger, not *this* burger. So:

- Replace them with real photographs of the restaurant's actual food and
  space before the site is promoted. This matters commercially as much as
  ethically — someone who orders from a picture expects what was pictured.
- While generated images are still in place, say plainly to anyone the site
  is shown to that the imagery is illustrative, not photographs of the
  restaurant.
- Check every generated image against the real menu and discard any showing
  something not actually served — a sesame bun when yours is plain, bacon
  that is not on the menu, a side that does not exist.
- Do not feed someone else's photo into a generator and ask for a version of
  it. The prompts describe the food in words for exactly this reason: the
  result is original rather than a derivative of a copyrighted photo.

Sizes, compression targets and free tools for shrinking files are all in
`images/PROMPTS.md`. Keep each image under 300KB.

---

## 4. Turning on the contact form

The form validates input and behaves correctly, but a static site has no
server to send email from, so it needs a free forwarding service.

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the endpoint it gives you (e.g. `https://formspree.io/f/abcd1234`).
3. Open `js/script.js` and paste it into the `FORM_ENDPOINT` line near the top:
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/abcd1234";
   ```
4. Commit.

Until that is set, submitting the form shows a message directing the visitor
to the phone number — so the page never appears broken to a customer.

---

## 5. Publishing

The site is hosted on GitHub Pages. In **Settings → Pages**, the source is set
to deploy from a branch. Any commit to that branch republishes the site
automatically within roughly a minute.

### If you register a custom domain

Search and replace `https://katemorree.github.io/First-website/` with the new
address in:

- the `<link rel="canonical">` and `og:url` tags in all four main pages
- the JSON-LD block in `index.html`
- `robots.txt`
- `sitemap.xml`

---

## 6. Where the content came from, and what is missing

### Sourcing

All business details on the site — the name in English and Georgian, the
address, the phone number, the opening hours (daily 12:00–02:00), the full
menu with prices, and the Wolt and Glovo store links — were **verified from
current public listings**, not confirmed directly with the business.

Nothing has been invented. Before this site is treated as an official
source, someone at the restaurant should read it through and confirm the
details are still accurate, since public listings go out of date.

**Deliberately left out**, because it could not be verified:

- Per-size pricing for the cheeseburger. S/M/L is shown as a note only.
- Wolt and Glovo promotional pricing. The site lists standard menu prices,
  which do not move with temporary platform discounts.

### Delivery links

- Wolt — `https://wolt.com/en/geo/tbilisi/restaurant/sameo`
- Glovo — `https://glovoapp.com/en/ge/tbilisi/stores/sameo-tbi`

They appear four times across two files — `index.html` (the order band) and
`contact.html` (the order cards) — plus once each in the `sameAs` list in the
structured data in `index.html`. If a platform ever changes a store address,
search for `wolt.com` and `glovoapp.com` to find every instance.

### Not on the site, and deliberately so

None of the following exist anywhere in the code. They are omitted rather
than filled with placeholders, because inventing any of them would put false
information in front of customers:

- **Email address** — no contact email is shown; the form and phone number
  are the only contact routes
- **Instagram / Facebook** — no social links, icons, or handles anywhere
- **Founding story** — the About page carries brand and process writing
  only, with no dates, founders, or history claims
- **Photography** — the design is built to look complete without it. Nine
  photo slots are wired and waiting; see §3. Any AI-generated stand-ins must
  be replaced with real photographs of the restaurant before promotion.

To add any of these later, supply the real details and they can be dropped
in. Do not fill them with sample content in the meantime.

### The testimonials section (demonstration content)

The home page has a testimonials section holding **fictional sample quotes**,
added to show the layout. It is labelled as sample content in three ways:

1. A dashed "Sample content" notice above the cards explaining the quotes are
   fictional and not from Google or any delivery platform.
2. A "Sample" badge on every individual card, so the label survives if one
   card is screenshotted on its own.
3. A "Demonstration text, not a real review" line under each name.

Fictional first names only are used (Nino, Luka, Mariam). There are
deliberately **no star ratings and no "verified customer" style claims**,
because a rating nobody actually gave would be a fabricated claim.

**To swap in genuine reviews**, edit the three `<figure class="quote-card">`
blocks in `index.html`: replace the quote text and the name, then delete the
`<span class="badge-sample">Sample</span>` line and the
`<span>Demonstration text, not a real review</span>` in each card, and remove
the whole `<p class="demo-note">` block above them.

⚠️ **Do not add `Review` or `AggregateRating` structured data while the quotes
are still samples.** That markup feeds ratings to Google, and publishing
invented ratings is both dishonest and against Google's review snippet
guidelines. Add it only once the reviews are real.

### Updating a price

Prices live in `menu.html` (all of them) and `index.html` (the four burgers
on the home page). If a burger price changes, update **both** files.

---

## 7. Technical notes

- **Accessibility**: skip link, visible focus rings, labelled form fields,
  `aria-current` on the active nav item, `aria-expanded` on the menu toggle,
  and inputs at 16px so iOS Safari does not zoom on focus.
- **SEO**: unique title and meta description per page, canonical URLs, Open
  Graph tags, a sitemap, and `Restaurant` structured data on the home page.
- **Performance**: no libraries or frameworks; three fonts; the map iframe is
  lazy-loaded.
- **Resilience**: scroll animations are progressive enhancement — if
  JavaScript fails, all content still renders.
- **Motion**: all animation is disabled automatically for visitors who have
  "reduce motion" switched on.
- Verified for horizontal overflow from 320px to 1920px wide.

---

## 8. Scroll animations

The home page has three scroll-driven sections. Everything else on the site
uses only the gentle fade-up reveals.

| Section | What happens |
|---|---|
| **Hero stage** | Pins for about two screens. The burger shrinks and drifts right, the two headline lines separate left and right, an oversized outlined wordmark scales behind them, and the sub-copy and buttons clear out. |
| **Anatomy of the smash** | Pins for about three screens. The burger stays centred while three captions — The Press, The Crust, The Build — step past it. |
| **What we smash** | Pins for about three and a half screens. The four burgers hand over one to the next: the outgoing one clears, the incoming one arrives from the right and settles, and its name, price and description follow a beat behind. A glow behind the burger drifts about a third as far, so the two planes separate as you scroll. A rail underneath shows where you are in the four. |

**The showcase is an override, not a rebuild.** Below 901px, with JavaScript
off, or with reduced motion on, the pin never switches on and those four
burgers are the same two-by-two cards they have always been. There is one copy
of the markup; only the presentation changes.

### How it is built

- `position: sticky` does the pinning. JavaScript never positions anything.
- `js/script.js` writes **one number** per section onto the section element:
  `--p` for the hero, `--q` for the anatomy, `--r` for the showcase, each
  running 0 to 1 as you scroll through it. Every movement is calculated from that number with `calc()` in
  `css/style.css`.
- **All the tuning lives in the CSS**, in the block headed
  `SCROLL STAGE + ANATOMY`. To make the burger travel further, change
  `--amp-x`. To make it shrink more, change `--amp-scale`. You do not need to
  touch the JavaScript.

### Why it stays fast

- One `requestAnimationFrame` loop drives every section, not one per element.
- Only `transform` and `opacity` are animated — both are handled by the GPU,
  so scrolling never triggers a re-layout.
- `IntersectionObserver` switches a section off while it is off-screen.
- Measured with the CPU throttled 4x to imitate a mid-range phone: **zero long
  tasks** while scrolling the whole page.

### Accessibility and fallbacks

- **Reduced motion:** if the visitor has "reduce motion" switched on, the loop
  never starts, the tall tracks collapse to normal height, nothing pins, and
  all three anatomy captions are shown stacked and readable.
- **No JavaScript:** identical result — the tracks collapse and the hero shows
  its resting state with the buttons visible.
- **Micro-interactions** — the press on a button, the lift on a product photo,
  the price that warms up under the pointer — are all colour or `transform`,
  and the hover half is behind `@media (hover: hover)` so a phone never leaves
  something stuck in its hover state after a tap. Reduced motion switches the
  movement off and keeps the colour.
- The pinned sections are sized so their content always fits one screen, down
  to a 320x568 phone. On very short screens the hero's facts strip is hidden,
  since the same information is repeated in the location section and footer.

---

## 9. Languages (English / Русский / ქართული)

The site is in three languages. English is the original: it is what is written
in the HTML files. Russian and Georgian are swapped in by the browser.

**⚠️ The Russian and Georgian were written by Claude, not by a native speaker.
Have someone local read the Georgian before you rely on it — that is the
restaurant's home market, and a clumsy sentence there costs more than a clumsy
one in English.**

### What a visitor sees

1. On a first visit, a full-screen chooser: *Choose your language / Выберите
   язык / აირჩიეთ ენა*, with three buttons.
2. The choice is remembered in their browser, so they are never asked again.
3. A switcher stays in the header. On a computer or iPad it is three pills —
   EN, RU, KA. On a phone there is no room beside the logo, so it becomes one
   button showing the current language; tapping it reopens the full-screen
   chooser.

### How to change a translation

Open `js/i18n-data.js`. It is a long list of pairs:

```js
"View Menu": "Смотреть меню",
```

The **left side is the English exactly as it appears on the site**, and the
right side is the translation. Edit the right side and commit. That is the
whole job.

### How to change English text

This is the part to be careful about. The English is the key, so changing it in
the HTML alone breaks the link and the sentence stays English in all three
languages.

Change it in **two** places:

1. The HTML file — e.g. `<h2 data-i18n>Order Your Smash</h2>`.
2. The matching key in `js/i18n-data.js`, in **both** the `ru:` and `ka:`
   blocks.

Nothing breaks if you forget: the text simply stays in English rather than
going blank.

### How to add a new translatable line

Put `data-i18n` inside the opening tag:

```html
<p data-i18n>Open on public holidays too.</p>
```

Then add the English and its translations to `js/i18n-data.js` under `ru:` and
`ka:`. For text that lives in an attribute rather than between tags — the
`alt` on an image, an `aria-label` — name the attribute instead:

```html
<img data-i18n-attr="alt" alt="Sameo cheeseburger" src="...">
```

### Things worth knowing

- **The chooser and the switcher are not in the HTML files.** `js/i18n.js`
  builds them, so there is one copy to edit rather than five. The markup is at
  the top of that file.
- **Fonts.** Archivo Black and Poppins have no Cyrillic and almost no Georgian,
  so Montserrat and Noto Sans Georgian are loaded alongside them. A visitor
  only downloads the alphabet their language actually needs.
- **Search engines index the English only.** Google reads the HTML, and the
  HTML is English; the Russian and Georgian are applied afterwards by the
  browser. Real multilingual SEO needs a separate page per language
  (`/ru/index.html`, `/ka/index.html`), which is a bigger change and worth
  doing only if search traffic in those languages matters. Visitors are
  unaffected — they see their language immediately.
- **If JavaScript is off,** the site stays fully in English and everything
  still works.
