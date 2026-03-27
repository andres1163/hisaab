import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2483ff",
          borderRadius: 40,
        }}
      >
        {/* Ledger notebook */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: 100,
            height: 120,
          }}
        >
          {/* Spine shadow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 20,
              height: 120,
              background: "rgba(255,255,255,0.4)",
              borderRadius: "10px 0 0 10px",
              display: "flex",
            }}
          />
          {/* Book body */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 12,
              width: 88,
              height: 120,
              background: "white",
              borderRadius: "4px 10px 10px 4px",
              display: "flex",
            }}
          />
          {/* Lines */}
          <div
            style={{
              position: "absolute",
              top: 28,
              left: 30,
              width: 55,
              height: 6,
              background: "#2483ff",
              opacity: 0.5,
              borderRadius: 3,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 46,
              left: 30,
              width: 42,
              height: 6,
              background: "#2483ff",
              opacity: 0.35,
              borderRadius: 3,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 64,
              left: 30,
              width: 55,
              height: 6,
              background: "#2483ff",
              opacity: 0.5,
              borderRadius: 3,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 82,
              left: 30,
              width: 36,
              height: 6,
              background: "#2483ff",
              opacity: 0.35,
              borderRadius: 3,
              display: "flex",
            }}
          />
          {/* Bookmark ribbon */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 72,
              width: 12,
              height: 30,
              background: "#f97316",
              borderRadius: "0 0 2px 2px",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
