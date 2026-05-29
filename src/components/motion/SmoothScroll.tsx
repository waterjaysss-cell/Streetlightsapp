"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisConfig, prefersReducedMotion } from "@/lib/motion";

/**
 * Site-wide smooth-scroll provider.
 * - Initializes Lenis once at the root and syncs its RAF with GSAP's ticker.
 * - Registers ScrollTrigger and refreshes it after Lenis emits scroll.
 * - Bails out entirely (native scroll, no Lenis) when the user prefers reduced motion.
 * - On every route change, resets scroll to top BEFORE refreshing ScrollTriggers
 *   so reveals on the new page evaluate against the correct offset (not the
 *   previous page's scroll position).
 *
 * Lives in layout.tsx so it persists across App-Router navigations.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Register the plugin once on mount.
    gsap.registerPlugin(ScrollTrigger);

    // Take ownership of scroll restoration. With Lenis owning scroll, the
    // browser's default "auto" restoration fights Lenis and leaves the new
    // page at the previous page's scroll offset.
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

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
    lenisRef.current = lenis;

    // Dev-only: expose the live instance on window.lenis so the console
    // can confirm the RAF loop is running (window.lenis.scroll,
    // window.lenis.scrollTo(0), etc.). Stripped in production builds.
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { lenis: Lenis }).lenis = lenis;
    }

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
      lenisRef.current = null;
      if (process.env.NODE_ENV === "development") {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
      // Kill any lingering ScrollTriggers (route swap, HMR, etc.)
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Route-change effect: jump to top and refresh triggers.
  //
  // Order matters — reset scroll FIRST so when ScrollTrigger.refresh()
  // recomputes every trigger's position, the active scroll offset is 0
  // (top of new page), not the old page's scroll offset. Without this,
  // reveals on the new page evaluate against the wrong offset and never
  // fire onEnter, leaving content frozen at opacity:0.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      // Reduced-motion: Lenis isn't running, use native scroll.
      window.scrollTo(0, 0);
    }
    // Refresh on the next frame so the new page's components have already
    // mounted and registered their triggers — refresh then re-evaluates
    // every trigger against the correct (top-of-page) scroll position
    // and fires onEnter for any that should now be active.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
