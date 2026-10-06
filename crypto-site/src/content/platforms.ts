/**
 * PLATFORMS + AFFILIATE LINKS — THE ONE PLACE TO EDIT
 * ───────────────────────────────────────────────────
 * Every exchange, wallet and tool on the site comes from this file.
 * Change an affiliate link, score or fee here and every card, table,
 * review, comparison and /go/ redirect updates automatically.
 *
 * HOW AFFILIATE LINKS WORK
 *  - affiliate.url empty  → buttons link to the official website, with no
 *                           "sponsored" label (because you earn nothing).
 *  - affiliate.url filled → buttons use your link, get rel="sponsored",
 *                           and show an "Affiliate link" label automatically.
 *
 * VERIFY BEFORE LAUNCH
 *  Fees, coin counts, prices and availability change often. Every entry
 *  below is a realistic DRAFT. Check each fact on the platform's own
 *  website, then set `lastVerified` to the date you checked.
 *  Scores marked scoreStatus: "draft" are starting points — adjust them
 *  after your own testing and set scoreStatus to "verified".
 */

export type PlatformCategory =
  | "exchange"
  | "hardware-wallet"
  | "software-wallet"
  | "mobile-wallet"
  | "charting"
  | "terminal"
  | "portfolio"
  | "analytics"
  | "ai";

export type Affiliate = {
  /** Your tracked affiliate/referral URL. Leave "" until you have one. */
  url: string;
  /** Referral code, if the platform uses one. Shown next to the button. */
  referralCode?: string;
  /** Button text. Defaults to "Visit {name}". */
  ctaText?: string;
  /** Public offer line, e.g. "New-user rewards available — terms apply". Verify before use. */
  offer?: string;
  /** PRIVATE notes for you (commission rate, payout terms). Never shown on the site. */
  commissionNotes?: string;
};

export type FeeSchedule = {
  /** Percent, e.g. 0.1 means 0.1%. Base tier for a new user. */
  spotMaker: number;
  spotTaker: number;
  futuresMaker?: number;
  futuresTaker?: number;
};

export type Platform = {
  slug: string;
  name: string;
  category: PlatformCategory;
  tagline: string;
  /** Official homepage (non-affiliate). */
  website: string;
  affiliate: Affiliate;
  /** Path to a logo in /public/logos (SVG or PNG). Leave empty to show a monogram tile. */
  logo?: string;
  /** Monogram tile colour when no logo is set. */
  brandColor: string;
  /** Editorial score out of 5, or null to hide. */
  score: number | null;
  scoreStatus: "draft" | "verified";
  bestFor: string;
  /** Exchanges: fee summary. */
  fees?: string;
  feeSchedule?: FeeSchedule;
  /** Exchanges: supported assets summary. */
  assets?: string;
  /** Wallets & tools: price summary. */
  pricing?: string;
  /** Devices / apps, e.g. "iOS, Android, Desktop". */
  devices?: string;
  /** 1 (advanced users) to 5 (very beginner-friendly). */
  beginnerFriendliness: 1 | 2 | 3 | 4 | 5;
  features: string[];
  pros: string[];
  cons: string[];
  /** Country restrictions or important notices. */
  availabilityNote?: string;
  /** Slug of a full review at /reviews/[slug], if one exists. */
  reviewSlug?: string;
  /** ISO date (YYYY-MM-DD) you last checked these facts, or null if never. */
  lastVerified: string | null;
};

