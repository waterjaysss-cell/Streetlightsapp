"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import {
  duration,
  gsapEase,
  prefersReducedMotion,
  stagger,
} from "@/lib/motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hero <h1>. Each line is wrapped in a clip-mask; lines wipe up into place
 * on mount with a stagger. Headline copy is identical to the original
 * inline markup in page.tsx — only the animation layer is new.
 */
export default function HeroHeadline({
  lines,
}: {
  lines: readonly string[];
}) {
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll<HTMLElement>("[data-line-inner]");

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115 });

      gsap.to(inners, {
        yPercent: 0,
        duration: duration.hero,
        ease: gsapEase.expoOut,
        stagger: stagger.headingLine,
        // light delay so the page paints and Lenis settles before the wipe
        delay: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={rootRef}
      className="font-display uppercase leading-[0.88] tracking-tight text-bone text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.06em" }}
        >
          <span data-line-inner className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
