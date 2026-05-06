import type { ReactNode } from "react";

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

export default function SectionHeading({
  kicker,
  children,
  className = "",
}: Props) {
  return (
    <div className={className}>
      {kicker && (
        <p className="text-xs sm:text-sm uppercase tracking-widest text-smoke mb-5 sm:mb-7">
          {kicker}
        </p>
      )}
      <h2 className="font-display uppercase leading-[0.88] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
        {children}
      </h2>
    </div>
  );
}
