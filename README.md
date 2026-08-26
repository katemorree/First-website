# Sameo Smash — Website

Website for **Sameo Smash / სამეო სმეშ**, a smash burger restaurant at
1 Vashlovani St, Tbilisi 0108, Georgia.

Built with **Next.js and React**. The pages are React components rather than
HTML files, and a build step turns them into ordinary HTML, CSS and
JavaScript that GitHub Pages serves.

**What that changed.** The site used to be plain HTML files you could edit on
GitHub from an iPad and see live a minute later. Now a change has to be built
first. That happens automatically — pushing to `main` triggers the workflow in
`.github/workflows/deploy.yml`, which builds the site and publishes it — but
it takes a few minutes rather than a few seconds, and the files you edit are
`.jsx` rather than `.html`.

**One-time setup, without which nothing publishes:** in this repository, go to
**Settings → Pages** and set **Source** to **GitHub Actions** (not a branch).

---

## 1. Where everything lives

| Path | Purpose |
|---|---|
| `app/page.jsx` + `app/HomeView.jsx` | Home page |
| `app/menu/` | Full menu with prices |
| `app/about/` | About — brand story and how the kitchen works |
| `app/contact/` | Location, directions, ordering, and the contact form |
| `app/not-found.jsx` | Shown if someone hits a wrong address |
| `app/layout.jsx` | The shell every page sits in: fonts, search-engine data, the no-flash boot script |
| `app/globals.css` | **All styling.** Section map at the top of the file |
| `components/` | The reusable pieces — Navbar, Hero, ProductCard, OrderProvider, Footer and the rest |
| `lib/i18n-data.js` | **The Russian and Georgian text.** This is the file to edit for translations |
| `lib/language.jsx` | The language system — the chooser, the switcher, the swapping |
| `lib/products.js` | Every product with a photo: name, price, description, image size |
| `lib/menu-panels.js` | The price lists with no photos — sides, sauces, coffee, drinks |
| `lib/site.js` | Phone number, address, hours, Wolt and Glovo links — **all in one place** |
| `public/images/` | Every photograph |

Each route has two files: a small `page.jsx` that carries the search-engine
metadata, and a `*View.jsx` next to it with the actual page in it. That split
exists because the metadata has to be worked out on the build machine while
the page itself runs in the browser.

**The header and footer are written once**, in `components/Navbar.jsx` and
`components/Footer.jsx`, and every page uses them. Changing a navigation link
is now one edit rather than five.

---

## 2. Editing content

### Running it on your own machine

```
npm install     # once
npm run dev     # then open http://localhost:3000/First-website
```

Changes appear as you save. `npm run build` produces the published version in
`out/`.

### Editing on GitHub

1. Open the file on GitHub and tap the pencil / edit icon.
2. Change the text between the tags — e.g. `<h3><T>Sliders</T></h3>`.
3. Tap **Commit changes**, then wait a few minutes for the build.

The `<T>` around visitor-facing text is the translation system. Leave it in
place, and change the English inside it — then change the matching key in
`lib/i18n-data.js` so the Russian and Georgian still match. Section 10 covers
this properly.

**The phone number, address and delivery links are in `lib/site.js` only.**
Change them there and they change everywhere on the site.

### Prices

Products with a photo: `lib/products.js`. Everything else: `lib/menu-panels.js`.

### Colours and fonts

Open `app/globals.css` and edit the `:root` block at the top. Changing
`--flame` (the orange) updates every button, accent and highlight at once.

The four typefaces are loaded in `app/layout.jsx`. They are downloaded when
the site is built and served from this site rather than from Google, so they
load even for a visitor whose network blocks Google, and no third party is
told who is reading the page.

---

## 3. Photography

Every product on the menu now has a **real photograph**. One position is
still waiting for a picture — the room itself, on the About page — and until
it has one it renders a brand graphic rather than a gap, so nothing looks
broken or empty.

### Adding a photo — one line, one file

One photo slot is left: the interior shot on `app/about/AboutView.jsx`. To switch it on:

1. Put your image in the `public/images/` folder, named exactly as listed in
   `public/images/PROMPTS.md`.
2. Open `app/globals.css`, scroll to the **PHOTO SLOTS** block at the very
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

**Cheeseburger** — files in `public/images/`:

| File | Size | Purpose |
|---|---|---|
| `cheeseburger-480.webp` | 73 KB | small phones at 1x |
| `cheeseburger-640.webp` | 122 KB | small phones at 2x, desktop 1x |
| `cheeseburger-800.webp` | 186 KB | phones and tablets at 2x |
| `cheeseburger-1200.webp` | 379 KB | desktop at 2x (retina) |
| `cheeseburger.png` | 523 KB | fallback for browsers without WebP |

