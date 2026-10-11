import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** PNG version of app/icon.svg for iOS home screens and anything that can't use SVG icons. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#3A63FF" }}>
        <svg width="112" height="112" viewBox="0 0 420 400">
          <g fill="#fff">
            <rect x="0" y="0" width="65" height="64" />
            <rect x="0" y="110" width="65" height="290" />
            <path d="M114 0H178V110H275A145 145 0 0 1 275 400H114V336H275A81 81 0 0 0 275 174H114Z" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
