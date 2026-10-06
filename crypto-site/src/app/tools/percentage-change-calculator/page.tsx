import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/ToolPage";
import { PercentageCalculator } from "@/components/Calculators";

const path = "/tools/percentage-change-calculator";
export const metadata: Metadata = pageMetadata({
  title: "Percentage Gain/Loss Calculator for Crypto",
  description: "Calculate the percentage gain or loss between two prices, and see how big a gain you need to recover from a loss.",
  path,
  kicker: "Calculator",
});

export default function Page() {
  return (
    <ToolPage
      title="Percentage change calculator"
      intro="Calculate percentage gains and losses — and see why recovering from a loss is harder than it looks."
      path={path}
      howTo={
        <>
          <h2>The formula</h2>
          <p><strong>Percentage change</strong> = (ending value − starting value) ÷ starting value × 100.</p>
          <h2>Why losses are hard to recover from</h2>
          <p>If something falls 50%, it has to double (+100%) to get back to where it started. A 90% loss needs a 900% gain. This is why managing risk matters more than chasing big wins.</p>
        </>
      }
      faqs={[
        { q: "How do I calculate percentage gain?", a: "Subtract the starting value from the ending value, divide by the starting value, and multiply by 100." },
        { q: "What gain do I need after a 30% loss?", a: "About 42.86%. Use the second calculator on this page for any loss amount." },
      ]}
    >
      <PercentageCalculator />
    </ToolPage>
  );
}
