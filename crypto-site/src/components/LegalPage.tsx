import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { formatDate } from "@/lib/format";
import { DraftMarker } from "./DraftMarker";

export function LegalPage({ title, path, updated, intro, children }: { title: string; path: string; updated: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        crumbs={[{ name: title, path }]}
        intro={
          <>
            {intro && <p>{intro}</p>}
            <p className="mt-3 text-sm text-subtle">
              Last updated <time dateTime={updated}>{formatDate(updated)}</time>{" "}
              <DraftMarker label="Template — have a lawyer review" title="Template text: have a qualified lawyer review before launch" />
            </p>
          </>
        }
      />
      <div className="container-x mt-10">
        <div className="prose max-w-[46rem]">{children}</div>
      </div>
    </>
  );
}