**Chili cheeseburger** — files in `public/images/`:

| File | Size | Purpose |
|---|---|---|
| `chili-burger-480.webp` | 87 KB | small phones at 1x |
| `chili-burger-640.webp` | 151 KB | small phones at 2x, desktop 1x |
| `chili-burger-800.webp` | 240 KB | phones and tablets at 2x |
| `chili-burger-1200.webp` | 469 KB | desktop at 2x (retina) |
| `chili-burger.png` | 638 KB | fallback for browsers without WebP |

**Veggie burger** — files in `public/images/`:

| File | Size | Purpose |
|---|---|---|
| `veggie-burger-480.webp` | 74 KB | small phones at 1x |
| `veggie-burger-640.webp` | 126 KB | small phones at 2x, desktop 1x |
| `veggie-burger-800.webp` | 200 KB | phones and tablets at 2x |
| `veggie-burger-1200.webp` | 397 KB | desktop at 2x (retina) |
| `veggie-burger.png` | 538 KB | fallback for browsers without WebP |

**Truffle burger** — files in `public/images/`:

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
and filenames, replacing what is in `public/images/`. No code changes needed. Keep
the transparent background, and keep the same proportions — otherwise the
`width`/`height` attributes in the HTML need updating too.

**To add the interior photo:** switch on its line in the PHOTO SLOTS block in
`app/globals.css`, as described above. For any *new* product, copy one of the
entries in `lib/products.js` and change the filename, the `alt` text and
the `width`/`height`. Wide products (burgers, sliders) use four
WebP files at 480/640/800/1200; the narrower three-across cards (sides,
shakes, coffee) use 300/400/540/800. Both add a PNG fallback.

### If you use AI-generated images

`public/images/PROMPTS.md` contains a ready-made prompt for each slot, written to
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
`public/images/PROMPTS.md`. Keep each image under 300KB.

---

## 4. Turning on the contact form

The form validates input and behaves correctly, but a static site has no
server to send email from, so it needs a free forwarding service.

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the endpoint it gives you (e.g. `https://formspree.io/f/abcd1234`).
3. Open `components/ContactForm.jsx` and paste it into the `FORM_ENDPOINT`
   line near the top:
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/abcd1234";
   ```
4. Commit.

Until that is set, submitting the form shows a message directing the visitor
to the phone number — so the page never appears broken to a customer.

---

## 5. Publishing

The site is hosted on GitHub Pages, built by the workflow in
`.github/workflows/deploy.yml`.

**Set this once or nothing publishes:** in **Settings → Pages**, set
**Source** to **GitHub Actions**. Not a branch — the old setting built
nothing, because there was nothing to build.

After that, every push to `main` rebuilds and republishes the site. Watch it
happen in the **Actions** tab; it takes a few minutes. If a build fails the
site stays as it was rather than breaking, and the Actions tab says why.

### Deploying to Vercel instead

Nothing needs changing. Point Vercel at the repository and it will detect
Next.js, run `npm run build` and serve the result. The two settings that
differ by host both default to what Vercel needs:

- **The base path is empty**, so the site sits at the root of the domain.
  GitHub Pages is the exception, and its workflow sets `BASE_PATH` itself.
- **The address is worked out from the deployment**, so canonical tags,
  `sitemap.xml`, `robots.txt` and the restaurant's structured data all
  describe the right domain without being told.

Once there is a real domain, set `SITE_URL` in the Vercel project settings to
it — the automatic value follows Vercel's own domain, which is fine for a
preview but not what you want search engines to record.

One optional improvement on Vercel: `output: 'export'` in `next.config.mjs`
builds the site as plain files, which is what a file host needs. Vercel can
run Next.js properly, so removing that line would switch on the image
optimiser. The product photos would gain little — they are already exported
at four sizes each by hand — but it costs nothing to try.

### If you register a custom domain

Set `SITE_URL` to it wherever the site is built: in the Vercel project
settings, or in `.github/workflows/deploy.yml` for GitHub Pages. Everything
that mentions the address is generated from it.

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

They are written once, in `lib/site.js`, and everything else reads them from
there — the order chooser, the order cards on the Contact page, the band at
the foot of the home page, and the structured data. If a platform ever
changes a store address,
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

### Reviews — there is no section on the site yet

The home page used to carry three quotes under a "What People Say" heading.
They were **fictional**, written to show the layout, and labelled "Sample" on
the page. They have been removed. A made-up review is worth nothing to a
customer, and a section that has to explain it is not real is worse than no
section at all.

Nothing has replaced them, because **no genuine review for Sameo Smash could
be found on a public page.** What was searched:

| Source | Result |
|---|---|
| Wolt | Blocked to this machine. A search summary reported a 9.4 score, but that is an average, not a review with a name and words, and the page could not be read directly to confirm it. |
| Glovo | Blocked to this machine. A search summary mentioned "recommended by 96%" — again an average, unverified. |
| Google Maps | Blocked to this machine. |
| Web search | Turned up review text, but all of it belongs to **a different restaurant** — a place called Smash on Ilo Mosashvili Street. Using those words here would mean putting one business's reviews on another's website. |

**The trap to avoid.** There is at least one other burger restaurant in
Tbilisi with a similar name and a similar menu. Before using any review you
find, check that it names *this* address — 1 Vashlovani St.

### Adding real reviews when you have them

The section is ready and waiting in `components/Reviews.jsx`. Fill in the
`REVIEWS` array at the bottom of that file — the section draws itself as soon
as there is anything in it, and stays away while it is empty. Three to six
looks best; the cards sit three across.

Each card takes a name, the review itself, the source, and stars:

```html
<figure class="quote-card">
  <p class="quote-card__stars" aria-label="5 out of 5">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
  <blockquote>
    <p>The review, exactly as it was written.</p>
  </blockquote>
  <figcaption>Nino <span>Google Maps</span></figcaption>
