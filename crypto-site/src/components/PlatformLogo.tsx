import Image from "next/image";
import type { Platform } from "@/content/platforms";
import { cx } from "@/lib/format";

const sizes = { sm: "h-9 w-9 text-sm rounded-lg", md: "h-11 w-11 text-base rounded-xl", lg: "h-16 w-16 text-2xl rounded-2xl" };

/** Shows the platform's logo from /public/logos, or a neat monogram tile if none is set. */
export function PlatformLogo({ platform, size = "md" }: { platform: Platform; size?: keyof typeof sizes }) {
  const px = size === "lg" ? 64 : size === "md" ? 44 : 36;
  if (platform.logo) {
    return (
      <span className={cx("relative inline-flex shrink-0 overflow-hidden bg-surface-3", sizes[size])}>
        <Image src={platform.logo} alt={`${platform.name} logo`} width={px} height={px} className="h-full w-full object-contain p-1.5" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className={cx("inline-flex shrink-0 items-center justify-center border font-semibold", sizes[size])}
      style={{
        color: platform.brandColor,
        borderColor: `${platform.brandColor}40`,
        background: `linear-gradient(145deg, ${platform.brandColor}22, ${platform.brandColor}08)`,
      }}
    >
      {platform.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}
    </span>
  );
}
