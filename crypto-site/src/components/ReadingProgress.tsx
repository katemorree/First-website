"use client";

import { useEffect, useState } from "react";

/** Thin bar under the header that fills as you read. */
export function ReadingProgress({ targetId = "article-body" }: { targetId?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const read = Math.min(Math.max(-rect.top + 80, 0), Math.max(total, 1));
      setProgress(total > 0 ? read / total : 0);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div aria-hidden className="fixed inset-x-0 top-16 z-40 h-[2px] bg-transparent">
      <div className="h-full origin-left bg-accent shadow-[0_0_12px_rgba(91,231,169,0.7)]" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
