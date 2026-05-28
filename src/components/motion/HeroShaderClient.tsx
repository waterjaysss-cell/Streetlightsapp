"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Client wrapper for the WebGL hero shader.
 *
 * - Lazy-loaded with `ssr: false` (only allowed in Client Components in Next 16).
 * - Bails out entirely if the user prefers reduced motion (renders nothing —
 *   the static hero photo behind us stays untouched).
 *
 * Strict-Mode safety: React 18+ in dev double-invokes effects (mount →
 * unmount → remount synchronously). Mounting a WebGL Canvas inside that
 * window destroys + recreates the GL context faster than the browser can
 * tear down the previous one, triggering `THREE.WebGLRenderer: Context Lost`.
 *
 * Fix: gate the Canvas behind a `setTimeout` whose cleanup cancels the
 * scheduled mount. The simulated Strict-Mode unmount cancels the first
 * timer; the remount schedules a new one. By the time it fires, we are
 * past the double-invoke cycle and the Canvas mounts exactly once.
 */
const HeroShader = dynamic(() => import("./HeroShader"), {
  ssr: false,
  loading: () => null,
});

export default function HeroShaderClient() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const id = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        mixBlendMode: "overlay",
        opacity: 0.55,
        zIndex: 1,
      }}
    >
      <HeroShader />
    </div>
  );
}
