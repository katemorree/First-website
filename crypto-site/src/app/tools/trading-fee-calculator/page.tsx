import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/ToolPage";
import { FeeCalculator, type FeePreset } from "@/components/Calculators";
import { platformsBy } from "@/content/platforms";

const path = "/tools/trading-fee-calculator";
export const metadata: Metadata = pageMetadata({
  title: "Crypto Trading Fee Calculator (Spot & Futures)",
  description: "Calculate crypto trading fees per trade and per month, compare exchange fee levels, and see how leverage multiplies the fees you pay.",
  path,
  kicker: "Calculator",
});

export default function Page() {
  const presets: FeePreset[] = platformsBy("exchange").flatMap((p) => {
    if (!p.feeSchedule) return [];
    const list: FeePreset[] = [{ label: `${p.name} — spot`, maker: p.feeSchedule.spotMaker, taker: p.feeSchedule.spotTaker }];
    if (p.feeSchedule.futuresMaker != null && p.feeSchedule.futuresTaker != null)
      list.push({ label: `${p.name} — futures`, maker: p.feeSchedule.futuresMaker, taker: p.feeSchedule.futuresTaker });
    return list;
  });

  return (
    <ToolPage
      title="Trading fee calculator"
      intro="See exactly what trading fees cost you per trade and per month — and how leverage multiplies them."
      path={path}
      howTo={
        <>
          <h2>Maker vs taker fees</h2>
          <p><strong>Taker</strong> fees apply when your order fills immediately (a market order). <strong>Maker</strong> fees apply when your limit order waits on the order book. Maker fees are usually lower.</p>
          <h2>Fees and leverage</h2>
          <p>Fees are charged on your full position size, not just your own money. At 10x leverage, a 0.05% fee is effectively 0.5% of your money each way. See <Link href="/learn/how-crypto-leverage-works">how leverage works</Link>.</p>
        </>
      }
      faqs={[
        { q: "Which exchange has the lowest fees?", a: "At base tier, several large exchanges charge around 0.08–0.10% for spot trades. See our exchange comparison for current figures." },
        { q: "Are there other costs besides trading fees?", a: "Yes: spreads, deposit and withdrawal fees, card fees and, for futures, funding payments." },
      ]}
    >
      <FeeCalculator presets={presets} />
    </ToolPage>
  );
}
