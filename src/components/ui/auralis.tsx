"use client";

import { useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*  Auralis — layered 2D simplex noise aura                                    */
/*                                                                            */
/*  Lifecycle guarantees:                                                      */
/*    - WebGL context is created lazily on first visibility (never on mobile).  */
/*    - IntersectionObserver cancels the rAF loop the moment the hero leaves    */
/*      the viewport, so 0% CPU/GPU is spent while reading other sections.      */
/*    - `prefers-reduced-motion` renders one static frame and never loops.      */
/*    - Backing store is capped at DPR 1.5 and animation time is wrapped so     */
/*      float32 precision never degrades on long sessions.                      */
/* -------------------------------------------------------------------------- */

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[3];

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv * vec2(ratio, 1.0);
  float t = u_time * 0.2;

  float n1 = snoise(p * 0.5 + t);
  float n2 = snoise(p * 0.9 - t * 0.5 + n1);

  float light = pow(abs(n2), 2.5) * 0.5;

  vec3 col = vec3(0.02, 0.01, 0.01);

  col += u_colors[0] * smoothstep(0.1, 1.0, n1) * 0.5;
  col += u_colors[1] * light;

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.5;

  float dist = length(uv - 0.5);
  col *= smoothstep(1.2, 0.2, dist);

  gl_FragColor = vec4(col, 1.0);
}
`;

export type AuralisColor = [number, number, number];

export type AuralisProps = {
  /** Extra classes for the canvas element (positioning, sizing, z-index). */
  className?: string;
  /**
   * Explicit `[r, g, b]` triplets in 0..1. When omitted the palette is derived
   * from the live `--accent-color` CSS custom property on `<html>`.
   */
  colors?: AuralisColor[];
  /** Animation speed multiplier. */
  speed?: number;
  /** Film-grain strength. */
  grain?: number;
  /** Canvas opacity — keep subtle when layered behind imagery. */
  opacity?: number;
};

const ACCENT_FALLBACK: AuralisColor = [0.0627, 0.7255, 0.5059]; // #10b981 (emerald)
const ACCENT_CUSTOM_PROPERTY = "--accent-color";
const DPR_CAP = 1.5;
/** Seconds after which animation time wraps — keeps float32 noise math precise. */
const TIME_WRAP_SECONDS = 3600;
/** Fixed timestamp used for the single frame rendered under reduced motion. */
const STATIC_FRAME_TIME_MS = 4200;
/** Clamp for frame deltas after a pause so the field never jumps. */
const MAX_FRAME_DELTA_MS = 64;

function parseColor(raw: string | null | undefined): AuralisColor | null {
  if (!raw) return null;
  const input = raw.trim().toLowerCase();
  if (!input) return null;

  if (input.startsWith("#")) {
    const hex = input.slice(1);
    if (!/^[0-9a-f]+$/.test(hex)) return null;
    if (hex.length === 3 || hex.length === 4) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    if (hex.length === 6 || hex.length === 8) {
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
      ];
    }
    return null;
  }

  const functional = /^rgba?\(([^)]*)\)$/.exec(input);
  if (!functional) return null;

  const parts = functional[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .slice(0, 3);
  if (parts.length < 3) return null;

  const channels = parts.map((part) => {
    const value = part.endsWith("%") ? parseFloat(part) / 100 : parseFloat(part) / 255;
    return Number.isFinite(value) ? Math.min(Math.max(value, 0), 1) : Number.NaN;
  });
  if (channels.some((channel) => Number.isNaN(channel))) return null;
  return [channels[0], channels[1], channels[2]];
}

/** Reads the active accent token, tolerating hex and rgb()/rgba() notations. */
function readAccentColor(): AuralisColor | null {
  if (typeof window === "undefined") return null;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(ACCENT_CUSTOM_PROPERTY);
  return parseColor(raw) ?? ACCENT_FALLBACK;
}

/** Reserved accent surface, a bright ridge tint, and a deep base tone. */
function derivePalette(accent: AuralisColor): AuralisColor[] {
  return [
    [accent[0] * 0.85, accent[1] * 0.85, accent[2] * 0.85],
    [
      accent[0] + (1 - accent[0]) * 0.5,
      accent[1] + (1 - accent[1]) * 0.5,
      accent[2] + (1 - accent[2]) * 0.5,
    ],
    [accent[0] * 0.12, accent[1] * 0.12, accent[2] * 0.12],
  ];
}

type Scene = {
  program: WebGLProgram;
  buffer: WebGLBuffer;
  positionLocation: number;
  resolutionLocation: WebGLUniformLocation | null;
  timeLocation: WebGLUniformLocation | null;
  grainLocation: WebGLUniformLocation | null;
  colorsLocation: WebGLUniformLocation | null;
};

export function Auralis({ className, colors, speed = 1, grain = 0.045, opacity = 0.45 }: AuralisProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paletteKey = colors ? JSON.stringify(colors) : "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const explicitPalette: AuralisColor[] | null = paletteKey
      ? (JSON.parse(paletteKey) as AuralisColor[])
      : null;

    const palette = new Float32Array(9);

    const resolvePalette = (): AuralisColor[] => {
      if (explicitPalette && explicitPalette.length > 0) {
        return explicitPalette.length >= 3 ? explicitPalette.slice(0, 3) : derivePalette(explicitPalette[0]);
      }
      return derivePalette(readAccentColor() ?? ACCENT_FALLBACK);
    };

    const writePalette = (next: AuralisColor[]) => {
      for (let index = 0; index < 3; index += 1) {
        const color = next[index] ?? next[0];
        palette[index * 3] = color[0];
        palette[index * 3 + 1] = color[1];
        palette[index * 3 + 2] = color[2];
      }
    };

    let gl: WebGLRenderingContext | null = null;
    let scene: Scene | null = null;
    let disposed = false;
    let visible = false;
    let running = false;
    let rafId = 0;
    let elapsedMs = 0;
    let lastFrameMs = 0;

    const motionQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let reduced = motionQuery?.matches ?? false;

    const buildScene = (context: WebGLRenderingContext): Scene | null => {
      const compile = (type: number, source: string) => {
        const shader = context.createShader(type);
        if (!shader) return null;
        context.shaderSource(shader, source);
        context.compileShader(shader);
        if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
          context.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vertexShader = compile(context.VERTEX_SHADER, vertexShaderGLSL);
      const fragmentShader = compile(context.FRAGMENT_SHADER, fragmentShaderGLSL);
      if (!vertexShader || !fragmentShader) return null;

      const program = context.createProgram();
      if (!program) return null;
      context.attachShader(program, vertexShader);
      context.attachShader(program, fragmentShader);
      context.linkProgram(program);
      context.deleteShader(vertexShader);
      context.deleteShader(fragmentShader);

      if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        context.deleteProgram(program);
        return null;
      }

      const buffer = context.createBuffer();
      if (!buffer) {
        context.deleteProgram(program);
        return null;
      }

      context.bindBuffer(context.ARRAY_BUFFER, buffer);
      context.bufferData(
        context.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        context.STATIC_DRAW,
      );

      return {
        program,
        buffer,
        positionLocation: context.getAttribLocation(program, "position"),
        resolutionLocation: context.getUniformLocation(program, "u_resolution"),
        timeLocation: context.getUniformLocation(program, "u_time"),
        grainLocation: context.getUniformLocation(program, "u_grain"),
        colorsLocation: context.getUniformLocation(program, "u_colors"),
      };
    };

    /** Lazily creates the WebGL context — nothing is allocated until visible. */
    const ensureScene = () => {
      if (disposed) return false;
      if (!gl) {
        gl = canvas.getContext("webgl", {
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
        });
        if (!gl) return false;
        canvas.addEventListener("webglcontextlost", handleContextLost);
        canvas.addEventListener("webglcontextrestored", handleContextRestored);
      }
      if (!scene) scene = buildScene(gl);
      return scene !== null;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const draw = (timeMs: number) => {
      if (disposed || !gl || !scene) return;
      resizeCanvas();

      gl.useProgram(scene.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, scene.buffer);
      gl.enableVertexAttribArray(scene.positionLocation);
      gl.vertexAttribPointer(scene.positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform2f(scene.resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(scene.timeLocation, (timeMs * 0.001 * speed) % TIME_WRAP_SECONDS);
      gl.uniform1f(scene.grainLocation, grain);
      gl.uniform3fv(scene.colorsLocation, palette);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const renderStaticFrame = () => {
      if (disposed || !ensureScene()) return;
      if (elapsedMs === 0) elapsedMs = STATIC_FRAME_TIME_MS;
      draw(elapsedMs);
    };

    const frame = (now: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(frame);
      elapsedMs += lastFrameMs === 0 ? 16 : Math.min(now - lastFrameMs, MAX_FRAME_DELTA_MS);
      lastFrameMs = now;
      draw(elapsedMs);
    };

    const start = () => {
      if (disposed || running) return;
      if (reduced) {
        renderStaticFrame();
        return;
      }
      if (!ensureScene()) return;
      running = true;
      lastFrameMs = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const syncAccent = () => {
      if (explicitPalette) return;
      const accent = readAccentColor();
      if (!accent) return;
      writePalette(derivePalette(accent));
      if (visible && !running) renderStaticFrame();
    };

    function handleContextLost(event: Event) {
      event.preventDefault();
      stop();
      scene = null;
    }

    function handleContextRestored() {
      if (disposed || !gl) return;
      scene = buildScene(gl);
      if (!scene) return;
      if (visible) {
        if (reduced) renderStaticFrame();
        else start();
      }
    }

    const handleMotionPreference = () => {
      reduced = motionQuery?.matches ?? false;
      if (reduced) {
        stop();
        if (visible) renderStaticFrame();
      } else if (visible) {
        start();
      }
    };

    writePalette(resolvePalette());

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas.parentElement ?? canvas);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            if (!visible) return;
            if (running) return;
            renderStaticFrame();
          });
    resizeObserver?.observe(canvas);

    const accentObserver = new MutationObserver(syncAccent);
    accentObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent", "class", "style"],
    });

    motionQuery?.addEventListener?.("change", handleMotionPreference);

    return () => {
      disposed = true;
      stop();
      visibilityObserver.disconnect();
      resizeObserver?.disconnect();
      accentObserver.disconnect();
      motionQuery?.removeEventListener?.("change", handleMotionPreference);
      if (gl) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
        if (scene) {
          gl.deleteBuffer(scene.buffer);
          gl.deleteProgram(scene.program);
          scene = null;
        }
        // The canvas may be re-mounted (StrictMode / Fast Refresh), so the
        // context is left intact for the next effect run to reuse.
        gl = null;
      }
    };
  }, [paletteKey, speed, grain]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-auralis=""
      className={`pointer-events-none absolute inset-0 h-full w-full${className ? ` ${className}` : ""}`}
      style={{ opacity }}
    />
  );
}

export default Auralis;
