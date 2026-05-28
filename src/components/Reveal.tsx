"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, gsapEase, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Stagger this reveal after others on the same screen (ms). Backward-compat. */
  delay?: number;
  className?: string;
};

// useLayoutEffect on server warns — alias to useEffect during SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll-triggered reveal. Same props as the original IntersectionObserver
 * version (`children`, `delay`, `className`) so every existing callsite works.
 *
 * GSAP version: opacity + translateY + slight blur lift, eased on expoOut.
 * Honors prefers-reduced-motion (renders content with no animation).
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, filter: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 32, filter: "blur(6px)" });

      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: duration.base,
        ease: gsapEase.expoOut,
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          // once: triggers a single forward play; cleanup handled by ctx.revert()
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