</figure>
```

Rules worth keeping to:

- **Copy the words exactly.** Do not tidy the grammar, do not shorten a
  review to fit the card, and do not translate it — a review written in
  Georgian stays in Georgian, and that is fine on all three language
  settings. Only the heading above the cards is translated.
- **First name or public display name only.** That is what the person chose
  to show; a full name they did not publish is not yours to add.
- **Stars only if the source shows stars.** Wolt and Glovo score out of ten,
  not five, so either drop the stars line for those or write the score the
  way the platform writes it.
- **Name the source** in the `<span>` — Google Maps, Wolt, Glovo. It is what
  lets a reader go and check.

⚠️ **Do not add `Review` or `AggregateRating` structured data**, even once
the reviews are real. That markup hands Google a score for the business as a
whole; Google expects it to match a rating it can verify, and gets stern
about sites that publish one it cannot. Quoting reviews on the page is fine.
Claiming an overall score in the page's data is a different thing.

### Updating a price

Prices live in `lib/products.js` (everything with a photo) and
`lib/menu-panels.js` (the four burgers
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
| **Hero stage** | Pins for about three screens. The burger turns a full circle while it shrinks and drifts right and back into the scene; the two headline lines separate left and right; the outlined wordmark drifts the other way behind them. The intro paragraph clears early, but **the two buttons hold at full strength until about two-thirds of the way through** — they are the point of the page. |
| **Anatomy of the smash** | Pins for about three screens. The burger stays centred while three captions — The Press, The Crust, The Build — step past it. |
| **What we smash** | Pins for about three and a half screens. The four burgers hand over one to the next: the outgoing one clears, the incoming one arrives from the right and settles, and its name, price and description follow a beat behind. A glow behind the burger drifts about a third as far, so the two planes separate as you scroll. A rail underneath shows where you are in the four. |

**The showcase is an override, not a rebuild.** Below 901px, with JavaScript
off, or with reduced motion on, the pin never switches on and those four
burgers are the same two-by-two cards they have always been. There is one copy
of the markup; only the presentation changes.

### How it is built

- `position: sticky` does the pinning. JavaScript never positions anything.
- `lib/useScrollSections.js` writes **one number** per section onto the section element:
  `--p` for the hero, `--q` for the anatomy, `--r` for the showcase, each
  running 0 to 1 as you scroll through it. The hero gets three more —
  `--spin`, `--face` and `--fix` — because the turn needs trigonometry and
  CSS cannot yet do that in every browser this site supports. Every movement is calculated from that number with `calc()` in
  `app/globals.css`.
- **All the tuning lives in the CSS**, in the block headed
  `SCROLL STAGE + ANATOMY`. To make the burger travel further, change
  `--amp-x`. To make it shrink more, change `--amp-scale`. You do not need to
  touch the JavaScript.

### About that 360° turn

The burger is **one flat photograph**, not a turntable sequence, and that
sets a hard limit on what a spin can be. A flat thing turned exactly side-on
has no width at all, so left alone it thins to a hairline and vanishes.
Because the turn is driven by scrolling, a visitor can stop on any angle they
like, so "it goes past too fast to notice" is not an answer.

Three things handle it, all at the top of `lib/useScrollSections.js`:

| Knob | What it does |
|---|---|
| `DWELL` | How much the turn lingers face-on and hurries through the turning-away quarters. 0 is a constant speed, 1 is almost a stop. |
| `FLOOR` | The narrowest the burger is allowed to get, as a fraction of itself. 0.42 today. |
| `EDGE` | The turn runs to 86°, steps across the few degrees either side of side-on, and carries on from 94°. Same width on both sides of the step, so it reads as the burger flipping through. |

Past 180° the browser draws the picture mirrored, and for a burger shot from
the side that reads as its other cheek rather than as a mistake.

**If you ever get a proper turntable sequence** — the same burger
photographed every 15° or so on a rotating plate — a real 360° becomes
possible, and it would look better than this does. Ask for it if you are
booking a photographer anyway; it is a single extra setup on the day.

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
- **Short screens:** the same thing happens under about 600px of viewport
  height — an older small phone, or any phone turned sideways. A pinned
  section gets exactly one screen to fit in, and below that height the
  headline, the buttons and the burger no longer do; what used to happen is
  that the two calls to action were quietly cut off the bottom. Now the hero
  simply lays itself out and scrolls.
- **No JavaScript:** identical result — the tracks collapse and the hero shows
  its resting state with the buttons visible.
- **Micro-interactions** — the press on a button, the lift on a product photo,
  the price that warms up under the pointer — are all colour or `transform`,
  and the hover half is behind `@media (hover: hover)` so a phone never leaves
  something stuck in its hover state after a tap. Reduced motion switches the
  movement off and keeps the colour.
- The pinned sections are sized so their content always fits one screen
  wherever they pin at all. On short screens the hero's facts strip is
  hidden, since the same information is repeated in the location section and
  the footer, and below 600px of height the hero stops pinning altogether.

---

## 9. The Order Now button

Every **Order Now** on the site — in the header, in the hero, in the band at
the foot of each page, and in the bar that sits at the bottom of a phone
screen — opens the same small window with three ways to order:

| Option | Where it goes |
|---|---|
| Order on Wolt | the restaurant's Wolt page, in a new tab |
| Order on Glovo | the restaurant's Glovo page, in a new tab |
| Call to Order | the phone dialler, on +995 511 10 08 35 |

**Nothing dials straight away.** A button that starts a phone call the
instant you touch it is an unpleasant surprise, and two of the three ways to
order here are not the phone at all. The visitor picks.

### Editing it

The window is `components/OrderProvider.jsx`. There is one copy of it,
mounted once for the whole site, so changing the wording or adding a fourth
option is a single edit. Its text is written in English like the rest of the
site and is translated the same way, through `lib/i18n-data.js`.

**To turn an existing button into one that opens it,** call `openOrder` from
the `useOrder()` hook:

```html
<a
  className="btn btn--primary"
  href="/contact/#order"
  onClick={(e) => { e.preventDefault(); openOrder(e.currentTarget); }}
