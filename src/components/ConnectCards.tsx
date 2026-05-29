"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiInstagram, SiGroupme } from "react-icons/si";
import {
  duration,
  gsapEase,
  prefersReducedMotion,
  stagger,
} from "@/lib/motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// TODO: replace with real GroupMe invite URL
const GROUPME_URL = "https://groupme.com/join_group/107504026/haDaHAWT";
const INSTAGRAM_URL = "https://instagram.com/streetlightscommunity";

/* ----------------------------------------------------------------------------
   ConnectCard — one card. Animates itself: the number/eyebrow does a mask
   reveal, then the headline (per-line mask), then body + CTA fade in.
---------------------------------------------------------------------------- */
function ConnectCard({
  number,
  label,
  heading,
  body,
  cta,
}: {
  number: string;
  label: string;
  heading: ReactNode;
  body: ReactNode;
  cta: ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const numberEl = card.querySelector<HTMLElement>("[data-number-inner]");
    const lineEls = card.querySelectorAll<HTMLElement>("[data-heading-line]");
    const bodyEl = card.querySelector<HTMLElement>("[data-body]");
    const ctaEl = card.querySelector<HTMLElement>("[data-cta]");

    if (prefersReducedMotion()) {
      gsap.set([numberEl, bodyEl, ctaEl, ...lineEls].filter(Boolean), {
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(numberEl, { yPercent: 110 });
      gsap.set(lineEls, { yPercent: 110 });
      gsap.set([bodyEl, ctaEl], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(numberEl, {
        yPercent: 0,
        duration: duration.heading,
        ease: gsapEase.expoOut,
      })
        .to(
          lineEls,
          {
            yPercent: 0,
            duration: duration.heading,
            ease: gsapEase.expoOut,
            stagger: stagger.headingLine,
          },
          "-=0.7",
        )
        .to(
          [bodyEl, ctaEl],
          {
            opacity: 1,
            y: 0,
            duration: duration.base,
            ease: gsapEase.expoOut,
            stagger: 0.1,
          },
          "-=0.6",
        );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="bg-night p-8 sm:p-10 flex flex-col">
      <p
        className="text-xs uppercase tracking-[0.32em] text-smoke block overflow-hidden"
        style={{ paddingBottom: "0.06em" }}
      >
        <span data-number-inner className="block will-change-transform">
          {number} / {label}
        </span>
      </p>

      <h3 className="mt-6 font-display text-4xl sm:text-5xl uppercase leading-none tracking-tight">
        {heading}
      </h3>

      <p
        data-body
        className="mt-6 text-base text-bone/80 leading-relaxed will-change-transform"
      >
        {body}
      </p>

      <div data-cta className="mt-auto pt-8 will-change-transform">
        {cta}
      </div>
    </div>
  );
}

/**
 * Headline children for a card — split on <br /> into masked lines so the
 * card can sweep each line individually.
 */
function MaskedHeading({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.06em" }}
        >
          <span data-heading-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * Three plug-in cards: Pull Up / GroupMe / Follow.
 * Used on the homepage Connect section and on the standalone /connect page.
 */
export default function ConnectCards() {
  return (
    <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/15">
      <ConnectCard
        number="01"
        label="Pull Up"
        heading={<MaskedHeading lines={["Monday", "6:45pm"]} />}
        body="Show up. Bring a friend. We meet weekly to gather, eat, worship, and figure out what it means to follow Jesus together."
        cta={
          <a
            href="/#whats-on"
            className="text-sm uppercase tracking-[0.22em] text-bone/70 hover:text-bone transition-colors"
          >
            Location varies. Check What&apos;s On for this Monday&apos;s spot ↑
          </a>
        }
      />

      <ConnectCard
        number="02"
        label="GroupMe"
        heading={<MaskedHeading lines={["Where it", "Happens"]} />}
        body="This is where everything happens. Hangouts, last-minute beach trips, prayer requests, who's bringing the grill. All of it."
        cta={
          <a
            href={GROUPME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-bone hover:text-bone/70 transition-colors"
          >
            <SiGroupme className="h-4 w-4" aria-hidden />
            Join the GroupMe ↗
          </a>
        }
      />

      <ConnectCard
        number="03"
        label="Follow"
        heading={<MaskedHeading lines={["See What", "We're Up To"]} />}
        body="Schedule drops, retreat recaps, worship nights, the whole picture. Posted weekly on Instagram."
        cta={
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-bone hover:text-bone/70 transition-colors"
          >
            <SiInstagram className="h-4 w-4" aria-hidden />
            @streetlightscommunity ↗
          </a>
        }
      />
    </div>
  );
}
