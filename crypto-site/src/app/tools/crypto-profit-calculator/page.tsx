import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/ToolPage";
import { ProfitCalculator } from "@/components/Calculators";

const path = "/tools/crypto-profit-calculator";
export const metadata: Metadata = pageMetadata({
  title: "Crypto Profit Calculator (With Fees)",
  description: "Calculate profit or loss on a crypto trade including buy and sell fees, your return percentage and your break-even sell price.",
  path,
  kicker: "Calculator",
});

export default function Page() {
  return (
    <ToolPage
      title="Crypto profit calculator"
      intro="Work out the profit or loss on a crypto trade, including trading fees and your break-even price."
      path={path}
      howTo={
        <>
          <h2>How it works</h2>
          <p>Enter how much you invested, the price you bought at and the price you sold (or plan to sell) at. Add each side&apos;s trading fee as a percentage.</p>
          <ul>
            <li><strong>Coins bought</strong> = (amount − buy fee) ÷ buy price</li>
            <li><strong>Value after selling</strong> = coins × sell price − sell fee</li>
            <li><strong>Break-even price</strong> is the sell price at which you get your original amount back after fees.</li>
          </ul>
          <p>The calculator uses the prices you type in. It can&apos;t tell you what prices will do — nobody can.</p>
        </>
      }
      faqs={[
        { q: "Does this include taxes?", a: "No. Selling crypto for a profit may be taxable where you live. Check your local tax rules." },
        { q: "Why is my break-even price higher than my buy price?", a: "Because you pay a fee when buying and again when selling. The price needs to rise enough to cover both." },
      ]}
    >
      <ProfitCalculator />
    </ToolPage>
  );
}
