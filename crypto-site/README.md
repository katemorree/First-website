# Satsight — crypto comparison & affiliate website

A fast, dark-mode affiliate site for crypto exchanges, wallets, trading tools and beginner education.
Built with **Next.js 16, TypeScript and Tailwind CSS**, ready to deploy on **Vercel**.

> This project lives in the `crypto-site/` folder. The restaurant website in the rest of
> this repository is separate and untouched.

---

## ⚠️ Before you launch — checklist

The site is built and working, but some content is a **draft** you must check first.
Amber **"VERIFY"** badges show you exactly where (they disappear once you set
`NEXT_PUBLIC_SHOW_DRAFT_MARKERS=false`).

1. **Brand name** — "Satsight" is a placeholder. Check the domain and trademark are free, then change `name` in `src/lib/site.ts`.
2. **Platform facts** — open `src/content/platforms.ts`. Check every fee, coin count, price and availability note on the platform's own website. Set `lastVerified: "YYYY-MM-DD"` on each one you check.
3. **Scores** — all scores are `scoreStatus: "draft"`. Adjust them after you've used the platforms, then set `"verified"` (this also turns on Google review stars for review pages).
4. **Reviews and comparison** — re-read `src/content/reviews.ts` and `src/content/comparisons.ts` against the current fee pages.
5. **Affiliate links** — paste your links into `platforms.ts` (see below).
6. **About page** — add your real name and background in `src/app/about/page.tsx`.
7. **Legal pages** — Privacy, Terms and Risk pages are templates. Fill in the `[TODO]` parts (your business name, address, country) and have a lawyer review them. Affiliate marketing for crypto is regulated in some countries (e.g. UK financial promotions rules).
8. **Contact email** — change `contactEmail` in `src/lib/site.ts`.
9. Check each affiliate program's rules — some (e.g. Binance, Bybit) restrict promotion in certain countries or on paid ads.

---

## Where to edit things

| I want to… | Edit this file |
| --- | --- |
| Change an affiliate link, referral code, button text, fee, score, pros/cons | `src/content/platforms.ts` |
| Add a new exchange, wallet or tool | `src/content/platforms.ts` (copy an entry) |
| Edit the Bybit/Binance reviews or add a review | `src/content/reviews.ts` |
| Edit or add a "X vs Y" comparison | `src/content/comparisons.ts` |
| Add or edit a guide | `src/content/articles/*.md` (see the README in that folder) |
| Change site name, email, social links, menu | `src/lib/site.ts` |
| Change colours / fonts | `src/app/globals.css` (top section) |

### Adding an affiliate link
In `src/content/platforms.ts`, find the platform and fill in:

```ts
affiliate: {
  url: "https://partner.bybit.com/b/YOURCODE",   // your link
  referralCode: "YOURCODE",                       // optional, shown under the button
  ctaText: "Visit Bybit",                         // optional button text
  offer: "",                                      // optional public offer (appears on /deals) — verify terms first
  commissionNotes: "30% rev share",               // private, never shown
},
```

That's it — every button, table, review, comparison and `/go/` link updates automatically.
Affiliate buttons automatically get `rel="sponsored"` and an "Affiliate link" label.
Platforms with an empty `url` link to the official site and say "not an affiliate link".

### Short links for TikTok / Instagram / YouTube bios
Every platform has a short link: `yourdomain.com/go/bybit`, `yourdomain.com/go/ledger`, etc.
They redirect to your current affiliate link, so you can change the link later without
editing old videos or bios.

---

## Deploying to Vercel (works on iPad in Safari)

1. Go to **vercel.com** → sign up with your GitHub account.
2. Tap **Add New… → Project** → pick this repository → **Import**.
3. Under **Root Directory**, tap **Edit** and choose **`crypto-site`**. (Important!)
4. Framework preset should say **Next.js** automatically.
5. Open **Environment Variables** and add the ones you need from `.env.example`
   (at minimum `NEXT_PUBLIC_SITE_URL` once you have a domain).
6. Tap **Deploy**. You'll get a free `something.vercel.app` web address in ~1 minute.
7. In Vercel → Project → **Settings → Git**, set **Production Branch** to the branch this site is on
   (or merge it into `main`).

### Custom domain
Buy a domain (Cloudflare, Namecheap or Porkbun are good), then in Vercel → Project →
**Settings → Domains** → add it and follow the DNS instructions. Then set
`NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy.

---

## Analytics & tracking

Add these in Vercel → Settings → Environment Variables (see `.env.example`):

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | Google Analytics → Admin → Data streams (`G-…`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console → Add property → HTML tag method |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Ads Manager → Events |

Trackers only load after a visitor accepts the cookie banner (GDPR-friendly). The banner only
appears once at least one ID is set.

**Affiliate events sent to all trackers:**
- `platform_clicked` — Visit buttons on cards, tables, directories
- `review_cta_clicked` — Visit buttons on review pages
- `comparison_cta_clicked` — Visit buttons on comparison pages
- `affiliate_signup_click` — every click on a real affiliate link (use this as your conversion)

Also: `newsletter_signup`, `share_clicked`, `calculator_used`.

After deploying, submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

## Newsletter
Create a free account at buttondown.com, copy the API key, and add it as
`BUTTONDOWN_API_KEY` in Vercel. Until then the form politely says sign-ups aren't open yet.

---

## Running it on a computer (optional)

```bash
cd crypto-site
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
npm run typecheck  # TypeScript check
```

On iPad you don't need this — edit files on github.com and Vercel rebuilds automatically
on every commit.

## Project structure

```
crypto-site/
├─ src/app/            Pages (each folder = a URL)
├─ src/components/     Reusable building blocks (cards, tables, calculators…)
├─ src/content/        ← Your content: platforms, reviews, comparisons, articles
└─ src/lib/            Site settings, SEO, analytics helpers
```
