import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms that apply when you use the ${site.name} website.`,
  path: "/terms",
  kicker: "Terms",
});

export default function Page() {
  return (
    <LegalPage title="Terms of use" path="/terms" updated="2026-10-06">
      <p>By using {site.name} you agree to these terms. If you don&apos;t agree, please don&apos;t use the website.</p>

      <h2>1. Information only</h2>
      <p>
        Content on this website is general information and education. It is not financial, investment, legal or tax advice, and is not a
        recommendation to buy, sell or hold any asset. See our <Link href="/risk-disclaimer">risk disclaimer</Link>.
      </p>

      <h2>2. Eligibility</h2>
      <p>You must be at least 18 years old, or the age of majority where you live, to use this website.</p>

      <h2>3. Accuracy</h2>
      <p>
        We work to keep information accurate, but platform details change often and we make no warranty that content is complete, current or
        error-free. Always verify information with the relevant provider.
      </p>

      <h2>4. Third-party websites</h2>
      <p>
        We link to third-party websites, some through affiliate links (see our <Link href="/affiliate-disclosure">affiliate disclosure</Link>). We
        don&apos;t control those websites and aren&apos;t responsible for their content, products, services or availability. Your use of them is
        governed by their own terms.
      </p>

      <h2>5. Calculators</h2>
      <p>Calculators are provided for illustration only. Results depend on the numbers you enter and do not include every cost or tax.</p>

      <h2>6. Intellectual property</h2>
      <p>
        Content and design on this website belong to {site.name} unless stated otherwise. You may share links and short quotes with attribution. Trademarks
        and logos of third-party platforms belong to their owners and are used for identification only.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.name} is not liable for any loss or damage — including investment losses — arising from your use of,
        or reliance on, this website or any linked website. Nothing in these terms limits liability that cannot be limited by law.
      </p>

      <h2>8. Acceptable use</h2>
      <p>Don&apos;t misuse the website, attempt to disrupt it, scrape it at scale, or use it for unlawful purposes.</p>

      <h2>9. Changes</h2>
      <p>We may update these terms at any time. Continued use of the website means you accept the updated terms.</p>

      <h2>10. Governing law</h2>
      <p>These terms are governed by the laws of [TODO: your country/state]. Disputes will be handled by the courts of that jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
    </LegalPage>
  );
}
