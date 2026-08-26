# Sameo Smash — Website (Demo/Concept)

A modern, fast, mobile-friendly website for **Sameo Smash / სეიმო სმეშ**, a smash burger
restaurant in Tbilisi, Georgia. This is a concept/demo site built to show what a real
website could look like — several details are placeholders until the real business info
is provided (see **"What still needs to be filled in"** below).

Built with plain **HTML, CSS and JavaScript** — no frameworks, no build tools, no npm
install. This was a deliberate choice: it's the simplest technology that still gives a
fast, professional result, and it's the easiest for a beginner to open and edit directly
on GitHub, from an iPad or anywhere else.

---

## 1. File structure (what's in this repo)

```
index.html      → Home page
menu.html       → Full menu page
about.html      → About page
contact.html    → Contact, location, delivery and the contact form
css/style.css   → All the site's design (colors, fonts, spacing, layout)
js/script.js    → Small scripts: mobile menu, scroll animations, contact form
images/         → Photos and icons go here (currently placeholders)
robots.txt      → Tells search engines they can index the site
sitemap.xml     → Lists all pages for search engines
```

Every page repeats the same header (navigation) and footer. That's intentional — with no
build tool, copy-pasting the header/footer is the simplest thing to understand and edit.
If you change the navigation, just make the same edit on all 4 pages.

---

## 2. How to edit content (no coding tools needed)

You can do all of this from an iPad using the GitHub website or app:

1. Open the file you want to change (e.g. `menu.html`) in this repository on GitHub.
2. Tap the **pencil / edit icon**.
3. Find the text you want to change — it's plain English inside the page, e.g.:
   ```html
   <h3>Classic Smash</h3>
   <p class="desc">[placeholder description]</p>
   <span class="price">₾ —</span>
   ```
4. Type your changes directly (e.g. replace `[placeholder description]` with the real
   description, and `₾ —` with a real price like `₾ 18`).
5. Scroll down and tap **Commit changes** to save.

Anything wrapped in `[square brackets]` is a placeholder — search for `[` if you want to
find everything that still needs real content.

### Adding real photos

Right now every photo is a dashed placeholder box that says "Photo placeholder" — this is
intentional, since we didn't want to invent fake stock photography for a real business.

To add a real photo:
1. Upload your photo into the `images/` folder (drag-and-drop works on the GitHub website;
   on the GitHub iPad app you can upload from your Photos library).
2. Find the matching placeholder block in the HTML, which looks like this:
   ```html
   <div class="photo-placeholder">
     <span class="ph-icon">📷</span>
     <span>Hero photo placeholder...</span>
   </div>
   ```
3. Replace the whole `<div class="photo-placeholder">...</div>` block with:
   ```html
   <img src="images/your-photo-name.jpg" alt="Describe the photo here" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />
   ```
   The `alt` text matters for SEO and for visually-impaired visitors — describe what's in
   the photo (e.g. "Smash burger with melted cheese on a wooden board").

### Changing colors / fonts

Open `css/style.css` and look at the very top — there's a section called `1. VARIABLES`.
Changing a value there (e.g. `--color-primary: #ff5a1f;`) updates that color everywhere on
the site automatically.

---

## 3. Turning on the contact form (Formspree — free, ~2 minutes)

The contact form on `contact.html` is fully built and validated, but it needs a free
backend service to actually deliver messages to an inbox (a plain static site has no
server to send email from). We used **Formspree** because it's the simplest reliable
option for a static site — no server, no code.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy the endpoint URL it gives you (looks like
   `https://formspree.io/f/abcd1234`).
3. Open `contact.html`, find this line:
   ```html
   action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ENDPOINT"
   ```
4. Replace `REPLACE_WITH_YOUR_FORM_ENDPOINT` with your real form ID.
5. Commit the change. That's it — messages will now arrive in the email you signed up with.

Until you do this, submitting the form just shows a friendly demo message instead of
sending anything (so nothing breaks in the meantime).

---

## 4. How to preview the site before publishing

**Easiest option — GitHub Pages (free, no extra tools):**
1. On GitHub, go to this repository's **Settings → Pages**.
2. Under "Build and deployment", set Source to **Deploy from a branch**.
3. Pick this branch and the `/ (root)` folder, then Save.
4. GitHub gives you a live web address (like `https://yourusername.github.io/First-website/`)
   within a minute or two — open it on your iPad, phone, or any computer to see the real site.

Any time you commit a change to that branch, the live site updates automatically within a
minute — no separate "build" or "deploy" step needed.

---

## 5. What still needs to be filled in

This is a demo built from the information available. To make it fully accurate, please
provide (or edit in directly):

- **Opening hours** — shown as a placeholder on the Home and Contact pages.
- **Real menu items, descriptions, ingredients and prices** — every menu item is currently
  a labeled example.
- **Real customer reviews** — the review section uses clearly-marked sample quotes.
- **Instagram / Facebook handles** — social links are placeholders (`#`).
- **Wolt / Glovo delivery links**, if you use those platforms.
- **Real photos** — of the food, the space, and the team.
- **A contact email**, if you'd like one listed.
- **The real brand story** for the About page (we intentionally avoided inventing history,
  founders, or dates).
- **A real domain name** — once you have one, update the `<link rel="canonical">` and
  `og:url` tags in each page's `<head>`, and the URLs in `robots.txt` and `sitemap.xml`.

Search the files for `[` or "placeholder" to find every spot that needs real content.

---

## 6. Why this tech stack

- **No build tools / frameworks** → you can edit a text file and see the result; nothing to
  install, nothing to break.
- **Fast loading** → no heavy JavaScript libraries; fonts and images load efficiently.
- **SEO-friendly** → every page has a unique title/description, semantic HTML, and
  structured data (`Restaurant` schema) so Google understands the business.
- **Accessible** → proper headings, labels, focus states, alt text support, and a "skip to
  content" link for keyboard/screen-reader users.
- **Easy to deploy anywhere** → works on GitHub Pages, Netlify, Vercel, or any basic web
  host, since it's just static files.
