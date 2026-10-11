export type ShaderColor = readonly [number, number, number];

export type SketchShaderProps = {
  /** RGB channels from 0 to 1. */
  ink?: ShaderColor;
  paper?: ShaderColor;
  markInk?: ShaderColor;
  /** Preset from 0 (soft) to 1 (rough); individual props override it. */
  intensity?: number;
  /** Layer opacities from 0 to 1. Zero disables that layer. */
  washOpacity?: number;
  pigmentOpacity?: number;
  grainOpacity?: number;
  fiberOpacity?: number;
  brushOpacity?: number;
  fleckOpacity?: number;
  markOpacity?: number;
  /** Fraction of cells with marks, from 0 to 1. */
  markDensity?: number;
  /** Size and stroke multipliers, from 0.25 to 4. */
  markSize?: number;
  markStroke?: number;
  /** Wash pattern scale, from 0.25 to 10. */
  washScale?: number;
  /** Amount of ink pooled at the edges / center, from 0 to 1. */
  edgeStrength?: number;
  centerStrength?: number;
  /** Lightening in the center / fading of marks there, from 0 to 1. */
  centerSoftness?: number;
  markCenterFade?: number;
  /** Animation multiplier from 0 (still) to 5. */
  speed?: number;
  /** Pointer displacement from 0 (off) to 1. */
  pointerStrength?: number;
  /** Gradient fade from 0 (unmasked) to 1 (broad fade). */
  fade?: number;
  /** Overall opacity from 0 to 1. */
  opacity?: number;
};

export const blueInk: ShaderColor = [0.26, 0.43, 0.73];
export const paperColor: ShaderColor = [0.977, 0.963, 0.932];

const bounded = (value: number | undefined, fallback: number, min = 0, max = 1) =>
  value === undefined || !Number.isFinite(value) ? fallback : Math.min(max, Math.max(min, value));

export const clampIntensity = (value: number) => bounded(value, 0.5);

function color(value: ShaderColor | undefined, fallback: ShaderColor): ShaderColor {
  return [
    bounded(value?.[0], fallback[0]),
    bounded(value?.[1], fallback[1]),
    bounded(value?.[2], fallback[2]),
  ];
}

export function resolveSketchSettings(props: SketchShaderProps) {
  const intensity = bounded(props.intensity, 0.5);
  const t = Math.max(0, Math.min(1, (intensity - 0.5) * 2));
  const roughness = t * t * (3 - 2 * t);
  const ink = color(props.ink, blueInk);

  return {
    intensity,
    ink,
    paper: color(props.paper, paperColor),
    markInk: color(props.markInk, ink),
    fade: bounded(props.fade, 0),
    opacity: bounded(props.opacity, 1),
    controls: {
      washOpacity: bounded(props.washOpacity, 0.15 + intensity * 0.03),
      pigmentOpacity: bounded(props.pigmentOpacity, 0.10 + intensity * 0.04),
      grainOpacity: bounded(props.grainOpacity, 0.018),
      fiberOpacity: bounded(props.fiberOpacity, 0.009),
      brushOpacity: bounded(props.brushOpacity, intensity * 0.075),
      fleckOpacity: bounded(props.fleckOpacity, intensity * 0.19),
      markOpacity: bounded(props.markOpacity, intensity * (0.31 + roughness * 0.17)),
      markDensity: bounded(props.markDensity, 0.24 + roughness * 0.12),
      markSize: bounded(props.markSize, 1 + roughness, 0.25, 4),
      markStroke: bounded(props.markStroke, 1 + roughness * 0.5, 0.25, 4),
      washScale: bounded(props.washScale, 2.7, 0.25, 10),
      edgeStrength: bounded(props.edgeStrength, 0.16),
      centerStrength: bounded(props.centerStrength, 0.18),
      centerSoftness: bounded(props.centerSoftness, 0.12 - intensity * 0.03),
      markCenterFade: bounded(props.markCenterFade, 0.72),
      speed: bounded(props.speed, 1, 0, 5),
      pointerStrength: bounded(props.pointerStrength, 0.045),
    },
  };
}

export type SketchSettings = ReturnType<typeof resolveSketchSettings>;

export function sketchFadeMask(fade: number) {
  return fade > 0
    ? `radial-gradient(ellipse 70% 70% at 50% 50%, #000 ${(1 - fade) * 65}%, transparent 72%)`
    : undefined;
}
