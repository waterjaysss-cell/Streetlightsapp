"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisConfig, prefersReducedMotion } from "@/lib/motion";

/**
 * Site-wide smooth-scroll provider.
 * - Initializes Lenis once at the root and syncs its RAF with GSAP's ticker.
 * - Registers ScrollTrigger and refreshes it after Lenis emits scroll.
 * - Bails out entirely (native scroll, no Lenis) when the user prefers reduced motion.
 *
 * Lives in layout.tsx so it persists across App-Router navigations.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register the plugin once on mount.
    gsap.registerPlugin(ScrollTrigger);

    // Honor the OS setting — no Lenis, no extra RAF, no fight with native momentum.
    if (prefersReducedMotion()) {
      return;
    }

    const lenis = new Lenis({
      duration: lenisConfig.duration,
      easing: lenisConfig.easing,
      smoothWheel: lenisConfig.smoothWheel,
      wheelMultiplier: lenisConfig.wheelMultiplier,
      touchMultiplier: lenisConfig.touchMultiplier,
    });

    // Lenis → ScrollTrigger: keep them perfectly in sync.
    lenis.on("scroll", ScrollTrigger.update);

    // Hand RAF to GSAP's ticker so we share one frame loop with all animations.
    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      // Kill any lingering ScrollTriggers (route swap, HMR, etc.)
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
