import { showDraftMarkers } from "@/lib/site";

/**
 * Small amber "Verify" pill shown next to facts that still need checking.
 * Turn them all off by setting NEXT_PUBLIC_SHOW_DRAFT_MARKERS=false.
 */
export function DraftMarker({ label = "Verify", title = "Draft information — verify before publishing" }: { label?: string; title?: string }) {
  if (!showDraftMarkers) return null;
  return (
    <span
      title={title}
      className="inline-flex shrink-0 items-center rounded-full border border-amber/30 bg-amber/10 px-1.5 py-px align-middle font-mono text-[0.6rem] font-medium uppercase tracking-wider text-amber"
    >
      {label}
    </span>
  );
}
