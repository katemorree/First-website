import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { DraftMarker } from "@/components/DraftMarker";

export const metadata: Metadata = pageMetadata({
  title: `About ${site.name}: Who We Are & How We Rate Platforms`,
  description: `Who runs ${site.name}, how we research and score crypto platforms, how we make money, and our editorial independence policy.`,
  path: "/about",
  kicker: "About",
});

const criteria = [
  { name: "Security & track record", weight: "30%", text: "Custody practices, proof of reserves, history of hacks and how they were handled, regulatory standing." },
  { name: "Fees & costs", weight: "20%", text: "Trading fees at base tier, spreads on simple buys, deposit and withdrawal costs." },
  { name: "Ease of use", weight: "20%", text: "How easily a beginner can complete common tasks without making costly mistakes." },
  { name: "Features & assets", weight: "15%", text: "Coin selection, order types, tools, staking and other products." },
  { name: "Support & transparency", weight: "15%", text: "Clear fee pages, responsive support, honest communication." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Honest tools for a noisy industry"
        crumbs={[{ name: "About", path: "/about" }]}
        intro={<p>{site.name} helps people choose crypto platforms and learn the basics without hype, fake urgency or hidden incentives.</p>}
      />
      <div className="container-x mt-10">
        <div className="prose max-w-[46rem]">
          <h2 id="who">Who we are</h2>
          <p>
            {site.name} is an independent publisher. <DraftMarker label="Add your bio" title="Replace with your real name, background and photo — it builds trust and helps SEO (E-E-A-T)." />{" "}
            Replace this paragraph with who you are, why you started the site and what experience you have with crypto and trading. Real names and
            honest backgrounds build far more trust than anonymous brands.
          </p>

          <h2 id="mission">What we do</h2>
          <ul>
            <li>Compare exchanges, wallets and trading tools on the things that actually matter</li>
            <li>Explain crypto in plain English, with the risks included</li>
            <li>Build free calculators that show maths — never predictions</li>
          </ul>

          <h2 id="methodology">How we score platforms</h2>
          <p>Every platform gets an editorial score out of 5, based on these weighted criteria:</p>
        </div>
        <div className="mt-6 max-w-[46rem] divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {criteria.map((c) => (
            <div key={c.name} className="flex gap-4 p-4 sm:p-5">
              <span className="num w-12 shrink-0 text-lg font-semibold text-accent">{c.weight}</span>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="mt-1 text-sm text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="prose mt-8 max-w-[46rem]">
          <p>
            Scores are opinions based on public information and hands-on use. They can change when platforms change. Where a score is still a draft
            awaiting hands-on testing, we say so.
          </p>

          <h2 id="money">How we make money</h2>
          <p>
            Some links on this site are affiliate links. If you sign up through them, the platform may pay us a commission at no extra cost to you.
            That&apos;s how we keep the site free. Affiliate links are always labelled and tagged as sponsored. Read our full{" "}
            <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
          </p>

          <h2 id="independence">Editorial independence</h2>
          <ul>
            <li>Commission rates never decide rankings, scores or comparison verdicts.</li>
            <li>We list platforms we don&apos;t earn from when they&apos;re the better choice.</li>
            <li>We don&apos;t accept payment for reviews or for higher placement.</li>
            <li>We never publish fake reviews, testimonials, user counts or profit claims.</li>
          </ul>

          <h2 id="corrections">Corrections</h2>
          <p>
            Crypto platforms change fees and features often. If you spot something out of date or wrong, email{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we&apos;ll check and update it.
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
      </div>
    </>
  );
}
