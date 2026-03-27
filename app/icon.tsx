import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2483ff",
          borderRadius: 6,
        }}
      >
        {/* Ledger book - bold shapes for 32px clarity */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: 20,
            height: 22,
          }}
        >
          {/* Book body */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 2,
              width: 18,
              height: 22,
              background: "white",
              borderRadius: 2,
              display: "flex",
            }}
          />
          {/* Spine */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: 22,
              background: "rgba(255,255,255,0.5)",
              borderRadius: "2px 0 0 2px",
              display: "flex",
            }}
          />
          {/* Lines */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: 7,
              width: 10,
              height: 2,
              background: "#2483ff",
              borderRadius: 1,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 7,
              width: 8,
              height: 2,
              background: "#2483ff",
              opacity: 0.6,
              borderRadius: 1,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 15,
              left: 7,
              width: 10,
              height: 2,
              background: "#2483ff",
              borderRadius: 1,
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
