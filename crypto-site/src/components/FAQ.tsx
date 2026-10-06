import type { FAQ as FAQItem } from "@/content/reviews";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";

export function FAQ({ items, title = "Frequently asked questions" }: { items: FAQItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="text-2xl font-semibold">{title}</h2>
      <div className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg transition-colors hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="relative h-4 w-4 shrink-0 text-subtle">
                <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
