import { ImageResponse } from "next/og";
import { portfolio } from "@/content/portfolio";

// next/og ships with Next — no dependency, and no PNG to design by hand.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${portfolio.personal.name} — ${portfolio.personal.tagline}`;

export default function OpengraphImage() {
  const { name, tagline, location } = portfolio.personal;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0b1120",
          padding: "80px",
          // Inline styles only: next/og supports no stylesheets or Tailwind here.
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(37,99,235,0.35) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#60a5fa",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#e8edf7",
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 36, color: "#8ca0bf", marginTop: 20 }}>
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 48,
          }}
        >
          <div style={{ height: 4, width: 64, background: "#2563eb" }} />
          <div style={{ fontSize: 26, color: "#8ca0bf" }}>{location}</div>
        </div>
      </div>
    ),
    size,
  );
}
