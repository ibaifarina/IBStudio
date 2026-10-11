"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { sketchFragmentShader, sketchVertexShader } from "./sketch-shader";
import { clampIntensity, resolveSketchSettings, sketchFadeMask, type SketchSettings, type SketchShaderProps } from "./sketch-settings";
import "./sketch-card.css";

export type { SketchShaderProps } from "./sketch-settings";

/** Reusable animated ink wash, with a quiet CSS fallback and a lightness floor. */
export function SketchShader(props: SketchShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = resolveSketchSettings(props);
  const settingsRef = useRef(settings);
  const updateSettingsRef = useRef<((value: SketchSettings) => void) | null>(null);

  // Prop changes update uniforms without recreating the canvas or GPU resources.
  useEffect(() => {
    settingsRef.current = settings;
    updateSettingsRef.current?.(settings);
  }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Sketch shader:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertex = compile(gl.VERTEX_SHADER, sketchVertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, sketchFragmentShader);
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const dispose = () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
    if (!vertex || !fragment || !program || !buffer) {
      dispose();
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Sketch shader:", gl.getProgramInfoLog(program));
      dispose();
      return;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const pointer = gl.getUniformLocation(program, "u_pointer");
    const time = gl.getUniformLocation(program, "u_time");
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const controls = Object.keys(settingsRef.current.controls) as (keyof SketchSettings["controls"])[];
    const uniforms = controls.map((key) => ({ key, location: gl.getUniformLocation(program, `u_${key}`) }));
    const colors = ["ink", "paper", "markInk"] as const;
    const colorUniforms = colors.map((key) => ({ key, location: gl.getUniformLocation(program, `u_${key}`) }));
    const uploadSettings = (value: SketchSettings) => {
      gl.useProgram(program);
      uniforms.forEach(({ key, location }) => gl.uniform1f(location, value.controls[key]));
      colorUniforms.forEach(({ key, location }) => gl.uniform3f(location, ...value[key]));
    };
    uploadSettings(settingsRef.current);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let ready = true;
    let disposed = false;
    let frame = 0;
    let lastDraw = -Infinity;
    let elapsed = 0;
    const target = [0, 0];
    const current = [0, 0];

    const draw = () => {
      if (!ready || disposed) return;
      gl.uniform2f(pointer, current[0], current[1]);
      gl.uniform1f(time, reducedMotion.matches ? 0 : elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.ready = "true";
    };
    const tick = (now: number) => {
      frame = 0;
      if (!inView || !ready || document.hidden || reducedMotion.matches || disposed || settingsRef.current.controls.speed === 0) return;
      if (now - lastDraw >= 1000 / 24) {
        elapsed += Math.min((now - lastDraw) / 1000, 0.05);
        lastDraw = now;
        current[0] += (target[0] - current[0]) * 0.12;
        current[1] += (target[1] - current[1]) * 0.12;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastDraw = -Infinity;
      if (ready && inView && !document.hidden) {
        if (reducedMotion.matches) {
          current[0] = 0;
          current[1] = 0;
        }
        draw();
        if (!reducedMotion.matches && settingsRef.current.controls.speed > 0) frame = requestAnimationFrame(tick);
      }
    };
    updateSettingsRef.current = (value) => {
      if (!ready || disposed) return;
      uploadSettings(value);
      syncAnimation();
      // Also redraw immediately when the canvas is outside the viewport.
      if (!inView) draw();
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.min(2048, Math.max(1, Math.round(rect.width * dpr)));
      canvas.height = Math.min(2048, Math.max(1, Math.round(rect.height * dpr)));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, rect.width, rect.height);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const rect = canvas.getBoundingClientRect();
      target[0] = (event.clientX - rect.left) / rect.width - 0.5;
      target[1] = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const leave = () => { target[0] = 0; target[1] = 0; };
    const contextLost = (event: Event) => {
      event.preventDefault();
      ready = false;
      canvas.dataset.ready = "false";
      cancelAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncAnimation();
    }, { rootMargin: "100px" });
    intersectionObserver.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);
    resize();

    return () => {
      disposed = true;
      updateSettingsRef.current = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", syncAnimation);
      canvas.dataset.ready = "false";
      dispose();
    };
  }, []);

  return (
    <div
      className="sketch-card-artwork"
      aria-hidden="true"
      style={{
        "--sketch-intensity": settings.intensity,
        "--sketch-ink": `rgb(${settings.ink.map((channel) => channel * 255).join(" ")})`,
        "--sketch-paper": `rgb(${settings.paper.map((channel) => channel * 255).join(" ")})`,
        "--sketch-wash": `${settings.controls.washOpacity * 100}%`,
        opacity: settings.opacity,
        maskImage: sketchFadeMask(settings.fade),
        WebkitMaskImage: sketchFadeMask(settings.fade),
      } as CSSProperties}
    >
      <div className="sketch-card-fallback" />
      <canvas width={800} height={500} ref={canvasRef} className="sketch-card-canvas" aria-hidden="true" />
    </div>
  );
}

export function SketchCard({ intensity = 0.5, ...shaderProps }: SketchShaderProps) {
  const amount = clampIntensity(intensity);

  return (
    <section
      id="sketch-card"
      className="sketch-card-section"
      aria-labelledby="sketch-title"
      style={{ "--sketch-intensity": amount } as CSSProperties}
    >
      <article className="sketch-card-panel">
        <SketchShader {...shaderProps} intensity={amount} />
        <div className="sketch-card-content">
          <span className="sketch-card-eyebrow">Diseño con intención</span>
          <h2 id="sketch-title">Un poco más <em>humano.</em></h2>
          <p>Ideas con carácter. Webs con alma.</p>
        </div>
        <span className="sketch-card-signature">ib.studio</span>
      </article>
    </section>
  );
}
