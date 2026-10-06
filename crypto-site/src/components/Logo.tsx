import Link from "next/link";
import { site } from "@/lib/site";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#0f1a15" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#5be7a9" strokeOpacity="0.35" />
      <path d="M8 20.5 13 15l4 3.5 7-8.5" fill="none" stroke="#5be7a9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="10" r="2.2" fill="#5be7a9" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-lg" aria-label={`${site.name} home`}>
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.05rem] font-semibold tracking-tight text-fg">{site.name}</span>
    </Link>
  );
}
