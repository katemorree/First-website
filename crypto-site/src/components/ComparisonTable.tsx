import type { Platform } from "@/content/platforms";
import type { CompareRow } from "@/content/comparisons";
import { PlatformLogo } from "./PlatformLogo";
import { cx } from "@/lib/format";

/**
 * Two-platform comparison. On phones each row shows its label on top and
 * the two values side by side — no sideways scrolling needed.
 */
export function ComparisonTable({ a, b, rows }: { a: Platform; b: Platform; rows: CompareRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <table role="table" className="block w-full border-collapse text-sm md:table">
        <caption className="sr-only">{a.name} vs {b.name} comparison</caption>
        <thead role="rowgroup" className="block bg-surface-2 md:table-header-group">
          <tr role="row" className="flex border-b border-line md:table-row">
            <th scope="col" role="columnheader" className="hidden w-[30%] px-5 py-4 text-left text-[0.7rem] font-medium uppercase tracking-wider text-subtle md:table-cell">
              Feature
            </th>
            {[a, b].map((p) => (
              <th key={p.slug} scope="col" role="columnheader" className="block w-1/2 px-4 py-4 text-left md:table-cell md:w-[35%] md:px-5">
                <span className="flex items-center gap-2.5">
                  <PlatformLogo platform={p} size="sm" />
                  <span className="font-semibold text-fg">{p.name}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup" className="block md:table-row-group">
          {rows.map((r) => (
            <tr role="row" key={r.label} className="flex flex-wrap border-b border-line last:border-0 md:table-row">
              <th scope="row" role="rowheader" className="block w-full px-4 pt-4 text-left md:table-cell text-[0.72rem] font-medium uppercase tracking-wider text-subtle md:w-auto md:px-5 md:py-4 md:text-sm md:normal-case md:tracking-normal md:text-muted">
                {r.label}
              </th>
              {(["a", "b"] as const).map((side) => (
                <td
                  role="cell"
                  key={side}
                  className={cx(
                    "block w-1/2 px-4 pt-1.5 pb-4 align-top md:table-cell md:w-auto md:px-5 md:py-4",
                    r.edge === side ? "text-fg" : "text-muted"
                  )}
                >
                  <span className="inline-flex items-start gap-1.5">
                    {r.edge === side && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />}
                    <span>{side === "a" ? r.a : r.b}</span>
                    {r.edge === side && <span className="sr-only">(stronger on this point)</span>}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
