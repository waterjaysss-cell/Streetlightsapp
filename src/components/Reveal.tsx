"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, gsapEase, prefersReducedMotion } from "@/lib/motion";

// Module-level plugin registration (defense in depth — motion.ts also does
// this, but registering here too means Reveal is safe even if something
// imports it before motion.ts has been imported elsewhere).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
 * Visual: opacity 0→1, y 32→0, blur(6px)→blur(0), eased on expoOut. Honors
 * prefers-reduced-motion (no animation).
 *
 * Crash prevention (Nov 2026) — was crashing intermittently on /events
 * with "Cannot read properties of undefined (reading 'end')":
 *
 *   1. gsap.registerPlugin(ScrollTrigger) at module scope (above) so the
 *      plugin is guaranteed registered before any tween with scrollTrigger.
 *   2. Explicit `end` on the trigger so ScrollTrigger never has to derive
 *      it from a not-yet-laid-out element (the documented race cause).
 *   3. try/catch wrapping the GSAP setup — if anything throws for any
 *      reason, the element is restored to its visible state so content is
 *      never permanently hidden.
 *   4. gsap.context() + ctx.revert() on unmount kills both the tween and
 *      its ScrollTrigger, so route changes can't leak state.
 *
 * Inline `scrollTrigger` on `gsap.to` is the proven pattern that correctly
 * handles elements already in view on mount (no manual onEnter wiring).
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

    let ctx: gsap.Context | undefined;
    try {
      ctx = gsap.context(() => {
        gsap.set(el, { opacity: 0, y: 32, filter: "blur(6px)" });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: duration.base,
          ease: gsapEase.expoOut,
          delay: delay / 1000,
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            // Explicit end avoids the "Cannot read properties of undefined
            // (reading 'end')" race when many triggers init together.
            end: "bottom top",
            // toggleActions = onEnter|onLeave|onEnterBack|onLeaveBack.
            // "play none none none" = forward play once, no reverse on
            // scroll-up. Same visual as once:true but the trigger STAYS
            // ALIVE — so the post-navigation ScrollTrigger.refresh() can
            // fire it for in-view reveals that didn't catch the first
            // evaluation. (once:true was self-disposing before refresh
            // could fire it, leaving content frozen at opacity:0.)
            toggleActions: "play none none none",
          },
        });
      }, el);
    } catch {
      // Worst case: GSAP/ScrollTrigger throws. Restore the element to its
      // visible state so the page isn't broken.
      gsap.set(el, { opacity: 1, y: 0, filter: "none" });
    }

    return () => {
      ctx?.revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
