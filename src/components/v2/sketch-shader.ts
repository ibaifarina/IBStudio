// Slowly moving ink washes with fixed pigment particles and paper fibers.
// Wash stays pale; paper texture and sketch marks have independent controls.
export const sketchVertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const sketchFragmentShader = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform vec3 u_ink;
uniform vec3 u_paper;
uniform vec3 u_markInk;
uniform float u_washOpacity;
uniform float u_pigmentOpacity;
uniform float u_grainOpacity;
uniform float u_fiberOpacity;
uniform float u_brushOpacity;
uniform float u_fleckOpacity;
uniform float u_markOpacity;
uniform float u_markDensity;
uniform float u_markSize;
uniform float u_markStroke;
uniform float u_washScale;
uniform float u_edgeStrength;
uniform float u_centerStrength;
uniform float u_centerSoftness;
uniform float u_markCenterFade;
uniform float u_speed;
uniform float u_pointerStrength;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}

float field(vec2 p) {
  return noise(p) * 0.55 + noise(p * 2.07 + 12.4) * 0.30
       + noise(p * 4.13 + 27.1) * 0.15;
}

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  return length(p - a - ab * clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0));
}

// Tiny irregular asterisks, open rings, and pencil dashes, distributed like
// incidental marks on printed paper. Each cell has its own scale and angle.
float sketchMarks(vec2 px, float redraw) {
  vec2 cell = floor(px / 72.0);
  float seed = hash(cell + 84.1);
  float padding = max(15.84, min(34.0, 7.0 * u_markSize + 1.15 * u_markStroke));
  vec2 origin = cell * 72.0 + padding
              + vec2(hash(cell + 9.1), hash(cell + 41.0)) * (72.0 - padding * 2.0);
  vec2 q = px - origin;
  float angle = hash(cell + 22.0) * 6.283;
  q = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * q;
  float size = mix(3.0, 7.0, hash(cell + 61.0)) * u_markSize;
  q += vec2(sin(q.y * 1.3 + seed * 9.0), sin(q.x * 1.1 + redraw)) * 0.35;
  float d;
  if (seed < u_markDensity * 0.35) {
    d = min(segment(q, vec2(-size, -0.7), vec2(size, 0.5)),
            segment(q, vec2(0.4, -size), vec2(-0.6, size)));
    d = min(d, segment(q, vec2(-size * 0.62), vec2(size * 0.68)));
  } else if (seed < u_markDensity * 0.625) {
    float a = atan(q.y, q.x);
    d = abs(length(q) - size * (0.72 + sin(a * 3.0 + seed) * 0.07));
    d += step(0.8, a) * step(a, 1.6) * 5.0;
  } else if (seed < u_markDensity) {
    d = segment(q, vec2(-size, -0.8), vec2(size * 0.75, 0.7));
    d = min(d, segment(q, vec2(-size * 0.6, 3.0), vec2(size * 0.45, 4.1)));
  } else {
    return 0.0;
  }
  return 1.0 - smoothstep(0.35, 1.15, d / u_markStroke);
}

void main() {
  vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);
  vec2 paperPx = uv * u_resolution;
  vec2 p = uv * vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  float animationTime = u_time * u_speed;
  vec2 drift = vec2(animationTime * 0.032, -animationTime * 0.021) + u_pointer * u_pointerStrength;
  vec2 warp = vec2(field(p * 3.2 + drift), field(p * 3.4 - drift + 5.0));
  float cloud = field(p * u_washScale + warp * 0.9 + drift);
  float pool = smoothstep(0.34, 0.69, cloud);

  // Blue drifts through the entire card, including the center. A softer pooled
  // wash gives irregular printed edges without a hard rectangular frame.
  vec2 edge = min(uv, 1.0 - uv);
  float rim = 1.0 - smoothstep(0.0, 0.24, min(edge.x, edge.y));
  vec2 centerPoint = (uv - vec2(0.53, 0.52)) * vec2(2.0, 2.4);
  float center = exp(-dot(centerPoint, centerPoint) * 3.0);
  float density = clamp(pool * 0.72 + rim * u_edgeStrength + center * u_centerStrength, 0.0, 1.0);

  // Fixed pigment locations, with a slowly moving density envelope.
  // Random centers and radii avoid a mechanical halftone grid.
  vec2 dots = paperPx * 1.18;
  vec2 cell = floor(dots);
  vec2 dotCenter = vec2(hash(cell + 2.3), hash(cell + 7.1));
  float radius = mix(0.12, 0.48, hash(cell + 8.4));
  float dotShape = 1.0 - smoothstep(radius - 0.12, radius, length(fract(dots) - dotCenter));
  float deposit = 1.0 - smoothstep(density * 0.78 - 0.07,
                                 density * 0.78 + 0.07, hash(cell + 13.7));
  float pigment = dotShape * deposit;

  float grain = hash(floor(paperPx * 1.5));
  float fibers = noise(paperPx * vec2(0.45, 2.8));
  vec3 paper = clamp(u_paper + (grain - 0.5) * u_grainOpacity
                    + (fibers - 0.5) * u_fiberOpacity, 0.0, 1.0);
  float inkAmount = (0.167 + density) * u_washOpacity + pigment * u_pigmentOpacity;

  if (u_brushOpacity > 0.0) {
    float dryBrush = smoothstep(0.42, 0.72, field(p * 6.2 + drift * 0.65));
    float irregular = noise(paperPx * vec2(0.10, 0.38));
    inkAmount += dryBrush * irregular * u_brushOpacity;
  }

  if (u_fleckOpacity > 0.0) {
    vec2 coarse = paperPx * 0.40;
    vec2 cell = floor(coarse);
    vec2 dotCenter = vec2(hash(cell + 4.1), hash(cell + 17.3));
    float radius = mix(0.10, 0.43, hash(cell + 37.4));
    float speck = 1.0 - smoothstep(radius - 0.10, radius, length(fract(coarse) - dotCenter));
    float scatter = 1.0 - smoothstep(density * 0.34 - 0.03, density * 0.34 + 0.03, hash(cell + 5.9));
    inkAmount += speck * scatter * u_fleckOpacity;
  }

  // Texture and wash stay pale; sketch marks have their own ink and opacity.
  inkAmount = min(inkAmount, 0.42);
  vec3 color = mix(paper, u_ink, inkAmount);

  // A quiet reading area, without washing out the blue in the middle.
  color = mix(color, paper, center * u_centerSoftness);

  if (u_markOpacity > 0.0 && u_markDensity > 0.0) {
    float redraw = mod(floor(animationTime * 2.2), 3.0);
    float marks = sketchMarks(paperPx, redraw) * (1.0 - center * u_markCenterFade);
    color = mix(color, u_markInk, marks * u_markOpacity);
  }
  gl_FragColor = vec4(color, 1.0);
}
`;
