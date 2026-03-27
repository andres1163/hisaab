import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Hisaab - Trading Journal for Indian Traders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function NotebookIcon({ size: s }: { size: number }) {
  const body = s;
  const h = s * 1.2;
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: body,
        height: h,
      }}
    >
      {/* Spine */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: body * 0.2,
          height: h,
          background: "rgba(255,255,255,0.35)",
          borderRadius: body * 0.1,
          display: "flex",
        }}
      />
      {/* Book body */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: body * 0.12,
          width: body * 0.88,
          height: h,
          background: "white",
          borderRadius: `${body * 0.04}px ${body * 0.08}px ${body * 0.08}px ${body * 0.04}px`,
          display: "flex",
        }}
      />
      {/* Lines */}
      {[0.24, 0.40, 0.56, 0.72].map((yPct, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: h * yPct,
            left: body * 0.30,
            width: body * (i % 2 === 0 ? 0.52 : 0.38),
            height: h * 0.04,
            background: "#2483ff",
            opacity: i % 2 === 0 ? 0.45 : 0.28,
            borderRadius: h * 0.02,
            display: "flex",
          }}
        />
      ))}
      {/* Bookmark */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: body * 0.72,
          width: body * 0.12,
          height: h * 0.28,
          background: "#f97316",
          borderRadius: `0 0 ${body * 0.02}px ${body * 0.02}px`,
          display: "flex",
        }}
      />
    </div>
  );
}

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <NotebookIcon size={80} />
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            margin: "28px 0 0 0",
            lineHeight: 1.2,
          }}
        >
          Hisaab
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#94a3b8",
            margin: "10px 0 0 0",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Trading Journal for Indian Traders
        </p>
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 36,
            color: "#64748b",
            fontSize: 18,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Zero Signup
          </span>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            100% Browser-based
          </span>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Open Source
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