>
  <T>Order Now</T>
</a>
```

Keep the `href`. It is what happens if JavaScript does not run — the button
still goes to the order section on the Contact page — and it is what a
visitor gets if they open the link in a new tab on purpose.

**If the Wolt or Glovo address ever changes,** it appears in three places:
`lib/site.js`, and only there.

---

## 10. Languages (English / Русский / ქართული)

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

Open `lib/i18n-data.js`. It is a long list of pairs:

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
2. The matching key in `lib/i18n-data.js`, in **both** the `ru:` and `ka:`
   blocks.

Nothing breaks if you forget: the text simply stays in English rather than
going blank.

### How to add a new translatable line

Put `data-i18n` inside the opening tag:

```html
<p data-i18n>Open on public holidays too.</p>
```

Then add the English and its translations to `lib/i18n-data.js` under `ru:` and
`ka:`. For text that lives in an attribute rather than between tags — the
`alt` on an image, an `aria-label` — name the attribute instead:

```html
<img data-i18n-attr="alt" alt="Sameo cheeseburger" src="...">
```

### Things worth knowing

- **The chooser and the switcher are components**, in
  `components/LanguageGate.jsx` and `components/LanguageSwitcher.jsx`. One
  copy of each, used everywhere.
- **Fonts.** Archivo Black and Poppins have no Cyrillic and almost no Georgian,
  so Montserrat and Noto Sans Georgian are loaded alongside them. All four are
  downloaded when the site is built and served from this site, so they work
  even on a network that blocks Google, and a visitor only downloads the
  alphabet their language actually needs.
- **Search engines index the English only.** Google reads the HTML, and the
  HTML is English; the Russian and Georgian are applied afterwards by the
  browser. Real multilingual SEO needs a separate page per language
  (`/ru/`, `/ka/`), which is a bigger change and worth
  doing only if search traffic in those languages matters. Visitors are
  unaffected — they see their language immediately.
- **If JavaScript is off,** the site stays fully in English and everything
  still works.
