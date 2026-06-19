import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "HourCalc - Free Hours Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5, #6366f1, #8b5cf6)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            ⏱
          </div>
          <span style={{ fontSize: 48, fontWeight: 700, color: "white" }}>
            HourCalc
          </span>
        </div>
        <p
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          Free Hours Calculator
        </p>
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Calculate work hours, overtime & breaks instantly
        </p>
      </div>
    ),
    { ...size },
  );
}