export const platforms: Platform[] = [
  // ───────────────────────── EXCHANGES ─────────────────────────
  {
    slug: "kraken",
    name: "Kraken",
    category: "exchange",
    tagline: "Long-running exchange with a strong security record",
    website: "https://www.kraken.com",
    affiliate: { url: "" }, // TODO: paste your Kraken affiliate link if you join their program
    brandColor: "#7B61FF",
    score: 4.5,
    scoreStatus: "draft",
    bestFor: "Security-focused beginners and US/EU users",
    fees: "Kraken Pro from 0.25% maker / 0.40% taker; simple Buy has higher fees",
    feeSchedule: { spotMaker: 0.25, spotTaker: 0.4 },
    assets: "300+ cryptocurrencies",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 4,
    features: ["Spot trading", "Kraken Pro advanced interface", "Staking (region-dependent)", "Futures (eligible regions)"],
    pros: [
      "Operating since 2011 with a strong security reputation",
      "Licensed or registered in several major jurisdictions",
      "Clean beginner app plus a separate Pro interface",
    ],
    cons: [
      "Instant 'Buy' button costs more than using Kraken Pro",
      "Fewer coins than the largest offshore exchanges",
      "Some products unavailable in certain countries and US states",
    ],
    availabilityNote: "Product availability varies by country and US state.",
    lastVerified: null,
  },
  {
    slug: "binance",
    name: "Binance",
    category: "exchange",
    tagline: "The largest exchange by trading volume, with a huge product range",
    website: "https://www.binance.com",
    affiliate: {
      url: "", // TODO: paste your Binance referral link
      referralCode: "",
      ctaText: "Visit Binance",
      commissionNotes: "",
    },
    brandColor: "#F0B90B",
    score: 4.4,
    scoreStatus: "draft",
    bestFor: "Low fees and the widest choice of coins",
    fees: "Spot from 0.10% maker/taker; discount when paying fees in BNB",
    feeSchedule: { spotMaker: 0.1, spotTaker: 0.1, futuresMaker: 0.02, futuresTaker: 0.05 },
    assets: "350+ cryptocurrencies",
    devices: "Web, iOS, Android, Desktop",
    beginnerFriendliness: 3,
    features: ["Spot & margin", "Futures & options", "Binance Earn", "P2P marketplace", "Convert", "Copy trading"],
    pros: [
      "Very deep liquidity and some of the lowest base fees",
      "Huge range of coins and trading pairs",
      "Publishes regular proof-of-reserves reports",
    ],
    cons: [
      "Busy interface can overwhelm beginners",
      "History of serious regulatory action, including a 2023 US settlement",
      "Not available in some countries — US users must use the separate Binance.US",
    ],
    availabilityNote: "Not available to residents of some countries, including the United States.",
    reviewSlug: "binance",
    lastVerified: null,
  },
  {
    slug: "coinbase",
    name: "Coinbase",
    category: "exchange",
    tagline: "The simplest way to buy your first crypto",
    website: "https://www.coinbase.com",
    affiliate: { url: "" }, // TODO
    brandColor: "#0052FF",
    score: 4.3,
    scoreStatus: "draft",
    bestFor: "Complete beginners who value simplicity",
    fees: "Simple buys include a spread plus a fee; Advanced trade from 0.40% maker / 0.60% taker",
    feeSchedule: { spotMaker: 0.4, spotTaker: 0.6 },
    assets: "250+ cryptocurrencies",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 5,
    features: ["Simple buy/sell", "Advanced trade", "Staking (region-dependent)", "Recurring buys"],
    pros: [
      "Very easy to use — good first exchange",
      "Publicly listed company with audited financial reports",
      "Wide availability, including the US",
    ],
    cons: [
      "Simple buys are expensive compared with other exchanges",
      "Advanced trade fees are high at low volumes",
      "Customer support quality varies",
    ],
    lastVerified: null,
  },
  {
    slug: "bybit",
    name: "Bybit",
    category: "exchange",
    tagline: "Derivatives-focused exchange with a strong mobile app",
    website: "https://www.bybit.com",
    affiliate: {
      url: "", // TODO: paste your Bybit referral link
      referralCode: "",
      ctaText: "Visit Bybit",
      commissionNotes: "",
    },
    brandColor: "#F7A600",
    score: 4.3,
    scoreStatus: "draft",
    bestFor: "Experienced traders using futures and copy trading",
    fees: "Spot from 0.10% maker/taker; futures from 0.02% maker / 0.055% taker",
    feeSchedule: { spotMaker: 0.1, spotTaker: 0.1, futuresMaker: 0.02, futuresTaker: 0.055 },
    assets: "Hundreds of spot coins",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 3,
    features: ["Spot", "Perpetual & dated futures", "Options", "Copy trading", "Trading bots", "Bybit Earn"],
    pros: [
      "Fast, polished trading platform and mobile app",
      "Deep derivatives liquidity and advanced order types",
      "Built-in copy trading and bots",
    ],
    cons: [
      "Suffered a major hack in February 2025 (user funds were covered by Bybit)",
      "Derivatives focus makes high-risk products very easy to reach",
      "Not available in the United States and some other countries",
    ],
    availabilityNote: "Not available to residents of some countries, including the United States.",
    reviewSlug: "bybit",
    lastVerified: null,
  },
  {
    slug: "okx",
    name: "OKX",
    category: "exchange",
    tagline: "Full-featured exchange with a built-in Web3 wallet",
    website: "https://www.okx.com",
    affiliate: { url: "" }, // TODO
    brandColor: "#E5E7EB",
    score: 4.1,
    scoreStatus: "draft",
    bestFor: "Active traders who also use DeFi",
    fees: "Spot from 0.08% maker / 0.10% taker",
    feeSchedule: { spotMaker: 0.08, spotTaker: 0.1, futuresMaker: 0.02, futuresTaker: 0.05 },
    assets: "300+ cryptocurrencies",
    devices: "Web, iOS, Android, Desktop",
    beginnerFriendliness: 3,
    features: ["Spot & margin", "Futures & options", "Trading bots", "OKX Wallet (self-custody)"],
    pros: ["Low base fees", "Good bots and advanced order tools", "Integrated self-custody Web3 wallet"],
    cons: ["Interface is dense for beginners", "Availability restricted in several countries"],
    availabilityNote: "Availability and products vary significantly by country.",
    lastVerified: null,
  },

  // ───────────────────────── HARDWARE WALLETS ─────────────────────────
  {
    slug: "ledger",
    name: "Ledger",
    category: "hardware-wallet",
    tagline: "Popular hardware wallets with broad coin support",
    website: "https://www.ledger.com",
    affiliate: { url: "" }, // TODO: Ledger has an affiliate program
    brandColor: "#D4D4D8",
    score: 4.4,
    scoreStatus: "draft",
    bestFor: "Holding many different coins securely",
    pricing: "From about $79 (Nano S Plus); premium models cost more",
    devices: "USB-C / Bluetooth (model-dependent); Ledger Live on desktop & mobile",
    beginnerFriendliness: 4,
    features: ["Secure element chip", "Ledger Live app", "Thousands of supported tokens", "Bluetooth on some models"],
    pros: ["Supports a very wide range of coins", "Polished companion app", "Secure element chip"],
    cons: [
      "Firmware is not fully open source",
      "Optional 'Ledger Recover' service raised privacy debate in 2023",
      "2020 customer data leak exposed buyers' contact details (not funds)",
    ],
    lastVerified: null,
  },
  {
    slug: "trezor",
    name: "Trezor",
    category: "hardware-wallet",
    tagline: "The original hardware wallet, with open-source firmware",
    website: "https://trezor.io",
    affiliate: { url: "" }, // TODO: Trezor has an affiliate program
    brandColor: "#00854D",
    score: 4.4,
    scoreStatus: "draft",
    bestFor: "Users who value open-source security",
    pricing: "From about $59 (Safe 3); premium models cost more",
    devices: "USB-C; Trezor Suite on desktop, web & mobile",
    beginnerFriendliness: 4,
    features: ["Open-source firmware", "Secure element (Safe models)", "Trezor Suite app", "Passphrase & multisig support"],
    pros: ["Fully open-source firmware that anyone can audit", "Simple, beginner-friendly setup", "Strong Bitcoin features"],
    cons: ["Supports fewer coins natively than Ledger", "No Bluetooth / limited iPhone support on some models"],
    lastVerified: null,
  },
  {
    slug: "coldcard",
    name: "Coldcard",
    category: "hardware-wallet",
    tagline: "Bitcoin-only device for maximum security",
    website: "https://coldcard.com",
    affiliate: { url: "" },
    brandColor: "#F97316",
    score: 4.2,
    scoreStatus: "draft",
    bestFor: "Bitcoin-only holders who want air-gapped signing",
    pricing: "From about $150",
    devices: "Air-gapped (microSD / NFC, model-dependent)",
    beginnerFriendliness: 2,
    features: ["Bitcoin-only", "Air-gapped signing", "Dual secure elements", "Advanced PIN options"],
    pros: ["Designed for high-security Bitcoin storage", "Can be used fully air-gapped", "Highly respected by Bitcoin security experts"],
    cons: ["Bitcoin only — no other coins", "Steep learning curve for beginners"],
    lastVerified: null,
  },

  // ───────────────────────── SOFTWARE WALLETS ─────────────────────────
  {
    slug: "metamask",
    name: "MetaMask",
    category: "software-wallet",
    tagline: "The most widely used Ethereum wallet",
    website: "https://metamask.io",
    affiliate: { url: "" },
    brandColor: "#F6851B",
    score: 4.2,
    scoreStatus: "draft",
    bestFor: "Using Ethereum apps, DeFi and NFTs",
    pricing: "Free (network fees apply; in-app swaps charge a fee)",
    devices: "Browser extension, iOS, Android",
    beginnerFriendliness: 3,
    features: ["Ethereum & EVM networks", "Connects to thousands of dApps", "Hardware wallet support", "Built-in swaps"],
    pros: ["Works with almost every Ethereum app", "Pairs with Ledger and Trezor", "Free and open source"],
    cons: ["Easy to approve a malicious transaction if you're not careful", "In-app swap fees are higher than doing it yourself"],
    lastVerified: null,
  },
  {
    slug: "exodus",
    name: "Exodus",
    category: "software-wallet",
    tagline: "Beautiful multi-coin wallet for desktop and mobile",
    website: "https://www.exodus.com",
    affiliate: { url: "" },
    brandColor: "#8B5CF6",
    score: 4.0,
    scoreStatus: "draft",
    bestFor: "Beginners who want one simple wallet for many coins",
    pricing: "Free (network fees apply; built-in exchange includes a spread)",
    devices: "Windows, macOS, Linux, iOS, Android",
    beginnerFriendliness: 5,
    features: ["Multi-coin support", "Built-in swaps", "Trezor integration", "Portfolio view"],
    pros: ["Very easy to use", "Clean portfolio view", "Desktop and mobile apps"],
    cons: ["Not fully open source", "Built-in swaps cost more than exchanges"],
    lastVerified: null,
  },
  {
    slug: "electrum",
    name: "Electrum",
    category: "software-wallet",
    tagline: "Lightweight, open-source Bitcoin desktop wallet",
    website: "https://electrum.org",
    affiliate: { url: "" },
    brandColor: "#3B82F6",
    score: 4.0,
    scoreStatus: "draft",
    bestFor: "Experienced Bitcoin users on desktop",
    pricing: "Free",
    devices: "Windows, macOS, Linux, Android",
    beginnerFriendliness: 2,
    features: ["Bitcoin-only", "Multisig", "Hardware wallet support", "Coin control"],
    pros: ["Open source and around since 2011", "Advanced features like multisig and coin control"],
    cons: ["Dated interface", "Fake Electrum downloads are common — only use the official site"],
    lastVerified: null,
  },

  // ───────────────────────── MOBILE WALLETS ─────────────────────────
  {
    slug: "trust-wallet",
    name: "Trust Wallet",
    category: "mobile-wallet",
    tagline: "Multi-chain mobile wallet with a huge token range",
    website: "https://trustwallet.com",
    affiliate: { url: "" },
    brandColor: "#3375BB",
    score: 4.1,
    scoreStatus: "draft",
    bestFor: "Holding many tokens across many blockchains on your phone",
    pricing: "Free (network fees apply)",
    devices: "iOS, Android, browser extension",
    beginnerFriendliness: 4,
    features: ["100+ blockchains", "Built-in dApp browser", "Staking for some coins", "Swaps"],
    pros: ["Supports a very wide range of networks", "Simple mobile experience"],
    cons: ["Owned by Binance, which some users prefer to avoid", "Wide token support means more scam tokens appear"],
    lastVerified: null,
  },
  {
    slug: "phantom",
    name: "Phantom",
    category: "mobile-wallet",
    tagline: "Polished wallet for Solana, Ethereum and Bitcoin",
    website: "https://phantom.com",
    affiliate: { url: "" },
    brandColor: "#AB9FF2",
    score: 4.2,
    scoreStatus: "draft",
    bestFor: "Solana users and on-chain beginners",
    pricing: "Free (network fees apply; in-app swaps charge a fee)",
    devices: "iOS, Android, browser extension",
    beginnerFriendliness: 4,
    features: ["Solana, Ethereum, Bitcoin & more", "Transaction previews", "Scam warnings", "Built-in swaps"],
    pros: ["Excellent design and transaction previews", "Built-in warnings for suspicious transactions"],
    cons: ["Swap fees are higher than doing it manually", "Focused mainly on Solana"],
    lastVerified: null,
  },
  {
    slug: "bluewallet",
    name: "BlueWallet",
    category: "mobile-wallet",
    tagline: "Simple, open-source Bitcoin wallet for your phone",
    website: "https://bluewallet.io",
    affiliate: { url: "" },
    brandColor: "#2F5FB3",
    score: 4.0,
    scoreStatus: "draft",
    bestFor: "Bitcoin-only users who want a simple mobile wallet",
    pricing: "Free",
    devices: "iOS, Android",
    beginnerFriendliness: 4,
    features: ["Bitcoin-only", "Watch-only wallets", "Multisig vaults", "Open source"],
    pros: ["Clean, simple interface", "Open source", "Advanced options when you need them"],
    cons: ["Bitcoin only", "Hot wallet — not ideal for large amounts"],
    lastVerified: null,
  },

  // ───────────────────────── TRADING TOOLS ─────────────────────────
  {
    slug: "tradingview",
    name: "TradingView",
    category: "charting",
    tagline: "The charting platform most traders use",
    website: "https://www.tradingview.com",
    affiliate: { url: "" }, // TODO: TradingView has a referral program
    brandColor: "#2962FF",
    score: 4.7,
    scoreStatus: "draft",
    bestFor: "Charting and technical analysis for any market",
    pricing: "Free plan; paid plans add more indicators, alerts and layouts",
    devices: "Web, Desktop, iOS, Android",
    beginnerFriendliness: 4,
    features: ["Advanced charts", "Hundreds of indicators", "Price alerts", "Pine Script", "Broker/exchange integrations"],
    pros: ["Industry-standard charts", "Generous free plan", "Huge community of shared scripts and ideas"],
    cons: ["Free plan shows ads and limits indicators", "Community 'ideas' vary wildly in quality"],
    lastVerified: null,
  },
  {
    slug: "3commas",
    name: "3Commas",
    category: "terminal",
    tagline: "Trading terminal with smart orders and bots",
    website: "https://3commas.io",
    affiliate: { url: "" },
    brandColor: "#00C2A8",
    score: 3.8,
    scoreStatus: "draft",
    bestFor: "Managing orders across several exchanges in one place",
    pricing: "Paid plans; limited free tier (verify)",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 2,
    features: ["SmartTrade terminal", "DCA & grid bots", "Multi-exchange via API", "Portfolio overview"],
    pros: ["Advanced take-profit and stop-loss orders", "One dashboard for several exchanges"],
    cons: ["Confirmed API key leak in December 2022", "Bots can lose money quickly in volatile markets"],
    lastVerified: null,
  },
  {
    slug: "coinstats",
    name: "CoinStats",
    category: "portfolio",
    tagline: "Portfolio tracker for exchanges and wallets",
    website: "https://coinstats.app",
    affiliate: { url: "" },
    brandColor: "#F5C451",
    score: 4.0,
    scoreStatus: "draft",
    bestFor: "Seeing all your crypto in one dashboard",
    pricing: "Free plan; premium plans available",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 4,
    features: ["Exchange & wallet sync", "Profit/loss tracking", "Price alerts", "DeFi tracking"],
    pros: ["Connects many exchanges and wallets", "Clean mobile app"],
    cons: ["Best features need a paid plan", "Connecting exchanges means sharing read-only API keys"],
    lastVerified: null,
  },
  {
    slug: "koinly",
    name: "Koinly",
    category: "portfolio",
    tagline: "Crypto tax reports and portfolio tracking",
    website: "https://koinly.io",
    affiliate: { url: "" }, // TODO: Koinly has an affiliate program
    brandColor: "#3E7BFA",
    score: 4.2,
    scoreStatus: "draft",
    bestFor: "Preparing crypto tax reports",
    pricing: "Free to track; paid to download tax reports",
    devices: "Web",
    beginnerFriendliness: 4,
    features: ["Tax reports for many countries", "Exchange & wallet imports", "Capital gains tracking"],
    pros: ["Supports many countries' tax rules", "Free to see your numbers before paying"],
    cons: ["Paid plans scale with transaction count", "Always double-check reports with a tax professional"],
    lastVerified: null,
  },
  {
    slug: "coinglass",
    name: "CoinGlass",
    category: "analytics",
    tagline: "Derivatives data: funding, open interest, liquidations",
    website: "https://www.coinglass.com",
    affiliate: { url: "" },
    brandColor: "#22C55E",
    score: 4.1,
    scoreStatus: "draft",
    bestFor: "Futures traders watching market positioning",
    pricing: "Free; paid plans for advanced data",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 2,
    features: ["Funding rates", "Open interest", "Liquidation data", "Long/short ratios"],
    pros: ["Lots of derivatives data for free", "Covers most major exchanges"],
    cons: ["Easy to over-read signals", "Data is aimed at experienced traders"],
    lastVerified: null,
  },
  {
    slug: "defillama",
    name: "DefiLlama",
    category: "analytics",
    tagline: "Free, open DeFi analytics",
    website: "https://defillama.com",
    affiliate: { url: "" },
    brandColor: "#4F8FEA",
    score: 4.5,
    scoreStatus: "draft",
    bestFor: "Researching DeFi protocols and blockchains",
    pricing: "Free",
    devices: "Web",
    beginnerFriendliness: 3,
    features: ["TVL by chain & protocol", "Fees & revenue data", "Stablecoin data", "Yields"],
    pros: ["Free with no ads", "Transparent, open-source methodology"],
    cons: ["A lot of data to take in for beginners"],
    lastVerified: null,
  },

  // ───────────────────────── AI TOOLS ─────────────────────────
  {
    slug: "trendspider",
    name: "TrendSpider",
    category: "ai",
    tagline: "Automated technical analysis with AI-assisted tools",
    website: "https://trendspider.com",
    affiliate: { url: "" }, // TODO: TrendSpider has an affiliate program
    brandColor: "#F43F5E",
    score: 4.0,
    scoreStatus: "draft",
    bestFor: "Traders who want automated pattern and trendline detection",
    pricing: "Paid plans; free trial may be available (verify)",
    devices: "Web",
    beginnerFriendliness: 2,
    features: ["Automated trendlines & patterns", "Strategy backtesting", "AI-assisted strategy tools", "Alerts"],
    pros: ["Saves time on chart analysis", "Backtesting without coding"],
    cons: ["Expensive for casual traders", "Automation doesn't make predictions reliable"],
    lastVerified: null,
  },
  {
    slug: "token-metrics",
    name: "Token Metrics",
    category: "ai",
    tagline: "AI-driven crypto research and ratings",
    website: "https://www.tokenmetrics.com",
    affiliate: { url: "" },
    brandColor: "#FACC15",
    score: 3.7,
    scoreStatus: "draft",
    bestFor: "Researching altcoins with data-driven ratings",
    pricing: "Free tier; paid plans for full ratings (verify)",
    devices: "Web, iOS, Android",
    beginnerFriendliness: 3,
    features: ["AI token ratings", "Research reports", "Indices", "Price data"],
    pros: ["Lots of research in one place", "Useful starting point for screening coins"],
    cons: ["Ratings are opinions, not guarantees", "Premium plans are expensive"],
    lastVerified: null,
  },
];

