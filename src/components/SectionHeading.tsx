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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  duration,
  gsapEase,
  prefersReducedMotion,
  stagger,
} from "@/lib/motion";

/**
 * GLOBAL HEADLINE-SCALE RULE
 * --------------------------
 * No headline anywhere on the site should overflow its container.
 *
 * Anton (display font) is condensed but not extreme — long words like
 * "ENCOURAGEMENT." or "NOT A SERVICE." can clip on narrow viewports if
 * the font-size scales too aggressively with vw.
 *
 * USE THESE SCALES — do not invent new ones per page:
 *
 *   Hero (sized to fit "EVERYDAY ENCOURAGEMENT.", 23 chars):
 *     text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl
 *
 *   Section headings (this component, sized to fit "NOT A SERVICE."):
 *     text-5xl sm:text-7xl md:text-8xl lg:text-9xl
 *
 *   Card titles inside sections:
 *     text-3xl sm:text-5xl   (or smaller — see Connect cards)
 *
 * If a headline still clips, the FIX is shorter copy, never a wider
 * container. Tested at 320 / 375 / 640 / 768 / 1024 / 1280 / 1536 / 1920.
 */

type Props = {
  kicker?: string;
  children: ReactNode;
  className?: string;
};

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Split children into "lines" on every `<br />`. Strings with newlines also
 * split. Used so each line can be wrapped in a clip-mask and animated.
 */
function splitLines(children: ReactNode): ReactNode[][] {
  const lines: ReactNode[][] = [];
  let current: ReactNode[] = [];

  const pushLine = () => {
    // strip whitespace-only fragments at the edges
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

export default function SectionHeading({
  kicker,
  children,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lines = splitLines(children);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const innerLines = root.querySelectorAll<HTMLElement>("[data-line-inner]");
    const kickerEl = root.querySelector<HTMLElement>("[data-kicker]");

    if (prefersReducedMotion()) {
      gsap.set([...innerLines, kickerEl].filter(Boolean), {
        yPercent: 0,
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(innerLines, { yPercent: 110 });
      if (kickerEl) gsap.set(kickerEl, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });

      if (kickerEl) {
        tl.to(kickerEl, {
          opacity: 1,
          y: 0,
          duration: duration.base,
          ease: gsapEase.expoOut,
        });
      }

      tl.to(
        innerLines,
        {
          yPercent: 0,
          duration: duration.heading,
          ease: gsapEase.expoOut,
          stagger: stagger.headingLine,
        },
        kickerEl ? "-=0.6" : 0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {kicker && (
        <div className="overflow-hidden mb-5 sm:mb-7">
          <p
            data-kicker
            className="text-xs sm:text-sm uppercase tracking-widest text-smoke"
          >
            {kicker}
          </p>
        </div>
      )}
      <h2 className="font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
        {lines.map((line, i) => (
          <span
            key={i}
            className="block overflow-hidden"
            // pb keeps descenders from being clipped by overflow-hidden
            style={{ paddingBottom: "0.06em" }}
          >
            <span data-line-inner className="block will-change-transform">
              {line}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
