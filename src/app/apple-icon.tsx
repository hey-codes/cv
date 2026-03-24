import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#114AB0",
        borderRadius: "36px",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "90px",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-2px",
        }}
      >
        CM
      </span>
    </div>,
    { ...size },
  );
}
