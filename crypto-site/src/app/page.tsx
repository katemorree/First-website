import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { platformsBy, ranked, categoryLabels, type PlatformCategory } from "@/content/platforms";
import { getArticleMeta } from "@/lib/articles";
import { ButtonLink } from "@/components/Button";
import { HeroScreener } from "@/components/HeroScreener";
import { SectionHeading } from "@/components/PageHeader";
import { PlatformCard } from "@/components/PlatformCard";
import { PlatformLogo } from "@/components/PlatformLogo";
import { AffiliateCta } from "@/components/AffiliateCta";
import { ArticleCard, GuideLink } from "@/components/ArticleCard";
import { NewsletterSection } from "@/components/Newsletter";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { ScoreNote } from "@/components/Score";
import {
  IconArrowRight, IconBook, IconCalc, IconChart, IconExchange, IconShield, IconSpark, IconWallet, IconInfo, IconLayers,
} from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Compare Crypto Exchanges, Wallets & Trading Tools`,
  absoluteTitle: true,
  description:
    "Independent comparisons of crypto exchanges, wallets and trading tools, plus beginner-friendly guides and free calculators. Honest pros, cons and fees.",
  path: "/",
});

const explore = [
  { href: "/exchanges", label: "Exchanges", text: "Fees, coins and safety compared", Icon: IconExchange },
  { href: "/wallets", label: "Wallets", text: "Hardware, software and mobile", Icon: IconWallet },
  { href: "/trading-tools", label: "Trading tools", text: "Charting, terminals, analytics", Icon: IconChart },
  { href: "/ai-tools", label: "AI tools", text: "What AI can and can't do", Icon: IconSpark },
  { href: "/learn", label: "Learn", text: "Plain-English guides", Icon: IconBook },
  { href: "/tools", label: "Calculators", text: "Profit, DCA and fees", Icon: IconCalc },
];

const popularGuides = [
  { href: "/learn/how-to-buy-bitcoin", title: "How to Buy Bitcoin", tag: "Beginner" },
  { href: "/learn/what-is-a-crypto-wallet", title: "What Is a Crypto Wallet?", tag: "Wallets" },
  { href: "/compare/binance-vs-bybit", title: "Binance vs Bybit", tag: "Comparison" },
  { href: "/learn/spot-vs-futures-trading", title: "Spot Trading vs Futures", tag: "Trading" },
  { href: "/learn/how-crypto-leverage-works", title: "How Crypto Leverage Works", tag: "Trading" },
  { href: "/learn/how-to-keep-crypto-safe", title: "How to Keep Crypto Safe", tag: "Security" },
  { href: "/learn/best-crypto-exchanges-for-beginners", title: "Best Crypto Exchanges for Beginners", tag: "Exchanges" },
  { href: "/learn/how-to-withdraw-crypto-to-a-wallet", title: "How to Withdraw Crypto to a Wallet", tag: "Wallets" },
];

const toolGroups: { category: PlatformCategory; blurb: string }[] = [
  { category: "charting", blurb: "Read price action and set alerts" },
  { category: "terminal", blurb: "Manage orders across exchanges" },
  { category: "portfolio", blurb: "Track holdings, P&L and taxes" },
  { category: "analytics", blurb: "On-chain and derivatives data" },
  { category: "ai", blurb: "AI-assisted research and analysis" },
];

const walletTypes: { category: PlatformCategory; title: string; text: string }[] = [
  { category: "hardware-wallet", title: "Hardware wallets", text: "Offline devices for long-term storage." },
  { category: "software-wallet", title: "Software wallets", text: "Desktop and browser wallets for DeFi and everyday use." },
  { category: "mobile-wallet", title: "Mobile wallets", text: "Phone wallets for on-the-go access." },
];

const principles = [
  { Icon: IconShield, title: "Commissions never set rankings", text: "Scores follow a published method. A platform paying us more doesn't move up." },
  { Icon: IconInfo, title: "Every affiliate link is labelled", text: "Sponsored links are marked on the button and tagged for search engines." },
  { Icon: IconLayers, title: "Risks shown next to features", text: "Hacks, regulatory issues and leverage risk are listed, not buried." },
];

export default function HomePage() {
  const exchanges = ranked(platformsBy("exchange")).slice(0, 4);
  const latest = getArticleMeta().slice(0, 3);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow pointer-events-none absolute inset-0" />
        <div className="container-x relative grid gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pt-24 lg:pb-28">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden /> Independent · Reader-supported
            </p>
            <h1 className="mt-6 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.1rem]">
              Find the best tools for{" "}
              <span className="bg-gradient-to-r from-accent via-[#9ff3cf] to-blue bg-clip-text text-transparent">crypto, trading</span>{" "}
              &amp; investing
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Independent comparisons, guides and tools designed to help you choose the right platforms.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/exchanges" size="lg">
                Explore Platforms <IconArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/learn" size="lg" variant="secondary">Start Learning</ButtonLink>
            </div>
            <p className="mt-6 max-w-lg text-xs leading-relaxed text-subtle">
              Crypto is high risk and you could lose your money. Educational content only — not financial advice. Some links are{" "}
              <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-fg">affiliate links</Link>.
            </p>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <HeroScreener />
          </div>
        </div>
      </section>

      {/* ───────── Explore ───────── */}
      <section aria-label="Explore categories" className="container-x">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {explore.map(({ href, label, text, Icon }) => (
            <li key={href}>
              <Link href={href} className="card card-hover group flex h-full flex-col gap-3 p-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg text-accent">
                  <Icon width={18} height={18} />
                </span>
                <span>
                  <span className="block font-medium text-fg">{label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-subtle">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Exchanges ───────── */}
      <section aria-labelledby="exchanges-title" className="container-x mt-24">
        <SectionHeading
          id="exchanges-title"
          eyebrow="01 — Exchanges"
          title="Best crypto exchanges"
          intro="Ranked on fees, security, ease of use and regulation. Pick based on where you live and what you'll actually do."
          action={<ButtonLink href="/exchanges" variant="secondary">Compare all exchanges <IconArrowRight width={16} height={16} /></ButtonLink>}
        />
        <AffiliateNotice className="mt-5" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {exchanges.map((p, i) => (
            <PlatformCard key={p.slug} platform={p} rank={i + 1} />
          ))}
        </div>
        <div className="mt-4"><ScoreNote /></div>
      </section>

      {/* ───────── Wallets ───────── */}
      <section aria-labelledby="wallets-title" className="container-x mt-24">
        <SectionHeading
          id="wallets-title"
          eyebrow="02 — Wallets"
          title="Best crypto wallets"
          intro="Hardware wallets for long-term storage, software and mobile wallets for everyday use."
          action={<ButtonLink href="/wallets" variant="secondary">All wallets <IconArrowRight width={16} height={16} /></ButtonLink>}
        />
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {walletTypes.map(({ category, title, text }) => (
            <div key={category} className="card flex min-w-0 flex-col p-5 sm:p-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">{title}</p>
              <p className="mt-2 text-sm text-muted">{text}</p>
              <ul className="mt-5 divide-y divide-line border-t border-line">
                {ranked(platformsBy(category)).slice(0, 3).map((p) => (
                  <li key={p.slug} className="flex items-center gap-3 py-3.5">
                    <PlatformLogo platform={p} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 font-medium text-fg">
                        {p.name}
                        {p.score != null && <span className="num text-xs font-normal text-subtle">{p.score.toFixed(1)}</span>}
                      </p>
                      <p className="truncate text-xs text-subtle">{p.bestFor}</p>
                    </div>
                    <AffiliateCta platform={p} placement="card" variant="secondary" showLabel={false} label="Visit" />
                  </li>
                ))}
              </ul>
              <Link href="/wallets" className="mt-auto pt-4 text-sm font-medium text-accent">Compare {title.toLowerCase()} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Trading tools ───────── */}
      <section aria-labelledby="tools-title" className="container-x mt-24">
        <SectionHeading
          id="tools-title"
          eyebrow="03 — Trading tools"
          title="Tools traders actually use"
          intro="From charting to tax reports. Most have free plans — start there before paying."
          action={<ButtonLink href="/trading-tools" variant="secondary">Browse tools <IconArrowRight width={16} height={16} /></ButtonLink>}
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {toolGroups.map(({ category, blurb }) => {
            const items = ranked(platformsBy(category));
            const href = category === "ai" ? "/ai-tools" : `/trading-tools#${category}`;
            return (
              <Link key={category} href={href} className="card card-hover group flex flex-col p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">{categoryLabels[category]}</p>
                <p className="mt-2 text-sm text-muted">{blurb}</p>
                <div className="mt-5 flex gap-1.5">
                  {items.slice(0, 3).map((p) => (
                    <PlatformLogo key={p.slug} platform={p} size="sm" />
                  ))}
                </div>
                <p className="mt-4 text-xs text-subtle">{items.map((p) => p.name).join(" · ")}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────── Guides + latest ───────── */}
      <section aria-labelledby="guides-title" className="container-x mt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <SectionHeading id="guides-title" eyebrow="04 — Learn" title="Popular guides" intro="Start here if you're new. Every guide is written in plain English." />
            <div className="mt-8 grid gap-2.5">
              {popularGuides.map((g) => (
                <GuideLink key={g.href} {...g} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="05 — Latest"
              title="Latest articles"
              action={<ButtonLink href="/learn" variant="ghost">View all <IconArrowRight width={16} height={16} /></ButtonLink>}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {latest.map((a, i) => (
                <div key={a.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}>
                  <ArticleCard article={a} featured={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Calculators ───────── */}
      <section aria-labelledby="calc-title" className="container-x mt-24">
        <div className="card overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Free tools</p>
              <h2 id="calc-title" className="mt-3 text-2xl font-semibold sm:text-3xl">Run the numbers before you trade</h2>
              <p className="mt-3 text-muted">Calculators for profit and loss, percentage moves, DCA average cost and trading fees. They show maths, not predictions.</p>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[
                ["/tools/crypto-profit-calculator", "Crypto profit calculator"],
                ["/tools/percentage-change-calculator", "Percentage gain/loss"],
                ["/tools/dca-calculator", "DCA average cost"],
                ["/tools/trading-fee-calculator", "Trading fee calculator"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="group flex items-center justify-between rounded-xl border border-line bg-bg/60 px-4 py-3.5 text-sm font-medium transition-colors hover:border-line-strong">
                    <span className="flex items-center gap-3"><IconCalc width={18} height={18} className="text-accent" />{label}</span>
                    <IconArrowRight width={16} height={16} className="text-subtle transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── Principles ───────── */}
      <section aria-labelledby="principles-title" className="container-x mt-24">
        <h2 id="principles-title" className="sr-only">How we work</h2>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {principles.map(({ Icon, title, text }) => (
            <div key={title} className="bg-surface p-6">
              <Icon className="text-accent" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-subtle">
          Read <Link href="/about#methodology" className="text-muted underline underline-offset-2 hover:text-fg">how we score platforms</Link> and our{" "}
          <Link href="/affiliate-disclosure" className="text-muted underline underline-offset-2 hover:text-fg">affiliate disclosure</Link>.
        </p>
      </section>

      <NewsletterSection />

      <section aria-label="Risk disclaimer" className="container-x mt-16">
        <RiskWarning />
      </section>
    </>
  );
}
