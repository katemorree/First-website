/**
 * SITE SETTINGS
 * ─────────────
 * The brand name, contact details and navigation live here.
 * Change a value once and it updates everywhere on the site.
 */

// Uses NEXT_PUBLIC_SITE_URL if set; on Vercel falls back to the production domain automatically.
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const site = {
  // TODO: Check the name is free to use (domain + trademark search) before launch.
  name: "Satsight",
  tagline: "Crypto tools, compared honestly",
  description:
    "Independent comparisons, guides and tools to help you choose crypto exchanges, wallets and trading platforms — with clear risk warnings and transparent affiliate disclosure.",
  url: rawUrl.replace(/\/$/, ""),
  locale: "en_US",
  // TODO: Replace with your real contact inbox.
  contactEmail: "hello@example.com",
  // Shown as the author on guides and reviews until you add named authors.
  editorialTeam: "Satsight Editorial Team",
  // Your social profiles. Leave a value empty to hide that icon.
  social: {
    x: "", // e.g. "https://x.com/yourhandle"
    tiktok: "",
    instagram: "",
    youtube: "",
  },
  // Your X/Twitter handle for social cards, e.g. "@satsight". Empty = not shown.
  xHandle: "",
};

export const showDraftMarkers = process.env.NEXT_PUBLIC_SHOW_DRAFT_MARKERS !== "false";

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Exchanges", href: "/exchanges" },
  { label: "Wallets", href: "/wallets" },
  { label: "Trading Tools", href: "/trading-tools" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Learn", href: "/learn" },
  { label: "Comparisons", href: "/compare" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Compare",
    links: [
      { label: "Crypto exchanges", href: "/exchanges" },
      { label: "Crypto wallets", href: "/wallets" },
      { label: "Trading tools", href: "/trading-tools" },
      { label: "AI tools", href: "/ai-tools" },
      { label: "Binance vs Bybit", href: "/compare/binance-vs-bybit" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Beginner's guide to crypto", href: "/learn/crypto-for-beginners" },
      { label: "How to buy Bitcoin", href: "/learn/how-to-buy-bitcoin" },
      { label: "How to keep crypto safe", href: "/learn/how-to-keep-crypto-safe" },
      { label: "All guides", href: "/learn" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Crypto profit calculator", href: "/tools/crypto-profit-calculator" },
      { label: "Percentage change calculator", href: "/tools/percentage-change-calculator" },
      { label: "DCA cost calculator", href: "/tools/dca-calculator" },
      { label: "Trading fee calculator", href: "/tools/trading-fee-calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
      { label: "Risk disclaimer", href: "/risk-disclaimer" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
];

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
