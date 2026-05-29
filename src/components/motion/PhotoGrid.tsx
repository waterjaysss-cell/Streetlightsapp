"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  breakpoint,
  duration,
  gsapEase,
  prefersReducedMotion,
  stagger,
} from "@/lib/motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Photo = { src: string; alt: string };

/**
 * Square photo grid with two motion layers:
 *
 * 1. Entrance: staggered scale-up + fade as the grid scrolls into view.
 *    Each tile starts at 92% scale + 0 opacity.
 *
 * 2. Parallax: each tile drifts vertically as the section scrolls past,
 *    with a small per-row speed offset (top row drifts up faster than
 *    the bottom row) — gives the "rows drift at different speeds" feel
 *    without breaking the CSS grid layout.
 *
 * Parallax is disabled below md breakpoint (perf + the effect needs space).
 */
export default function PhotoGrid({ photos }: { photos: readonly Photo[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const tiles = Array.from(
      grid.querySelectorAll<HTMLElement>("[data-photo-tile]"),
    );

    if (prefersReducedMotion()) {
      gsap.set(tiles, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      // ENTRANCE
      gsap.set(tiles, { opacity: 0, scale: 0.92, y: 24 });
      gsap.to(tiles, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: duration.base,
        ease: gsapEase.expoOut,
        stagger: stagger.photo,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // PARALLAX (md+ only)
      if (window.innerWidth >= breakpoint.md) {
        tiles.forEach((tile, i) => {
          // 4 cols at lg, 3 cols at sm — assume row = floor(i / cols).
          // Use 4 as the parallax row divisor at desktop sizes.
          const row = Math.floor(i / 4);
          // top row drifts a bit faster, bottom slower — magnitude 12-32px
          const yOffset = -22 + row * 14;
          gsap.fromTo(
            tile,
            { y: -yOffset },
            {
              y: yOffset,
              ease: "none",
              scrollTrigger: {
                trigger: grid,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      }
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
    >
      {photos.map((p) => (
        <div
          key={p.src}
          data-photo-tile
          className="relative aspect-square overflow-hidden bg-ash will-change-transform"
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}