// ───────────────────────── HELPERS (no need to edit) ─────────────────────────

export const categoryLabels: Record<PlatformCategory, string> = {
  exchange: "Exchange",
  "hardware-wallet": "Hardware wallet",
  "software-wallet": "Software wallet",
  "mobile-wallet": "Mobile wallet",
  charting: "Charting",
  terminal: "Trading terminal",
  portfolio: "Portfolio tracking",
  analytics: "Market analytics",
  ai: "AI trading tool",
};

export function getPlatform(slug: string): Platform {
  const p = platforms.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown platform "${slug}" — check src/content/platforms.ts`);
  return p;
}

export function findPlatform(slug: string): Platform | undefined {
  return platforms.find((x) => x.slug === slug);
}

export function platformsBy(...categories: PlatformCategory[]): Platform[] {
  return platforms.filter((p) => categories.includes(p.category));
}

/** Sorted by score (highest first). Unscored platforms go last. */
export function ranked(list: Platform[]): Platform[] {
  return [...list].sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
}

export function isAffiliate(p: Platform): boolean {
  return p.affiliate.url.trim().length > 0;
}

/** The URL a "Visit" button should use. */
export function outboundUrl(p: Platform): string {
  return isAffiliate(p) ? p.affiliate.url : p.website;
}

export function ctaText(p: Platform): string {
  return p.affiliate.ctaText?.trim() || `Visit ${p.name}`;
}
