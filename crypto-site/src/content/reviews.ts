/**
 * REVIEWS
 * ───────
 * Each review becomes a page at /reviews/[slug].
 * To add one: copy an entry, change the slug and platformSlug (which must
 * match an entry in platforms.ts), and rewrite the text.
 *
 * The score, fees, pros, cons and affiliate link are pulled from
 * platforms.ts automatically — you don't repeat them here.
 *
 * ⚠️ DRAFT CONTENT: facts were written from public information and must
 * be checked against each platform's website before launch. Update
 * `updated` whenever you re-check a review.
 */

export type Row = { label: string; value: string };
export type FAQ = { q: string; a: string };

export type Review = {
  slug: string;
  platformSlug: string;
  title: string;
  /** Under ~60 characters for Google. */
  metaTitle: string;
  /** Under ~155 characters. */
  description: string;
  published: string;
  updated: string;
  /** One-paragraph verdict shown at the top. */
  summary: string;
  overview: string[];
  keyFeatures: { title: string; text: string }[];
  fees: { rows: Row[]; note: string };
  supportedCrypto: string[];
  depositsWithdrawals: Row[];
  security: string[];
  tradingTools: string[];
  mobileApp: string[];
  bestFor: string[];
  avoidIf: string[];
  alternatives: { platformSlug: string; reason: string }[];
  verdict: string[];
  scoreBreakdown: { label: string; score: number }[];
  faqs: FAQ[];
};

