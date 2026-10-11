import { ImageResponse } from "next/og";

export const alt = "IB Studio — Webs que convierten visitas en clientes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = "Webs que convierten visitas en clientes";

/** Loads Lora (as TTF, which the image renderer needs) for just the characters used. Falls back to the default font if offline. */
async function loadLora(text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Lora&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const lora = await loadLora(headline);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="-60 -70 540 540">
            <rect x="-60" y="-70" width="540" height="540" rx="120" fill="#3A63FF" />
            <g fill="#fff">
              <rect x="0" y="0" width="65" height="64" />
              <rect x="0" y="110" width="65" height="290" />
              <path d="M114 0H178V110H275A145 145 0 0 1 275 400H114V336H275A81 81 0 0 0 275 174H114Z" />
            </g>
          </svg>
          <span style={{ fontSize: 34, fontWeight: 600, color: "#0a0a0a", letterSpacing: -1 }}>IB Studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span style={{ fontFamily: lora ? "Lora" : undefined, fontSize: 84, lineHeight: 1.02, color: "#0a0a0a", maxWidth: 960, letterSpacing: -1 }}>
            {headline}
          </span>
          <span style={{ fontSize: 30, color: "#737373" }}>Diseño web y mantenimiento para negocios locales en Barcelona</span>
        </div>
      </div>
    ),
    { ...size, fonts: lora ? [{ name: "Lora", data: lora, style: "normal", weight: 400 }] : undefined },
  );
}
