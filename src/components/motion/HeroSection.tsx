"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsapEase, prefersReducedMotion } from "@/lib/motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Hero <section> wrapper. As the user scrolls down, the hero's inner content
 * (the [data-hero-content] element) scales slightly + fades while the section
 * is pinned, so the next section feels like it rises over the hero.
 *
 * The wrapper takes the same className as the original <section> — drop-in
 * replacement.
 */
export default function HeroSection({ children, className = "" }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const content = section.querySelector<HTMLElement>("[data-hero-content]");
    if (!content) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(content, {
        scale: 0.94,
        opacity: 0,
        ease: gsapEase.expoOut,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}
