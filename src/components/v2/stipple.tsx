"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FRAMES = 3;

/** Smooth organic field in [0,1] from layered sines (cheap stand-in for low-frequency noise). */
function blob(u: number, v: number) {
  const a = Math.sin(u * 5.3 + Math.sin(v * 3.1) * 1.6) * Math.cos(v * 4.7 + Math.sin(u * 2.3) * 1.4);
  const b = Math.sin((u + v) * 7.9 + 1.3) * 0.5;
  return Math.min(1, Math.max(0, 0.5 + 0.35 * a + 0.15 * b));
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/** Render one stipple frame. Each call uses fresh randomness, so frames differ ("boil"). */
function renderFrame(w: number, h: number, rgb: [number, number, number], alpha: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const a = Math.round(alpha * 255);
  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const dx = (u - 0.5) * 2;
      const dy = (v - 0.5) * 2;
      const r = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;
      // light speckle everywhere + organic patches + denser towards the edges
      const density = 0.06 + 0.3 * smoothstep(0.4, 0.95, blob(u, v)) + 0.6 * smoothstep(0.42, 1, r);
      if (Math.random() < density * density * 1.4) {
        const i = (y * w + x) * 4;
        data[i] = rgb[0];
        data[i + 1] = rgb[1];
        data[i + 2] = rgb[2];
        data[i + 3] = a;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

/**
 * Hand-made looking stipple "spray": pre-rendered once into a few frames, then animated
 * with a cheap CSS opacity cycle (stop-motion boil). No per-frame filter work.
 */
export function StippleBackdrop({
  className,
  rgb = [70, 110, 225],
  alpha = 0.5,
  paper = "#f4ede2",
}: {
  className?: string;
  rgb?: [number, number, number];
  alpha?: number;
  paper?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<string[]>([]);
  const still = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    let last = "";
    const draw = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      const key = `${w}x${h}`;
      if (!w || !h || key === last) return;
      last = key;
      const count = still ? 1 : FRAMES;
      setFrames(Array.from({ length: count }, () => renderFrame(w, h, rgb, alpha)));
    };
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(draw, 150);
    });
    ro.observe(el);
    draw();
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
    // rgb is a tuple literal; stringify to keep the effect stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, alpha, rgb.join(",")]);

  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0", className)} style={{ backgroundColor: paper }}>
      {frames.map((src, i) => (
        <div
          key={i}
          className={cn("absolute inset-0 bg-no-repeat", frames.length > 1 && "animate-boil")}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "100% 100%",
            animationDelay: `${(-i * 0.9) / frames.length}s`,
          }}
        />
      ))}
    </div>
  );
}
