"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  duration,
  gsapEase,
  prefersReducedMotion,
} from "@/lib/motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  day: string;
  month: string;
  title: string;
  location: string;
  /** index in the list — used to alternate slide-in direction */
  index?: number;
};

export default function EventRow({
  day,
  month,
  title,
  location,
  index = 0,
}: Props) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const fromLeft = index % 2 === 0;

  useIsoLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const dayInner = row.querySelector<HTMLElement>("[data-day-inner]");
    const monthEl = row.querySelector<HTMLElement>("[data-month]");
    const titleEl = row.querySelector<HTMLElement>("[data-title]");
    const locEl = row.querySelector<HTMLElement>("[data-location]");

    if (prefersReducedMotion()) {
      gsap.set([dayInner, monthEl, titleEl, locEl].filter(Boolean), {
        clearProps: "all",
      });
      gsap.set(row, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(row, { opacity: 0, x: fromLeft ? -64 : 64 });
      gsap.set(dayInner, { yPercent: 110 });
      gsap.set([monthEl, titleEl, locEl], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 88%",
          once: true,
        },
      });

      tl.to(row, {
        opacity: 1,
        x: 0,
        duration: duration.base,
        ease: gsapEase.expoOut,
      })
        .to(
          dayInner,
          {
            yPercent: 0,
            duration: duration.heading,
            ease: gsapEase.expoOut,
          },
          "-=0.7",
        )
        .to(
          [monthEl, titleEl, locEl],
          {
            opacity: 1,
            y: 0,
            duration: duration.base,
            ease: gsapEase.expoOut,
            stagger: 0.08,
          },
          "-=0.8",
        );
    }, row);

    return () => ctx.revert();
  }, [fromLeft]);

  return (
    <div
      ref={rowRef}
      className="group grid grid-cols-[auto_1fr] sm:grid-cols-[10rem_1fr_auto] items-baseline gap-x-6 sm:gap-x-10 gap-y-2 border-t border-bone/15 py-7 sm:py-9 transition-colors hover:bg-bone/[0.02] will-change-transform"
    >
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span
          className="font-display text-5xl sm:text-7xl leading-none block overflow-hidden"
          style={{ paddingBottom: "0.06em" }}
        >
          <span data-day-inner className="block will-change-transform">
            {day}
          </span>
        </span>
        <span
          data-month
          className="text-xs sm:text-sm uppercase tracking-[0.22em] text-smoke"
        >
          {month}
        </span>
      </div>

      <h3
        data-title
        className="col-start-1 sm:col-start-2 col-span-2 sm:col-span-1 font-display text-3xl sm:text-5xl uppercase leading-none tracking-tight"
      >
        {title}
      </h3>

      <p
        data-location
        className="col-start-1 sm:col-start-3 col-span-2 sm:col-span-1 text-sm uppercase tracking-[0.22em] text-bone/70 sm:text-right"
      >
        {location}
      </p>
    </div>
  );
}
