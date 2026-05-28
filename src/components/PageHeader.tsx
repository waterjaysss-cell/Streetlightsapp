"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import {
  duration,
  gsapEase,
  prefersReducedMotion,
  stagger,
} from "@/lib/motion";

/**
 * Top-of-page header for all interior pages (/about, /events, /shop, etc.).
 *
 * Mirrors the homepage Hero typographic scale — eyebrow above, dramatic
 * Anton heading below — but lower height. Includes top padding to clear
 * the fixed Nav.
 *
 * Headline scale follows the global rule documented in SectionHeading.tsx.
 *
 * Motion: eyebrow fades, then headline lines wipe up from a clip-mask
 * (same treatment as the hero and section headings).
 */
type Props = {
  eyebrow: string;
  children: ReactNode;
  className?: string;
};

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function splitLines(children: ReactNode): ReactNode[][] {
  const lines: ReactNode[][] = [];
  let current: ReactNode[] = [];

  const pushLine = () => {
    const trimmed = current.filter(
      (c) => !(typeof c === "string" && c.trim() === ""),
    );
    if (trimmed.length) lines.push(trimmed);
    current = [];
  };

  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === "br") {
      pushLine();
      return;
    }
    if (typeof child === "string") {
      const parts = child.split("\n");
      parts.forEach((part, i) => {
        if (i > 0) pushLine();
        if (part) current.push(part);
      });
      return;
    }
    current.push(child);
  });

  pushLine();
  return lines.length ? lines : [[children]];
}

export default function PageHeader({
  eyebrow,
  children,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const lines = splitLines(children);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll<HTMLElement>("[data-line-inner]");
    const eyebrowEl = root.querySelector<HTMLElement>("[data-eyebrow]");

    if (prefersReducedMotion()) {
      gsap.set([...inners, eyebrowEl].filter(Boolean), {
        yPercent: 0,
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115 });
      if (eyebrowEl) gsap.set(eyebrowEl, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ delay: 0.1 });

      if (eyebrowEl) {
        tl.to(eyebrowEl, {
          opacity: 1,
          y: 0,
          duration: duration.base,
          ease: gsapEase.expoOut,
        });
      }

      tl.to(
        inners,
        {
          yPercent: 0,
          duration: duration.hero,
          ease: gsapEase.expoOut,
          stagger: stagger.headingLine,
        },
        eyebrowEl ? "-=0.6" : 0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={rootRef}
      className={`relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 border-b border-bone/10 ${className}`}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden mb-6 sm:mb-8">
          <p
            data-eyebrow
            className="text-xs sm:text-sm uppercase tracking-widest text-bone/60"
          >
            {eyebrow}
          </p>
        </div>
        <h1 className="font-display uppercase leading-[0.88] tracking-tight text-bone text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
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
      </div>
    </header>
  );
}
