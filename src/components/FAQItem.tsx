import type { ReactNode } from "react";

type Props = {
  question: string;
  children: ReactNode;
};

/**
 * Native <details>/<summary> accordion. No JS, fully accessible.
 * Custom plus/minus indicator via CSS, default disclosure marker hidden.
 */
export default function FAQItem({ question, children }: Props) {
  return (
    <details className="group border-t border-bone/15 last:border-b">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-6 py-6 sm:py-8 transition-colors hover:bg-bone/[0.02]">
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[1.05]">
          {question}
        </h3>
        <span
          aria-hidden
          className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0"
        >
          {/* horizontal bar (always visible) */}
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-bone" />
          {/* vertical bar (collapses on open) */}
          <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-bone transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-8 sm:pb-10 max-w-3xl text-base sm:text-lg text-bone/75 leading-relaxed">
        {children}
      </div>
    </details>
  );
}
