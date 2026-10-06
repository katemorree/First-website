/**
 * COMPARISONS
 * ───────────
 * Each entry becomes a page at /compare/[slug].
 * `a` and `b` must match slugs in platforms.ts.
 *
 * Editorial rule: never pick a "winner" because it pays a higher
 * commission. Explain who each platform suits instead.
 *
 * ⚠️ DRAFT: verify every row against the platforms' websites.
 */

import type { FAQ } from "./reviews";

export type CompareRow = {
  label: string;
  a: string;
  b: string;
  /** Which side is better on this row, if one clearly is. Leave out if it's a tie or depends on the user. */
  edge?: "a" | "b";
};

export type Comparison = {
  slug: string;
  a: string;
  b: string;
  title: string;
  metaTitle: string;
  description: string;
  published: string;
  updated: string;
  intro: string[];
  rows: CompareRow[];
  chooseA: string[];
  chooseB: string[];
  verdict: string[];
  faqs: FAQ[];
};

export const comparisons: Comparison[] = [
  {
    slug: "binance-vs-bybit",
    a: "binance",
    b: "bybit",
    title: "Binance vs Bybit: Which Exchange Is Right for You?",
    metaTitle: "Binance vs Bybit (2026): Fees, Futures & Safety Compared",
    description:
      "Binance vs Bybit compared side by side: fees, coins, futures, leverage, staking, security, KYC and mobile apps — and which type of trader each one suits.",
    published: "2026-10-06",
    updated: "2026-10-06",
    intro: [
      "Binance and Bybit are two of the largest crypto exchanges outside the US, and they overlap a lot: both offer spot trading, futures, copy trading, bots and savings products.",
      "There is no single winner. Binance is broader and slightly cheaper; Bybit is more focused and its app is easier to use. Your country, experience and what you actually plan to trade matter more than small fee differences.",
    ],
    rows: [
      { label: "Spot fees (maker / taker)", a: "0.10% / 0.10% (less with BNB)", b: "0.10% / 0.10%", edge: "a" },
      { label: "Futures fees (maker / taker)", a: "0.02% / 0.05%", b: "0.02% / 0.055%", edge: "a" },
      { label: "Number of coins", a: "350+", b: "Hundreds" },
      { label: "Spot trading", a: "Yes", b: "Yes" },
      { label: "Futures", a: "Perpetual & dated", b: "Perpetual & dated" },
      { label: "Max leverage", a: "Up to 125x on some contracts", b: "Up to 100x+ on some contracts" },
      { label: "Earn / staking", a: "Extensive (Simple Earn, staking, more)", b: "Yes (Bybit Earn)" },
      { label: "Security", a: "Cold storage, SAFU fund, proof of reserves; 2019 hack covered", b: "Cold storage, proof of reserves; 2025 hack covered" },
      { label: "Beginner friendliness", a: "Good in Lite mode; Pro mode is complex", b: "Clean, but leverage is very prominent", edge: "a" },
      { label: "Mobile app", a: "Feature-rich, can feel crowded", b: "Fast and polished", edge: "b" },
      { label: "KYC requirements", a: "Required", b: "Required" },
      { label: "US availability", a: "No (Binance.US is separate)", b: "No" },
      { label: "Best use case", a: "Widest choice of coins and products, lowest fees", b: "Derivatives, copy trading, mobile trading" },
    ],
    chooseA: [
      "You want the widest choice of coins and products",
      "You want the lowest possible fees and will use BNB discounts",
      "You plan to use Earn, Auto-Invest or the P2P marketplace",
    ],
    chooseB: [
      "You mainly trade derivatives and want a fast platform",
      "You prefer a cleaner, mobile-first experience",
      "You want built-in copy trading and bots that are easy to set up",
    ],
    verdict: [
      "For most people deciding between the two, Binance is the more complete exchange and Bybit is the more focused trading platform. Fee differences at the base tier are small.",
      "If you are a beginner, both are usable — but neither is our first recommendation. Simpler, more conservative platforms like Kraken or Coinbase make it harder to stumble into leverage. Whichever you pick, start small and use a personal wallet for long-term holdings.",
    ],
    faqs: [
      {
        q: "Is Binance or Bybit cheaper?",
        a: "At base tier, spot fees are the same (0.10%), but Binance becomes slightly cheaper if you pay fees in BNB. Futures taker fees are marginally lower on Binance. For most users the difference is small.",
      },
      {
        q: "Which is safer, Binance or Bybit?",
        a: "Both publish proof of reserves and store most funds in cold storage. Both have been hacked (Binance in 2019, Bybit in 2025) and covered user losses. Binance also has a significant regulatory history. Neither should be used as long-term storage.",
      },
      {
        q: "Can I use both?",
        a: "Yes. Many traders keep accounts on more than one exchange for access to different coins or as a backup if one has downtime.",
      },
    ],
  },
];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
