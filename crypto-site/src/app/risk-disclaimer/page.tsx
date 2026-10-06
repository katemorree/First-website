import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Risk Disclaimer",
  description: "Important information about the risks of cryptocurrency and leveraged trading. Content on this site is educational and not financial advice.",
  path: "/risk-disclaimer",
  kicker: "Risk",
});

export default function Page() {
  return (
    <LegalPage title="Risk disclaimer" path="/risk-disclaimer" updated="2026-10-06" intro="Please read this before acting on anything you find on this website.">
      <h2>Cryptocurrency is high risk</h2>
      <p>
        Cryptocurrencies and other digital assets are highly volatile. Their prices can rise or fall sharply in a short time, and can fall to zero.
        <strong> You could lose all of the money you invest.</strong> Only invest money you can afford to lose.
      </p>

      <h2>Leveraged products carry extra risk</h2>
      <p>
        Futures, perpetual contracts, margin trading and other leveraged products can magnify losses as well as gains. Positions can be liquidated
        quickly, and many retail traders lose money using them.
      </p>

      <h2>Not financial advice</h2>
      <p>
        All content on {site.name} — including guides, reviews, comparisons, scores and calculators — is for general educational and informational
        purposes only. It is not financial, investment, legal or tax advice, and it does not take your personal circumstances into account. Consider
        speaking with an independent, qualified financial adviser before making financial decisions.
      </p>

      <h2>No guarantees</h2>
      <p>
        We never promise or imply guaranteed returns. Past performance is not a reliable indicator of future results. Calculators only perform
        arithmetic on the numbers you enter; they do not predict prices.
      </p>

      <h2>Regulation and availability</h2>
      <p>
        Cryptocurrency may be unregulated or only partly regulated where you live, and you may have limited or no protection if something goes wrong.
        Platforms mentioned on this site may not be available, licensed or legal in your country. It is your responsibility to check.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        Platform fees, features, supported assets and offers change frequently. We aim to keep information accurate and up to date but cannot
        guarantee it. Always confirm details on the platform&apos;s official website.
      </p>

      <h2>Platform and security risks</h2>
      <p>
        Exchanges and wallet providers can be hacked, suspend withdrawals, or become insolvent. Self-custody wallets put the responsibility for
        security on you; losing a recovery phrase can mean permanent loss of funds.
      </p>

      <h2>Taxes</h2>
      <p>Buying, selling, swapping or spending crypto may create tax obligations. Rules differ by country.</p>

      <h2>Affiliate relationships</h2>
      <p>
        Some links are affiliate links and we may receive compensation if you sign up. See our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
    </LegalPage>
  );
}
