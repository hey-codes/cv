import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#114AB0",
        borderRadius: "6px",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "16px",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.5px",
        }}
      >
        CM
      </span>
    </div>,
    { ...size },
  );
}
