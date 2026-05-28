/**
 * Central motion config — tune the entire site's feel here.
 *
 * Easing notes:
 * - `expoOut` is the workhorse: sharp entry, glides home. Use for masks/reveals.
 * - `expoInOut` is for pinned hero exits (in + out blend).
 * - `power2Out` is the standard GSAP fallback when you want something less editorial.
 *
 * Durations are in seconds (GSAP convention).
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger as a side effect of importing this module.
// Every motion component imports from here, so the plugin is guaranteed
// to be registered before any useLayoutEffect runs gsap.to({ scrollTrigger }).
// Guarded for SSR — registerPlugin is a no-op without window.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const easing = {
  // cubic-bezier as a GSAP-compatible array
  expoOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  expoInOut: [0.83, 0, 0.17, 1] as [number, number, number, number],
  power2Out: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  // CSS-friendly strings (for non-GSAP use)
  css: {
    expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    expoInOut: "cubic-bezier(0.83, 0, 0.17, 1)",
  },
};

// GSAP accepts arrays as "ease" strings via CustomEase, but we'll just pass
// the cubic-bezier as a string via the format `cubic-bezier(...)` — GSAP also
// accepts named eases. We register custom in motion code as needed.
export const gsapEase = {
  expoOut: "expo.out",
  expoInOut: "expo.inOut",
  power2Out: "power2.out",
  power3Out: "power3.out",
};

export const duration = {
  /** quick UI accents — hover, cursor scale */
  fast: 0.35,
  /** body copy fades, generic reveals */
  base: 0.9,
  /** headline mask wipes — feel like a curtain */
  heading: 1.1,
  /** hero entrance — the wow moment */
  hero: 1.4,
  /** scroll-triggered scrub ranges (not duration, but for ScrollTrigger end) */
  pinEnd: "+=80%",
};

export const stagger = {
  /** between headline lines in a multi-line h1/h2 */
  headingLine: 0.12,
  /** between cards in a Connect-style sequence */
  card: 0.14,
  /** between photos in the grid */
  photo: 0.06,
  /** between event rows */
  row: 0.08,
};

/** Lenis settings — see https://github.com/darkroomengineering/lenis */
export const lenisConfig = {
  // higher = more weight; lower = snappier
  duration: 1.15,
  // matches expoOut roughly — feels premium without being slow
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.6,
  // disable for native momentum on touch — feels better than emulating
  smoothTouch: false,
} as const;

/** Magnetic hover settings */
export const magnetic = {
  /** Padding in px around the element's bounding box that counts as the
   *  activation hot-zone. Keep small so adjacent links (like nav items)
   *  don't both activate at the same cursor position. */
  radius: 28,
  /** How far the element actually moves (fraction of cursor offset) */
  strength: 0.3,
  /** Spring duration on enter/leave */
  duration: 0.5,
};

/** Custom cursor */
export const cursor = {
  size: 18,
  hoverScale: 2.2,
  followDuration: 0.35,
};

/** Hero shader */
export const heroShader = {
  /** Cap DPR so high-density displays don't tank perf */
  maxDpr: 2,
  /** Noise drift speed */
  speed: 0.06,
  /** Mouse influence (0–1) */
  mouseInfluence: 0.5,
};

/** Common breakpoint guards (mirrors Tailwind's md: 768px) */
export const breakpoint = {
  md: 768,
};

/**
 * Returns true if the user's OS asks for reduced motion.
 * SSR-safe — returns false on server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns true on touch-primary devices — used to disable cursor + magnetic.
 * SSR-safe.
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}
