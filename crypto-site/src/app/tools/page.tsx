import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { calculators } from "@/components/ToolPage";
import { IconCalc, IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Free Crypto Calculators",
  description: "Free crypto calculators: profit and loss, percentage change, DCA average cost and trading fees. Simple maths, no predictions.",
  path: "/tools",
  kicker: "Calculators",
});

export default function ToolsIndex() {
  return (
    <>
      <PageHeader eyebrow="Tools" title="Crypto calculators" crumbs={[{ name: "Tools", path: "/tools" }]} intro={<p>Quick, private calculators — everything runs in your browser and nothing you type is stored or sent anywhere.</p>} />
      <div className="container-x mt-12 grid gap-5 md:grid-cols-2">
        {calculators.map((c) => (
          <Link key={c.href} href={c.href} className="card card-hover group flex gap-4 p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-accent"><IconCalc /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold">{c.title}</span>
              <span className="mt-1 block text-sm text-muted">{c.text}</span>
            </span>
            <IconArrowRight className="mt-1 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </>
  );
}
