import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Generates the social sharing image (1200×630) for every page.
 * Used automatically via pageMetadata() — you don't need to design images by hand.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || site.name).slice(0, 110);
  const kicker = (searchParams.get("kicker") || "").slice(0, 30);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#08090b",
          backgroundImage:
            "radial-gradient(800px 400px at 15% 0%, rgba(91,231,169,0.18), transparent 70%), radial-gradient(700px 380px at 90% 10%, rgba(130,172,255,0.12), transparent 70%)",
          color: "#eceef1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#0f1a15", border: "2px solid rgba(91,231,169,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="34" height="34" viewBox="0 0 32 32"><path d="M6 21.5 12 15l4.5 4 9-10.5" fill="none" stroke="#5be7a9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {kicker ? (
            <div style={{ fontSize: 24, color: "#5be7a9", textTransform: "uppercase", letterSpacing: 4 }}>{kicker}</div>
          ) : null}
          <div style={{ fontSize: title.length > 60 ? 58 : 70, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#828a97" }}>
          <div>{site.tagline}</div>
          <div>Capital at risk · Not financial advice</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" } }
  );
}
