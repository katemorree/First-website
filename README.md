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

## 3. Adding real photography

The site is designed to look finished **without** photos — the hero uses a
brand disc motif and the menu uses typographic cards. Photos are an upgrade,
not a missing piece, so nothing looks broken while you wait for them.

To place a photo in a menu card, replace this block:

```html
<div class="feature__face"><span>Smash</span></div>
```

with:

```html
<div class="feature__face">
  <img class="photo" src="images/smash-burger.jpg" alt="Smash burger with melted cheese">
</div>
```

Upload the image to the `images/` folder first. The `.photo` class already
handles correct cropping and sizing. Always write a short, literal `alt`
description — it matters for Google and for screen readers.

Photos work best at roughly 1600px wide, saved as JPG under ~300KB each.

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

## 6. What is verified vs. still needed

Everything published uses confirmed information only: name (English and
Georgian), address, phone, opening hours (daily 12:00–02:00), the full menu
with prices, and that delivery runs through Wolt and Glovo. Nothing has been
invented.

**Deliberately not stated**, because it is unverified:

- Per-size pricing for the cheeseburger. The S/M/L options are shown as a
  note only — no size prices are listed.
- Any Glovo or Wolt promotional pricing. The site lists standard menu
  prices, which do not change with temporary platform discounts.

**Needs checking before showing this to the business:**

- ⚠️ **The two delivery links.** The Wolt and Glovo store URLs were found by
  search and could not be opened to confirm, because both domains are
  blocked from the build environment. Both listings are named "Sameo" rather
  than "Sameo Smash". Open each link and confirm it is the right restaurant:
  - `https://wolt.com/en/geo/tbilisi/restaurant/sameo`
  - `https://glovoapp.com/en/ge/tbilisi/stores/sameo-tbi`

  They appear four times in two files — `index.html` (the order band) and
  `contact.html` (the order cards). Search for `wolt.com` and `glovoapp.com`
  to find them all.

**Still to be supplied:**

- **Photography** — food, interior, and team
- **Instagram / Facebook accounts** — no social links are shown anywhere,
  by request, until the official handles are confirmed
- **A contact email address**
- **Real customer reviews**, ideally pulled from Google
- **The founding story** — dates, people, and history

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
