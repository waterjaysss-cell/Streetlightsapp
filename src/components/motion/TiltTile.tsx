"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  sizes: string;
};

/**
 * 3D tilt hover tile.
 *
 * Mouse moves over the tile → card tilts in 3D toward the cursor via
 * rotateX/rotateY based on cursor position relative to card center, lifts
 * slightly on Z, and shows a soft bone-colored highlight that follows the
 * cursor. Mouse leave → springs smoothly back to flat.
 *
 * - Transform-only writes (no layout-thrashing properties). Updates via
 *   refs in a requestAnimationFrame, not React state, so the parent
 *   never re-renders on mousemove.
 * - Disabled entirely on touch devices and prefers-reduced-motion —
 *   renders the same static tile the page used before.
 */
export default function TiltTile({ src, alt, sizes }: Props) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const glare = glareRef.current;
    if (!outer || !inner || !glare) return;

    const MAX_TILT = 10; // degrees — subtle, premium feel
    const LIFT_Z = 18; // px on hover
    let rafId: number | null = null;

    const onEnter = () => {
      // Quick easing in — feels responsive on enter
      inner.style.transition =
        "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)";
      glare.style.transition = "opacity 220ms ease-out";
    };

    const onMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateX = -(y - 0.5) * 2 * MAX_TILT; // cursor top → top forward
      const rotateY = (x - 0.5) * 2 * MAX_TILT; // cursor right → right forward

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${LIFT_Z}px)`;
        // Faint highlight that tracks the cursor — bone-tinted, mix-blended.
        glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(245,245,245,0.18), transparent 55%)`;
        glare.style.opacity = "1";
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      // Slower spring-back out — premium "rest" feel
      inner.style.transition =
        "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
      glare.style.transition = "opacity 400ms ease-out";
      inner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
      glare.style.opacity = "0";
    };

    outer.addEventListener("mouseenter", onEnter);
    outer.addEventListener("mousemove", onMove);
    outer.addEventListener("mouseleave", onLeave);

    return () => {
      outer.removeEventListener("mouseenter", onEnter);
      outer.removeEventListener("mousemove", onMove);
      outer.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ perspective: "1000px" }}>
      <div
        ref={innerRef}
        className="relative aspect-square bg-ash overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: "rotateX(0deg) rotateY(0deg) translateZ(0px)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        <div
          ref={glareRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            mixBlendMode: "overlay",
            opacity: 0,
            transition: "opacity 220ms ease-out",
          }}
        />
      </div>
    </div>
  );
}
