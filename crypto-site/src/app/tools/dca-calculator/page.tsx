import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/ToolPage";
import { DcaCalculator } from "@/components/Calculators";

const path = "/tools/dca-calculator";
export const metadata: Metadata = pageMetadata({
  title: "DCA Calculator: Average Crypto Purchase Price",
  description: "Dollar-cost averaging calculator: enter each purchase to see your average cost per coin, total invested and value at any price.",
  path,
  kicker: "Calculator",
});

export default function Page() {
  return (
    <ToolPage
      title="DCA average cost calculator"
      intro="Enter each purchase to find your average cost per coin and what your holding is worth at any price."
      path={path}
      howTo={
        <>
          <h2>What is dollar-cost averaging?</h2>
          <p>Dollar-cost averaging (DCA) means investing a fixed amount at regular intervals instead of all at once. You buy more coins when the price is low and fewer when it&apos;s high.</p>
          <p>It reduces the risk of putting everything in at a bad moment. It does <strong>not</strong> guarantee a profit — if the price keeps falling, you still lose money.</p>
          <h2>How the average is calculated</h2>
          <p><strong>Average cost</strong> = total amount invested ÷ total coins bought. This is not the same as averaging the prices, because a fixed amount buys more coins at lower prices.</p>
        </>
      }
      faqs={[
        { q: "Is DCA better than investing all at once?", a: "Neither is always better. DCA reduces timing risk; investing at once has historically sometimes done better in rising markets. It depends on what happens next, which nobody knows." },
        { q: "Can I set up automatic DCA?", a: "Many exchanges offer recurring buys. Check the fees, as small frequent purchases can be expensive on some platforms." },
      ]}
    >
      <DcaCalculator />
    </ToolPage>
  );
}
