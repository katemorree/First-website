import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
};

/** Consistent heading block for inner pages. */
export function PageHeader({ eyebrow, title, intro, crumbs, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="glow pointer-events-none absolute inset-0" />
      <div className="container-x relative pt-8 pb-10 sm:pt-10 sm:pb-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-[2rem] leading-[1.1] font-semibold sm:text-5xl">{title}</h1>
          {intro && <div className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</div>}
        </div>
        {children && <div className="relative mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, action, id }: { eyebrow?: string; title: string; intro?: string; action?: ReactNode; id?: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="mt-2.5 text-2xl font-semibold sm:text-[2rem] sm:leading-tight">{title}</h2>
        {intro && <p className="mt-3 text-muted">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
