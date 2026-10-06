import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description: `How ${site.name} makes money through affiliate links, how they are labelled, and why commissions never affect our ratings.`,
  path: "/affiliate-disclosure",
  kicker: "Disclosure",
});

export default function Page() {
  return (
    <LegalPage title="Affiliate disclosure" path="/affiliate-disclosure" updated="2026-10-06" intro="Plain-English explanation of how this site makes money.">
      <h2>The short version</h2>
      <p>
        {site.name} is free to use. Some links on this website are <strong>affiliate links</strong>. If you click one and sign up, buy or deposit,
        the company may pay us a commission. This costs you nothing extra.
      </p>

      <h2>How to recognise affiliate links</h2>
      <ul>
        <li>Buttons that are affiliate links say <strong>&ldquo;Affiliate link · we may earn a commission&rdquo;</strong> underneath.</li>
        <li>Buttons that link to an official site we have no deal with say <strong>&ldquo;Official website · not an affiliate link&rdquo;</strong>.</li>
        <li>Pages that contain affiliate links show a short disclosure near the top.</li>
        <li>Affiliate links are tagged <code>rel=&quot;sponsored&quot;</code> so search engines know they are paid links.</li>
      </ul>

      <h2>Does this affect our ratings?</h2>
      <p>
        No. Scores follow our published <Link href="/about#methodology">methodology</Link>. A platform does not get a higher score, a better position
        or a more favourable comparison verdict because it pays us, or pays us more. We regularly recommend platforms we earn nothing from when they
        are the better fit.
      </p>

      <h2>Who we may work with</h2>
      <p>
        We may have affiliate relationships with crypto exchanges, wallet manufacturers, trading and charting platforms, portfolio and tax tools, and
        other financial products. Relationships can start or end at any time.
      </p>

      <h2>Referral codes and sign-up offers</h2>
      <p>
        Some platforms offer new-user rewards when you use a referral link or code. These offers come from the platform, not from us, and usually have
        conditions such as minimum deposits or trading volume. Always read the platform&apos;s terms.
      </p>

      <h2>Not financial advice</h2>
      <p>
        Nothing on this site is financial advice. Crypto is high risk. Read our <Link href="/risk-disclaimer">risk disclaimer</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