export const reviews: Review[] = [
  {
    slug: "bybit",
    platformSlug: "bybit",
    title: "Bybit Review: Fees, Security, Pros & Cons",
    metaTitle: "Bybit Review 2026: Fees, Security, Pros & Cons",
    description:
      "An independent Bybit review covering fees, futures, copy trading, security after the 2025 hack, the mobile app, and who Bybit is — and isn't — right for.",
    published: "2026-10-06",
    updated: "2026-10-06",
    summary:
      "Bybit is a fast, polished exchange built around derivatives trading. Its futures platform, copy trading and mobile app are among the best available, and base fees are competitive. The trade-offs: high-risk leveraged products are front and centre, it is unavailable in several major countries, and it suffered one of the largest hacks in crypto history in 2025 — although customers were made whole.",
    overview: [
      "Bybit launched in 2018 and is headquartered in Dubai. It started as a derivatives exchange and has since added spot trading, options, copy trading, trading bots, savings products and a crypto card in some regions.",
      "The platform is popular with active traders because orders execute quickly, the interface is responsive and the mobile app has almost every feature of the desktop site.",
      "For a beginner who only wants to buy and hold Bitcoin, Bybit works — but it is not the simplest option, and the easy access to leverage is a risk if you are still learning.",
    ],
    keyFeatures: [
      { title: "Spot trading", text: "Buy and sell hundreds of cryptocurrencies against USDT, USDC and other pairs." },
      { title: "Derivatives", text: "Perpetual and dated futures plus options, with leverage available on many contracts. Leverage magnifies losses as well as gains." },
      { title: "Copy trading", text: "Automatically mirror other traders' positions. Past performance shown on leaderboards does not predict future results." },
      { title: "Trading bots", text: "Grid, DCA and other automated strategies that run on Bybit's servers." },
      { title: "Bybit Earn", text: "Savings and staking-style products. Yields vary and are not guaranteed; some products carry lock-up periods." },
    ],
    fees: {
      rows: [
        { label: "Spot (maker / taker)", value: "0.10% / 0.10%" },
        { label: "Perpetual futures (maker / taker)", value: "0.02% / 0.055%" },
        { label: "Crypto deposits", value: "Free (network fee paid by sender)" },
        { label: "Crypto withdrawals", value: "Flat fee per coin and network" },
        { label: "Card / third-party purchases", value: "Provider fees apply — often 2–4%" },
      ],
      note: "Base-tier fees for new users. Lower rates apply at higher VIP levels. Futures also involve funding payments every few hours.",
    },
    supportedCrypto: [
      "Bybit lists hundreds of cryptocurrencies for spot trading, including Bitcoin, Ethereum, Solana, XRP and a large number of smaller altcoins.",
      "A long list of coins is not automatically a good thing: newer and smaller tokens are far more volatile and can lose most of their value quickly.",
    ],
    depositsWithdrawals: [
      { label: "Crypto deposit", value: "Yes — most major networks" },
      { label: "Buy with card", value: "Yes, via third-party providers (region-dependent)" },
      { label: "Bank transfer", value: "In some regions" },
      { label: "P2P trading", value: "Yes" },
      { label: "Fiat withdrawal", value: "Limited; depends on region" },
    ],
    security: [
      "Bybit keeps most customer funds in cold storage, publishes proof-of-reserves reports and supports two-factor authentication, withdrawal address whitelists and anti-phishing codes.",
      "In February 2025, attackers stole roughly $1.4–1.5 billion in Ethereum from a Bybit cold wallet. The FBI attributed the attack to North Korea's Lazarus Group. Bybit covered the loss, kept withdrawals open and stated that customer assets remained fully backed.",
      "How the company handled the incident was widely seen as strong, but it is still an important part of Bybit's history and a reminder that no exchange is risk-free. Keep long-term holdings in your own wallet.",
    ],
    tradingTools: [
      "TradingView-powered charts, conditional and trailing-stop orders, take-profit/stop-loss on entry, a unified trading account, grid and DCA bots, and copy trading.",
      "For most beginners, the most useful tools are simple: limit orders (to control your price) and stop-losses (to cap your downside).",
    ],
    mobileApp: [
      "The Bybit app for iOS and Android includes spot, derivatives, Earn, bots and copy trading. It is fast and well-designed — arguably one of the best exchange apps available.",
      "Because everything is one tap away, consider turning off or ignoring derivatives if you are new.",
    ],
    bestFor: [
      "Experienced traders who use futures, options or copy trading",
      "Mobile-first traders who want a full-featured app",
      "Users in supported countries looking for competitive derivatives fees",
    ],
    avoidIf: [
      "You live in the US or another unsupported country",
      "You are a complete beginner who only wants to buy and hold",
      "You know you are tempted to use high leverage",
    ],
    alternatives: [
      { platformSlug: "binance", reason: "Even more coins and slightly lower futures taker fees." },
      { platformSlug: "okx", reason: "Similar features plus an integrated self-custody wallet." },
      { platformSlug: "kraken", reason: "Simpler and more conservative, with a long security track record." },
    ],
    verdict: [
      "Bybit is one of the strongest platforms for active derivatives traders. Execution is fast, the app is excellent and the fee structure is competitive.",
      "It is not our first pick for complete beginners — not because it's bad, but because simpler platforms make it harder to accidentally take on risk you don't understand. If you choose Bybit, start with spot trading, use small amounts, and move long-term holdings to a wallet you control.",
    ],
    scoreBreakdown: [
      { label: "Fees", score: 4.4 },
      { label: "Features", score: 4.7 },
      { label: "Ease of use", score: 3.9 },
      { label: "Security", score: 4.0 },
      { label: "Mobile app", score: 4.7 },
    ],
    faqs: [
      {
        q: "Is Bybit safe?",
        a: "Bybit uses cold storage, publishes proof of reserves and offers standard account protections. It was hacked in February 2025 and covered customer losses. No centralised exchange is risk-free, so avoid keeping more there than you need for trading.",
      },
      {
        q: "Is Bybit available in the United States?",
        a: "No. Bybit does not serve US residents, and several other countries are also restricted. Check Bybit's current list of restricted jurisdictions before signing up.",
      },
      {
        q: "Does Bybit require KYC?",
        a: "Yes. Identity verification is required to use most features, including deposits, trading and withdrawals.",
      },
      {
        q: "Is Bybit good for beginners?",
        a: "It is usable for beginners, but the easy access to leverage makes it riskier than simpler exchanges. Beginners should stick to spot trading with small amounts.",
      },
    ],
  },
  {
    slug: "binance",
    platformSlug: "binance",
    title: "Binance Review: Fees, Security, Pros & Cons",
    metaTitle: "Binance Review 2026: Fees, Safety, Pros & Cons",
    description:
      "An independent Binance review: fees, coin selection, security, regulatory history, the mobile app, and who should use Binance — or choose an alternative.",
    published: "2026-10-06",
    updated: "2026-10-06",
    summary:
      "Binance is the world's largest crypto exchange by trading volume, with very low fees, deep liquidity and more coins and products than almost anyone else. Its main drawbacks are a complex interface for newcomers, restricted availability in some countries, and a serious regulatory history, including a 2023 settlement with US authorities.",
    overview: [
      "Binance launched in 2017 and grew into the largest crypto exchange in the world by trading volume. It offers spot trading, futures, options, savings products, a peer-to-peer marketplace and much more.",
      "In November 2023, Binance pleaded guilty to US anti-money-laundering and sanctions violations and agreed to pay about $4.3 billion. Founder Changpeng Zhao stepped down as CEO. The company has since said it has strengthened compliance.",
      "Binance does not serve US residents; Binance.US is a separate company with fewer features. Availability and products differ by country.",
    ],
    keyFeatures: [
      { title: "Spot & Convert", text: "Hundreds of coins and pairs, plus a simple Convert tool for quick swaps." },
      { title: "Futures & options", text: "Large derivatives market with high leverage available on some contracts. Leverage can wipe out your position quickly." },
      { title: "Binance Earn", text: "Flexible and locked savings, staking and other yield products. Rates change and are not guaranteed." },
      { title: "P2P marketplace", text: "Buy and sell crypto directly with other users using local payment methods." },
      { title: "Auto-Invest", text: "Recurring buys for dollar-cost averaging." },
    ],
    fees: {
      rows: [
        { label: "Spot (maker / taker)", value: "0.10% / 0.10%" },
        { label: "Spot with BNB fee discount", value: "About 0.075% / 0.075%" },
        { label: "USDⓈ-M futures (maker / taker)", value: "0.02% / 0.05%" },
        { label: "Crypto deposits", value: "Free (network fee paid by sender)" },
        { label: "Card purchases", value: "Higher fees — often 1.8–3.5%" },
      ],
      note: "Base-tier fees. VIP tiers and BNB discounts lower costs further. Futures involve funding payments.",
    },
    supportedCrypto: [
      "Binance supports 350+ cryptocurrencies, from Bitcoin and Ethereum to many smaller tokens, often listing new projects early.",
      "Binance periodically delists tokens. Smaller coins are much riskier and less liquid than Bitcoin or Ethereum.",
    ],
    depositsWithdrawals: [
      { label: "Crypto deposit", value: "Yes — most major networks" },
      { label: "Bank transfer", value: "Yes, in many regions (SEPA, Faster Payments, etc.)" },
      { label: "Debit / credit card", value: "Yes (higher fees)" },
      { label: "P2P trading", value: "Yes" },
      { label: "Fiat withdrawal", value: "Yes, in supported regions" },
    ],
    security: [
      "Binance holds most assets in cold storage, maintains an emergency insurance fund (SAFU) and publishes regular proof-of-reserves reports.",
      "Account protections include two-factor authentication, passkeys, withdrawal whitelists, device management and anti-phishing codes.",
      "In 2019, hackers stole around 7,000 BTC from a Binance hot wallet; Binance covered the loss using SAFU. Together with its regulatory history, this is worth knowing before you deposit large amounts.",
    ],
    tradingTools: [
      "Classic and advanced trading views, TradingView charts, OCO and trailing-stop orders, grid and DCA bots, copy trading and a large API for algorithmic traders.",
      "Binance Lite mode in the app hides most advanced features — useful for beginners.",
    ],
    mobileApp: [
      "The Binance app offers a 'Lite' mode for simple buying and a 'Pro' mode with everything. It is feature-rich but can feel crowded.",
      "Beginners should stay in Lite mode until they understand order types and fees.",
    ],
    bestFor: [
      "Traders who want the lowest base fees and deepest liquidity",
      "Users who want access to many coins and products in one account",
      "People who will use Lite mode or know their way around an exchange",
    ],
    avoidIf: [
      "You live in the US or another restricted country",
      "Regulatory history is a deal-breaker for you",
      "You want the simplest possible app",
    ],
    alternatives: [
      { platformSlug: "bybit", reason: "Similar product range with a cleaner app and strong derivatives." },
      { platformSlug: "kraken", reason: "More conservative, with strong regulation in the US and Europe." },
      { platformSlug: "coinbase", reason: "Easiest option for complete beginners (but higher fees)." },
    ],
    verdict: [
      "On features, fees and liquidity, Binance is hard to beat. It is an excellent choice for experienced users in supported countries.",
      "Beginners can use it safely if they stick to Lite mode, spot trading and small amounts. If regulatory history matters to you, or you're in the US, look at Kraken or Coinbase instead.",
    ],
    scoreBreakdown: [
      { label: "Fees", score: 4.8 },
      { label: "Features", score: 4.8 },
      { label: "Ease of use", score: 3.8 },
      { label: "Security", score: 4.2 },
      { label: "Mobile app", score: 4.4 },
    ],
    faqs: [
      {
        q: "Is Binance safe to use?",
        a: "Binance uses cold storage, a SAFU emergency fund and proof-of-reserves reporting. It has a serious regulatory history. As with any exchange, don't store more there than you need, and move long-term holdings to your own wallet.",
      },
      {
        q: "Can I use Binance in the US?",
        a: "No. US residents cannot use Binance.com. Binance.US is a separate company with a smaller range of coins and features.",
      },
      {
        q: "How do I lower my Binance fees?",
        a: "Paying fees with BNB gives a discount, and higher monthly trading volume unlocks lower VIP rates. Using limit orders (maker) instead of market orders also helps on some pairs.",
      },
      {
        q: "Is Binance good for beginners?",
        a: "Yes, if you use Lite mode and stick to buying and selling. The Pro interface and derivatives products are designed for experienced traders.",
      },
    ],
  },
];

export function getReview(slug: string) {
  return reviews.find((r) => r.slug === slug);
}
