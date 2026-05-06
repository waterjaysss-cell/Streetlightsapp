import type { ReactNode } from "react";

/**
 * Top-of-page header for all interior pages (/about, /events, /shop, etc.).
 *
 * Mirrors the homepage Hero typographic scale — eyebrow above, dramatic
 * Anton heading below — but lower height. Includes top padding to clear
 * the fixed Nav.
 *
 * Headline scale follows the global rule documented in SectionHeading.tsx.
 */
type Props = {
  eyebrow: string;
  children: ReactNode;
  className?: string;
};

export default function PageHeader({ eyebrow, children, className = "" }: Props) {
  return (
    <header
      className={`relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 border-b border-bone/10 ${className}`}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-bone/60 mb-6 sm:mb-8">
          {eyebrow}
        </p>
        <h1 className="font-display uppercase leading-[0.88] tracking-tight text-bone text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
          {children}
        </h1>
      </div>
    </header>
  );
}
